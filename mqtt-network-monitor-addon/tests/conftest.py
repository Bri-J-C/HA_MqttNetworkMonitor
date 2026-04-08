import pytest
import tempfile
import shutil
from pathlib import Path
from server.storage.store import Storage
from server.device_registry import DeviceRegistry
from server.settings_manager import SettingsManager


@pytest.fixture
def tmp_data_dir(tmp_path):
    """Provides a temporary data directory for storage."""
    return tmp_path


@pytest.fixture
def storage(tmp_data_dir):
    """Provides a Storage instance backed by a temp directory."""
    return Storage(tmp_data_dir)


@pytest.fixture
def registry(storage):
    """Provides a DeviceRegistry with clean storage."""
    return DeviceRegistry(storage)


@pytest.fixture
def settings_manager(storage):
    """Provides a SettingsManager with clean storage."""
    return SettingsManager(storage)
