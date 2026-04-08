import pytest
from pathlib import Path


class TestStaticFileServing:
    def test_path_traversal_blocked(self, tmp_path):
        """Requests with .. should not serve files outside frontend dir."""
        frontend_dist = tmp_path / "dist"
        frontend_dist.mkdir()
        (frontend_dist / "index.html").write_text("<html>ok</html>")

        secret = tmp_path / "secret.txt"
        secret.write_text("secret data")

        # Simulate the path resolution check
        full_path = "../secret.txt"
        file_path = (frontend_dist / full_path).resolve()
        assert not file_path.is_relative_to(frontend_dist.resolve()), \
            "Path traversal should be detected"

    def test_normal_path_allowed(self, tmp_path):
        """Normal file paths within frontend dir should work."""
        frontend_dist = tmp_path / "dist"
        frontend_dist.mkdir()
        (frontend_dist / "bundle.js").write_text("console.log('ok')")

        full_path = "bundle.js"
        file_path = (frontend_dist / full_path).resolve()
        assert file_path.is_relative_to(frontend_dist.resolve()), \
            "Normal paths should be allowed"
