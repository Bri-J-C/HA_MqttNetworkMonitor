"""Two-stage build for Windows distribution.

Stage 1: Build the headless monitor exe
Stage 2: Build the setup exe, bundling the monitor exe + nssm.exe inside

Run on Windows with Python 3.10+:
    pip install pyinstaller paho-mqtt psutil pyyaml
    python build_windows.py

Produces: dist/mqtt-network-monitor-setup.exe (single file, everything included)
"""

import subprocess
import sys
import shutil
from pathlib import Path

def run(cmd):
    print(f"  > {' '.join(cmd)}")
    subprocess.run(cmd, check=True)

def main():
    dist = Path("dist")

    # Clean previous builds
    for d in [dist, Path("build")]:
        if d.exists():
            shutil.rmtree(d)

    # Verify nssm.exe exists
    nssm = Path("nssm/nssm.exe")
    if not nssm.exists():
        print(f"ERROR: {nssm} not found. Download NSSM and place nssm.exe in nssm/")
        sys.exit(1)

    # Stage 1: Build the monitor exe
    print("Stage 1: Building monitor exe...")
    run([
        sys.executable, "-m", "PyInstaller",
        "--onefile",
        "--noconsole",
        "--name", "mqtt-network-monitor",
        "--hidden-import", "mqtt_monitor.plugins.system_resources",
        "--hidden-import", "mqtt_monitor.plugins.network_info",
        "--hidden-import", "mqtt_monitor.plugins.windows_system",
        "--hidden-import", "mqtt_monitor.plugins.custom_command",
        "--hidden-import", "mqtt_monitor.plugins.registry",
        "--hidden-import", "mqtt_monitor.config_handler",
        "--hidden-import", "mqtt_monitor.command_handler",
        "--hidden-import", "mqtt_monitor.message",
        "monitor_entry.py",
    ])

    monitor_exe = dist / "mqtt-network-monitor.exe"
    if not monitor_exe.exists():
        print(f"ERROR: Monitor build failed — {monitor_exe} not found")
        sys.exit(1)
    print(f"  Built: {monitor_exe}")

    # Clean PyInstaller temp files before stage 2
    build_dir = Path("build")
    if build_dir.exists():
        shutil.rmtree(build_dir)
    for spec in Path(".").glob("*.spec"):
        spec.unlink()

    # Read version
    version = "dev"
    try:
        spec = {}
        exec(Path("mqtt_monitor/version.py").read_text(), spec)
        version = spec.get("__version__", "dev")
    except Exception:
        pass

    # Stage 2: Build the setup exe, bundling monitor + nssm inside
    setup_name = f"mqtt-network-monitor-{version}-setup"
    print(f"Stage 2: Building {setup_name}.exe (bundling monitor + nssm)...")
    run([
        sys.executable, "-m", "PyInstaller",
        "--onefile",
        "--noconsole",
        "--uac-admin",
        "--name", setup_name,
        "--add-data", f"{monitor_exe};bundled",
        "--add-data", f"{nssm};bundled",
        "--hidden-import", "mqtt_monitor.installer_gui",
        "setup_entry.py",
    ])

    setup_exe = dist / f"{setup_name}.exe"
    if not setup_exe.exists():
        print(f"ERROR: Setup build failed — {setup_exe} not found")
        sys.exit(1)

    # Clean up — only keep the setup exe in dist
    monitor_exe.unlink()
    print()
    print(f"Build complete!")
    print(f"  {setup_exe}")
    print()
    print("This single file contains everything. Double-click to install.")

if __name__ == "__main__":
    main()
