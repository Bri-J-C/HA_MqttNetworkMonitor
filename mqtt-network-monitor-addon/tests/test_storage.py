import pytest
from server.storage.store import Storage


class TestStorageValidation:
    def test_load_rejects_path_traversal_slash(self, storage):
        with pytest.raises(ValueError, match="Invalid filename"):
            storage.load("../etc/passwd")

    def test_load_rejects_path_traversal_dotdot(self, storage):
        with pytest.raises(ValueError, match="Invalid filename"):
            storage.load("foo/../bar.json")

    def test_save_rejects_path_traversal_slash(self, storage):
        with pytest.raises(ValueError, match="Invalid filename"):
            storage.save("../evil.json", {"x": 1})

    def test_save_rejects_path_traversal_dotdot(self, storage):
        with pytest.raises(ValueError, match="Invalid filename"):
            storage.save("foo/../evil.json", {"x": 1})

    def test_load_valid_filename_works(self, storage):
        storage.save("test.json", {"key": "value"})
        result = storage.load("test.json")
        assert result == {"key": "value"}

    def test_load_missing_file_returns_empty_dict(self, storage):
        result = storage.load("nonexistent.json")
        assert result == {}

    def test_save_atomic_write(self, storage, tmp_data_dir):
        storage.save("atomic.json", {"data": 123})
        path = tmp_data_dir / "atomic.json"
        assert path.exists()
        tmp_files = list(tmp_data_dir.glob("*.tmp"))
        assert len(tmp_files) == 0
