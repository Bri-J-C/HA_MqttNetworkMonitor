"""Entry point for the headless monitor exe. No GUI, no installer."""
import logging
import sys
from pathlib import Path
from mqtt_monitor.config import ConfigLoader

def main():
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    )

    # Config path: first arg, or config.yaml in the exe's own directory
    if len(sys.argv) > 1:
        config_path = Path(sys.argv[1])
    else:
        if getattr(sys, 'frozen', False):
            config_path = Path(sys.executable).parent / "config.yaml"
        else:
            config_path = Path("config.yaml")

    if not config_path.exists():
        logging.error(f"Config not found: {config_path}")
        sys.exit(1)

    remote_path = config_path.parent / "config.remote.yaml"
    config = ConfigLoader.load_with_remote(config_path, remote_path)
    logging.info(f"Starting monitor for device: {config.device.id}")

    from mqtt_monitor.client import MQTTMonitorClient
    client = MQTTMonitorClient(config, config_dir=config_path.parent)
    client.run()

if __name__ == "__main__":
    main()
