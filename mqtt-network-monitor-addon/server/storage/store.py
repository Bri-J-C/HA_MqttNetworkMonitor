"""JSON file persistence for device registry, topology layouts, and groups."""

import json
import logging
from pathlib import Path
from typing import Any

logger = logging.getLogger(__name__)


class Storage:
    def __init__(self, data_dir: Path):
        self.data_dir = data_dir
        self.data_dir.mkdir(parents=True, exist_ok=True)

    def load(self, filename: str) -> Any:
        assert '/' not in filename and '..' not in filename, f"Invalid filename: {filename}"
        path = self.data_dir / filename
        if not path.exists():
            return None
        try:
            return json.loads(path.read_text())
        except (json.JSONDecodeError, OSError) as e:
            logger.error(f"Failed to load {filename}: {e}")
            return None

    def save(self, filename: str, data: Any) -> None:
        assert '/' not in filename and '..' not in filename, f"Invalid filename: {filename}"
        path = self.data_dir / filename
        tmp_path = path.with_suffix(".tmp")
        try:
            tmp_path.write_text(json.dumps(data, indent=2))
            tmp_path.replace(path)
        except OSError as e:
            logger.error(f"Failed to save {filename}: {e}")
