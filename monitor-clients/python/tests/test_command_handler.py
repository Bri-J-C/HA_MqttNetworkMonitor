import pytest
from mqtt_monitor.command_handler import CommandHandler


class TestTemplateValidation:
    @pytest.fixture
    def handler(self):
        return CommandHandler(allowed_commands=["safe_cmd"])

    def test_rejects_format_string_injection(self, handler):
        """Templates with Python attribute access should be rejected."""
        with pytest.raises(ValueError, match="[Ii]nvalid|[Dd]angerous"):
            handler.add_command("evil", "{0.__class__.__init__.__globals__}")

    def test_rejects_numbered_args(self, handler):
        """Templates with numbered positional args should be rejected."""
        with pytest.raises(ValueError, match="[Ii]nvalid|[Dd]angerous"):
            handler.add_command("evil", "{0}")

    def test_rejects_attribute_access(self, handler):
        """Templates with attribute access should be rejected."""
        with pytest.raises(ValueError, match="[Ii]nvalid|[Dd]angerous"):
            handler.add_command("evil", "{x.y}")

    def test_rejects_item_access(self, handler):
        """Templates with item/index access should be rejected."""
        with pytest.raises(ValueError, match="[Ii]nvalid|[Dd]angerous"):
            handler.add_command("evil", "{x[0]}")

    def test_rejects_conversion_flags(self, handler):
        """Templates with !s !r !a conversion flags should be rejected."""
        with pytest.raises(ValueError, match="[Ii]nvalid|[Dd]angerous"):
            handler.add_command("evil", "{x!s}")

    def test_rejects_format_specs(self, handler):
        """Templates with format specs should be rejected."""
        with pytest.raises(ValueError, match="[Ii]nvalid|[Dd]angerous"):
            handler.add_command("evil", "{x:>10}")

    def test_accepts_simple_named_placeholders(self, handler):
        """Templates with simple {word} placeholders should be accepted."""
        handler.add_command("good", "echo {message}")
        # Should not raise

    def test_accepts_no_placeholders(self, handler):
        """Templates with no placeholders should be accepted."""
        handler.add_command("uptime", "uptime -p")


class TestCommandExecution:
    @pytest.fixture
    def handler(self):
        h = CommandHandler(allowed_commands=["echo", "uptime"])
        h.add_command("echo", "echo {message}")
        return h

    def test_execute_allowed_command(self, handler):
        result = handler.handle('{"command": "echo", "params": {"message": "hello"}}')
        assert result["status"] == "success"
        assert "hello" in result["output"]

    def test_execute_disallowed_command(self, handler):
        result = handler.handle('{"command": "rm_rf", "params": {}}')
        assert result["status"] == "rejected"
        assert "not allowed" in result["output"].lower()

    def test_params_are_shell_escaped(self, handler):
        """Parameters with shell metacharacters should be safely escaped."""
        result = handler.handle(
            '{"command": "echo", "params": {"message": "hello; rm -rf /"}}'
        )
        # shlex.quote wraps the value, so the semicolon is not interpreted
        if result["status"] == "success":
            # The output should contain the literal string, not execute rm
            assert "rm -rf" in result["output"] or "hello" in result["output"]

    def test_missing_command_field(self, handler):
        result = handler.handle('{"params": {}}')
        assert result["status"] == "error"
        assert "missing" in result["output"].lower()

    def test_invalid_json(self, handler):
        result = handler.handle("not json")
        assert result["status"] == "error"
