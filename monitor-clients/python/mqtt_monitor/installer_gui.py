"""Tkinter-based install wizard for the Windows MQTT Network Monitor client.

Usage:
    python -m mqtt_monitor.installer_gui
    (or run from a PyInstaller-frozen exe)
"""

import os
import re
import sys
import socket
import shutil
import subprocess
import threading
import tkinter as tk
from tkinter import ttk, messagebox
from pathlib import Path

import yaml

SERVICE_NAME = "MQTTNetworkMonitor"
SERVICE_DISPLAY = "MQTT Network Monitor"
SERVICE_DESC = "Monitors this PC and reports to MQTT Network Monitor addon"
INSTALL_DIR = Path(os.environ.get("PROGRAMFILES", r"C:\Program Files")) / "MQTTNetworkMonitor"
CONFIG_NAME = "config.yaml"


def _get_bundled_path(filename):
    """Get path to a file bundled inside the PyInstaller exe."""
    if getattr(sys, 'frozen', False):
        return Path(sys._MEIPASS) / "bundled" / filename
    # Dev mode: look in dist/ directory
    return Path(__file__).parent.parent / "dist" / filename

# ---------------------------------------------------------------------------
# Theme constants
# ---------------------------------------------------------------------------
BG = "#1a1a2e"
BG_LIGHT = "#22223a"
BG_INPUT = "#2a2a44"
FG = "#ffffff"
FG_DIM = "#aaaacc"
ACCENT = "#00D4FF"
ACCENT_HOVER = "#33e0ff"
ERROR_FG = "#ff5555"
SUCCESS_FG = "#55ff99"
FONT_FAMILY = "Segoe UI"
FONT = (FONT_FAMILY, 10)
FONT_BOLD = (FONT_FAMILY, 10, "bold")
FONT_TITLE = (FONT_FAMILY, 20, "bold")
FONT_SUBTITLE = (FONT_FAMILY, 11)
FONT_SMALL = (FONT_FAMILY, 9)

WIN_WIDTH = 500
WIN_HEIGHT = 450


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _sanitize_device_id(name: str) -> str:
    """Lowercase, spaces to underscores, strip non-alphanumeric/underscore/dash."""
    s = name.strip().lower().replace(" ", "_")
    return re.sub(r"[^a-z0-9_\-]", "", s)


def _center_window(win, w, h):
    sw = win.winfo_screenwidth()
    sh = win.winfo_screenheight()
    x = (sw - w) // 2
    y = (sh - h) // 2
    win.geometry(f"{w}x{h}+{x}+{y}")


def _build_config_yaml(data: dict) -> str:
    """Generate config YAML string from wizard data dict."""
    cfg = {
        "mqtt": {
            "broker": data["broker"],
            "port": data["port"],
        },
        "device": {
            "id": data["device_id"],
            "name": data["device_name"],
            "type": "windows",
            "tags": data["tags"],
        },
        "plugins": {},
    }

    if data.get("mqtt_user"):
        cfg["mqtt"]["username"] = data["mqtt_user"]
    if data.get("mqtt_pass"):
        cfg["mqtt"]["password"] = data["mqtt_pass"]

    if data["plugin_system_resources"]:
        cfg["plugins"]["system_resources"] = {
            "interval": data["interval_system_resources"],
            "attributes": ["cpu_usage", "memory_usage", "disk_usage", "uptime"],
        }

    if data["plugin_network_info"]:
        cfg["plugins"]["network_info"] = {
            "interval": data["interval_network_info"],
            "interfaces": ["Ethernet"],
        }

    if data["plugin_windows_system"]:
        cfg["plugins"]["windows_system"] = {
            "interval": data["interval_windows_system"],
            "attributes": [
                "os_version",
                "cpu_model",
                "installed_ram",
                "process_count",
            ],
        }

    if data["allowed_commands"]:
        cfg["allowed_commands"] = list(data["allowed_commands"])

    if data.get("allow_remote_exec"):
        cfg["allow_remote_exec"] = True

    return yaml.dump(cfg, default_flow_style=False, sort_keys=False, allow_unicode=True)


# ---------------------------------------------------------------------------
# Style setup
# ---------------------------------------------------------------------------

def _configure_style(style: ttk.Style):
    style.theme_use("clam")

    style.configure(".", background=BG, foreground=FG, font=FONT,
                     fieldbackground=BG_INPUT, borderwidth=0)
    style.configure("TFrame", background=BG)
    style.configure("TLabel", background=BG, foreground=FG, font=FONT)
    style.configure("Title.TLabel", font=FONT_TITLE, foreground=ACCENT)
    style.configure("Subtitle.TLabel", font=FONT_SUBTITLE, foreground=FG_DIM)
    style.configure("Small.TLabel", font=FONT_SMALL, foreground=FG_DIM)
    style.configure("Success.TLabel", foreground=SUCCESS_FG)
    style.configure("Error.TLabel", foreground=ERROR_FG)
    style.configure("Step.TLabel", font=FONT, foreground=FG_DIM)
    style.configure("StepDone.TLabel", font=FONT, foreground=SUCCESS_FG)
    style.configure("StepFail.TLabel", font=FONT, foreground=ERROR_FG)

    style.configure("TEntry", fieldbackground=BG_INPUT, foreground=FG,
                     insertcolor=FG, padding=5)

    style.configure("TCheckbutton", background=BG, foreground=FG, font=FONT)
    style.map("TCheckbutton",
              background=[("active", BG_LIGHT)],
              foreground=[("active", FG)])

    style.configure("Accent.TButton", background=ACCENT, foreground="#000000",
                     font=FONT_BOLD, padding=(16, 8))
    style.map("Accent.TButton",
              background=[("active", ACCENT_HOVER), ("disabled", "#555555")],
              foreground=[("disabled", "#888888")])

    style.configure("TButton", background=BG_LIGHT, foreground=FG,
                     font=FONT, padding=(12, 6))
    style.map("TButton",
              background=[("active", "#3a3a54")],
              foreground=[("active", FG)])

    style.configure("TCombobox", fieldbackground=BG_INPUT, foreground=FG,
                     selectbackground=ACCENT, selectforeground="#000000")
    style.map("TCombobox",
              fieldbackground=[("readonly", BG_INPUT)],
              foreground=[("readonly", FG)])

    style.configure("Horizontal.TProgressbar", troughcolor=BG_LIGHT,
                     background=ACCENT, thickness=8)


# ---------------------------------------------------------------------------
# Wizard class
# ---------------------------------------------------------------------------

class InstallerWizard:
    """Multi-screen install wizard."""

    def __init__(self):
        self.root = tk.Tk()
        from mqtt_monitor.version import __version__
        self.root.title(f"MQTT Network Monitor v{__version__} — Installer")
        self.root.configure(bg=BG)
        self.root.resizable(False, False)
        _center_window(self.root, WIN_WIDTH, WIN_HEIGHT)

        # Try to set icon (non-critical)
        try:
            self.root.iconbitmap(default="")
        except Exception:
            pass

        self.style = ttk.Style(self.root)
        _configure_style(self.style)

        # Wizard data
        self.data: dict = {}
        self._existing_config = self._load_existing_config()

        # Container that holds each screen frame
        self.container = ttk.Frame(self.root)
        self.container.pack(fill="both", expand=True)

        # Build all screens
        self.screens: list[ttk.Frame] = []
        self._build_welcome()        # 0
        self._build_mqtt()            # 1
        self._build_device()          # 2
        self._build_plugins()         # 3
        self._build_commands()        # 4
        self._build_installing()      # 5

        self.current_screen = 0
        self._show_screen(0)

    # ------------------------------------------------------------------
    # Navigation
    # ------------------------------------------------------------------

    @staticmethod
    def _load_existing_config():
        """Load existing config.yaml if present in install dir."""
        config_path = INSTALL_DIR / CONFIG_NAME
        if not config_path.exists():
            return None
        try:
            return yaml.safe_load(config_path.read_text(encoding="utf-8"))
        except Exception:
            return None

    def _ec(self, *keys, default=None):
        """Get a value from existing config by nested keys."""
        val = self._existing_config
        if val is None:
            return default
        for k in keys:
            if isinstance(val, dict):
                val = val.get(k)
            else:
                return default
        return val if val is not None else default

    def _show_screen(self, idx: int):
        for s in self.screens:
            s.pack_forget()
        self.screens[idx].pack(fill="both", expand=True, padx=24, pady=16)
        self.current_screen = idx

    def _next(self):
        self._show_screen(self.current_screen + 1)

    def _back(self):
        self._show_screen(self.current_screen - 1)

    # ------------------------------------------------------------------
    # Screen 0: Welcome
    # ------------------------------------------------------------------

    def _build_welcome(self):
        f = ttk.Frame(self.container)
        self.screens.append(f)

        is_upgrade = self._existing_config is not None

        spacer = ttk.Frame(f, height=60)
        spacer.pack()

        from mqtt_monitor.version import __version__
        ttk.Label(f, text="MQTT Network Monitor", style="Title.TLabel").pack(pady=(0, 8))
        ttk.Label(f, text="Monitor your Windows PC from Home Assistant",
                  style="Subtitle.TLabel").pack(pady=(0, 4))
        ttk.Label(f, text=f"v{__version__}", style="Small.TLabel").pack(pady=(0, 30))

        if is_upgrade:
            ttk.Label(f, text="An existing installation was detected.",
                      style="Small.TLabel").pack(pady=(0, 12))

        btn_frame = ttk.Frame(f)
        btn_frame.pack()
        ttk.Button(btn_frame, text="Upgrade" if is_upgrade else "Install",
                   style="Accent.TButton",
                   command=self._next).pack(side="left", padx=8)
        if is_upgrade:
            ttk.Button(btn_frame, text="Uninstall",
                       command=self._uninstall).pack(side="left", padx=8)
        ttk.Button(btn_frame, text="Cancel",
                   command=self.root.destroy).pack(side="left", padx=8)

    # ------------------------------------------------------------------
    # Screen 1: MQTT Connection
    # ------------------------------------------------------------------

    def _build_mqtt(self):
        f = ttk.Frame(self.container)
        self.screens.append(f)

        ttk.Label(f, text="MQTT Connection", style="Title.TLabel").pack(anchor="w", pady=(0, 12))

        # Broker
        ttk.Label(f, text="Broker IP / Hostname *").pack(anchor="w")
        self.broker_var = tk.StringVar(value=self._ec("mqtt", "broker", default=""))
        ttk.Entry(f, textvariable=self.broker_var, width=42).pack(anchor="w", pady=(0, 8))

        # Port
        ttk.Label(f, text="Port").pack(anchor="w")
        self.port_var = tk.StringVar(value=str(self._ec("mqtt", "port", default=1883)))
        ttk.Entry(f, textvariable=self.port_var, width=10).pack(anchor="w", pady=(0, 8))

        # Username
        ttk.Label(f, text="Username (optional)").pack(anchor="w")
        self.mqtt_user_var = tk.StringVar(value=self._ec("mqtt", "username", default=""))
        ttk.Entry(f, textvariable=self.mqtt_user_var, width=30).pack(anchor="w", pady=(0, 8))

        # Password
        ttk.Label(f, text="Password (optional)").pack(anchor="w")
        pw_frame = ttk.Frame(f)
        pw_frame.pack(anchor="w", pady=(0, 8))
        self.mqtt_pass_var = tk.StringVar(value=self._ec("mqtt", "password", default=""))
        self.pw_entry = ttk.Entry(pw_frame, textvariable=self.mqtt_pass_var, width=26, show="*")
        self.pw_entry.pack(side="left")
        self._pw_visible = False
        ttk.Button(pw_frame, text="Show", width=5,
                   command=self._toggle_password).pack(side="left", padx=(4, 0))

        # Test connection
        test_frame = ttk.Frame(f)
        test_frame.pack(anchor="w", pady=(4, 0))
        ttk.Button(test_frame, text="Test Connection",
                   command=self._test_mqtt).pack(side="left")
        self.test_label = ttk.Label(test_frame, text="", style="Small.TLabel")
        self.test_label.pack(side="left", padx=(10, 0))

        # Nav
        nav = ttk.Frame(f)
        nav.pack(side="bottom", fill="x", pady=(12, 0))
        ttk.Button(nav, text="Back", command=self._back).pack(side="left")
        ttk.Button(nav, text="Next", style="Accent.TButton",
                   command=self._mqtt_next).pack(side="right")

    def _toggle_password(self):
        self._pw_visible = not self._pw_visible
        self.pw_entry.configure(show="" if self._pw_visible else "*")

    def _mqtt_next(self):
        broker = self.broker_var.get().strip()
        if not broker:
            messagebox.showwarning("Required", "Broker IP or hostname is required.")
            return
        try:
            port = int(self.port_var.get().strip())
        except ValueError:
            messagebox.showwarning("Invalid", "Port must be a number.")
            return
        self.data["broker"] = broker
        self.data["port"] = port
        self.data["mqtt_user"] = self.mqtt_user_var.get().strip()
        self.data["mqtt_pass"] = self.mqtt_pass_var.get().strip()
        self._next()

    def _test_mqtt(self):
        self.test_label.configure(text="Connecting...", style="Small.TLabel")
        broker = self.broker_var.get().strip()
        port_str = self.port_var.get().strip()
        user = self.mqtt_user_var.get().strip()
        pw = self.mqtt_pass_var.get().strip()

        if not broker:
            self.test_label.configure(text="Enter broker first", style="Error.TLabel")
            return
        try:
            port = int(port_str)
        except ValueError:
            self.test_label.configure(text="Invalid port", style="Error.TLabel")
            return

        def _do_test():
            try:
                import paho.mqtt.client as mqtt
            except ImportError:
                self.root.after(0, lambda: self.test_label.configure(
                    text="paho-mqtt not installed", style="Error.TLabel"))
                return

            result_holder = {}

            def on_connect(client, userdata, flags, rc, *args):
                result_holder["rc"] = rc

            try:
                client = mqtt.Client(
                    client_id="mqtt_monitor_installer_test",
                    protocol=mqtt.MQTTv311,
                )
                if user:
                    client.username_pw_set(user, pw or None)
                client.on_connect = on_connect
                client.connect(broker, port, keepalive=5)
                client.loop_start()

                # Wait up to 5 seconds for connection
                import time
                for _ in range(50):
                    if "rc" in result_holder:
                        break
                    time.sleep(0.1)

                client.loop_stop()
                client.disconnect()

                rc = result_holder.get("rc")
                if rc == 0:
                    self.root.after(0, lambda: self.test_label.configure(
                        text="Connected successfully!", style="Success.TLabel"))
                elif rc is not None:
                    codes = {
                        1: "bad protocol",
                        2: "client ID rejected",
                        3: "server unavailable",
                        4: "bad credentials",
                        5: "not authorised",
                    }
                    msg = codes.get(rc, f"rc={rc}")
                    self.root.after(0, lambda m=msg: self.test_label.configure(
                        text=f"Failed: {m}", style="Error.TLabel"))
                else:
                    self.root.after(0, lambda: self.test_label.configure(
                        text="Timed out", style="Error.TLabel"))
            except Exception as e:
                self.root.after(0, lambda e=e: self.test_label.configure(
                    text=f"Error: {e}", style="Error.TLabel"))

        threading.Thread(target=_do_test, daemon=True).start()

    # ------------------------------------------------------------------
    # Screen 2: Device Identity
    # ------------------------------------------------------------------

    def _build_device(self):
        f = ttk.Frame(self.container)
        self.screens.append(f)

        ttk.Label(f, text="Device Identity", style="Title.TLabel").pack(anchor="w", pady=(0, 12))

        hostname = socket.gethostname()

        # Device name
        ttk.Label(f, text="Device Name").pack(anchor="w")
        self.device_name_var = tk.StringVar(value=self._ec("device", "name", default=hostname))
        name_entry = ttk.Entry(f, textvariable=self.device_name_var, width=42)
        name_entry.pack(anchor="w", pady=(0, 8))

        # Device ID (auto-derived)
        ttk.Label(f, text="Device ID (used in MQTT topics)").pack(anchor="w")
        self.device_id_var = tk.StringVar(value=self._ec("device", "id", default=_sanitize_device_id(hostname)))
        id_entry = ttk.Entry(f, textvariable=self.device_id_var, width=42)
        id_entry.pack(anchor="w", pady=(0, 4))
        ttk.Label(f, text="Auto-generated from name. Edit if needed.",
                  style="Small.TLabel").pack(anchor="w", pady=(0, 8))

        # Auto-update device ID when name changes
        def _on_name_change(*_):
            self.device_id_var.set(_sanitize_device_id(self.device_name_var.get()))
        self.device_name_var.trace_add("write", _on_name_change)

        # Tags
        ttk.Label(f, text="Tags (comma-separated)").pack(anchor="w")
        existing_tags = self._ec("device", "tags", default=["desktop", "windows"])
        self.tags_var = tk.StringVar(value=", ".join(existing_tags) if isinstance(existing_tags, list) else "desktop, windows")
        ttk.Entry(f, textvariable=self.tags_var, width=42).pack(anchor="w", pady=(0, 8))

        # Nav
        nav = ttk.Frame(f)
        nav.pack(side="bottom", fill="x", pady=(12, 0))
        ttk.Button(nav, text="Back", command=self._back).pack(side="left")
        ttk.Button(nav, text="Next", style="Accent.TButton",
                   command=self._device_next).pack(side="right")

    def _device_next(self):
        name = self.device_name_var.get().strip()
        did = self.device_id_var.get().strip()
        if not name or not did:
            messagebox.showwarning("Required", "Device name and ID are required.")
            return
        self.data["device_name"] = name
        self.data["device_id"] = did
        raw_tags = [t.strip() for t in self.tags_var.get().split(",") if t.strip()]
        self.data["tags"] = raw_tags if raw_tags else ["desktop", "windows"]
        self._next()

    # ------------------------------------------------------------------
    # Screen 3: Plugins
    # ------------------------------------------------------------------

    def _build_plugins(self):
        f = ttk.Frame(self.container)
        self.screens.append(f)

        ttk.Label(f, text="Monitoring Plugins", style="Title.TLabel").pack(anchor="w", pady=(0, 12))

        # System Resources
        row1 = ttk.Frame(f)
        row1.pack(anchor="w", fill="x", pady=(0, 10))
        self.chk_sysres = tk.BooleanVar(value="system_resources" in self._ec("plugins", default={})  if self._existing_config else True)
        ttk.Checkbutton(row1, text="System Resources (CPU, memory, disk, uptime)",
                        variable=self.chk_sysres).pack(side="left")
        self.interval_sysres = tk.StringVar(value=str(self._ec("plugins", "system_resources", "interval", default=30)))
        cb1 = ttk.Combobox(row1, textvariable=self.interval_sysres,
                           values=["10", "30", "60"], width=5, state="readonly")
        cb1.pack(side="right")
        ttk.Label(row1, text="sec", style="Small.TLabel").pack(side="right", padx=(0, 4))

        # Network Info
        row2 = ttk.Frame(f)
        row2.pack(anchor="w", fill="x", pady=(0, 10))
        self.chk_netinfo = tk.BooleanVar(value="network_info" in self._ec("plugins", default={}) if self._existing_config else True)
        ttk.Checkbutton(row2, text="Network Info (IP, MAC, gateway, WiFi)",
                        variable=self.chk_netinfo).pack(side="left")
        self.interval_netinfo = tk.StringVar(value=str(self._ec("plugins", "network_info", "interval", default=60)))
        cb2 = ttk.Combobox(row2, textvariable=self.interval_netinfo,
                           values=["30", "60", "300"], width=5, state="readonly")
        cb2.pack(side="right")
        ttk.Label(row2, text="sec", style="Small.TLabel").pack(side="right", padx=(0, 4))

        # Windows System
        row3 = ttk.Frame(f)
        row3.pack(anchor="w", fill="x", pady=(0, 10))
        self.chk_winsys = tk.BooleanVar(value="windows_system" in self._ec("plugins", default={}) if self._existing_config else True)
        ttk.Checkbutton(row3, text="Windows System (OS, CPU model, RAM, GPU, processes)",
                        variable=self.chk_winsys).pack(side="left")
        self.interval_winsys = tk.StringVar(value=str(self._ec("plugins", "windows_system", "interval", default=300)))
        cb3 = ttk.Combobox(row3, textvariable=self.interval_winsys,
                           values=["60", "300", "600"], width=5, state="readonly")
        cb3.pack(side="right")
        ttk.Label(row3, text="sec", style="Small.TLabel").pack(side="right", padx=(0, 4))

        # Nav
        nav = ttk.Frame(f)
        nav.pack(side="bottom", fill="x", pady=(12, 0))
        ttk.Button(nav, text="Back", command=self._back).pack(side="left")
        ttk.Button(nav, text="Next", style="Accent.TButton",
                   command=self._plugins_next).pack(side="right")

    def _plugins_next(self):
        self.data["plugin_system_resources"] = self.chk_sysres.get()
        self.data["plugin_network_info"] = self.chk_netinfo.get()
        self.data["plugin_windows_system"] = self.chk_winsys.get()
        self.data["interval_system_resources"] = int(self.interval_sysres.get())
        self.data["interval_network_info"] = int(self.interval_netinfo.get())
        self.data["interval_windows_system"] = int(self.interval_winsys.get())
        self._next()

    # ------------------------------------------------------------------
    # Screen 4: Remote Commands
    # ------------------------------------------------------------------

    def _build_commands(self):
        f = ttk.Frame(self.container)
        self.screens.append(f)

        ttk.Label(f, text="Remote Commands", style="Title.TLabel").pack(anchor="w", pady=(0, 4))
        ttk.Label(f, text="Commands the HA addon is allowed to execute on this PC.",
                  style="Small.TLabel").pack(anchor="w", pady=(0, 10))

        # Listbox
        lb_frame = ttk.Frame(f)
        lb_frame.pack(fill="both", expand=True, pady=(0, 8))
        self.cmd_listbox = tk.Listbox(lb_frame, bg=BG_INPUT, fg=FG,
                                      selectbackground=ACCENT,
                                      selectforeground="#000000",
                                      font=FONT, borderwidth=0,
                                      highlightthickness=0)
        self.cmd_listbox.pack(fill="both", expand=True, side="left")
        sb = ttk.Scrollbar(lb_frame, orient="vertical", command=self.cmd_listbox.yview)
        sb.pack(side="right", fill="y")
        self.cmd_listbox.configure(yscrollcommand=sb.set)

        # Pre-populate
        existing_cmds = self._ec("allowed_commands", default=["Stop-Computer -Force", "Restart-Computer -Force", "shutdown /a"])
        for cmd in (existing_cmds if isinstance(existing_cmds, list) else []):
            self.cmd_listbox.insert("end", cmd)

        # Add / remove
        add_frame = ttk.Frame(f)
        add_frame.pack(fill="x", pady=(0, 8))
        self.cmd_entry_var = tk.StringVar()
        ttk.Entry(add_frame, textvariable=self.cmd_entry_var, width=34).pack(side="left")
        ttk.Button(add_frame, text="Add", command=self._cmd_add).pack(side="left", padx=(6, 0))
        ttk.Button(add_frame, text="Remove", command=self._cmd_remove).pack(side="left", padx=(6, 0))

        # Allow remote execution toggle
        self.allow_remote_exec_var = tk.BooleanVar(
            value=self._ec("allow_remote_exec", default=True)
        )
        ttk.Checkbutton(
            f,
            text="Allow remote command execution from HA addon",
            variable=self.allow_remote_exec_var,
        ).pack(anchor="w", pady=(4, 0))
        ttk.Label(
            f,
            text="When enabled, the HA addon can push and execute commands on this PC.",
            style="Small.TLabel",
        ).pack(anchor="w", pady=(0, 8))

        # Nav
        nav = ttk.Frame(f)
        nav.pack(side="bottom", fill="x", pady=(4, 0))
        ttk.Button(nav, text="Back", command=self._back).pack(side="left")
        ttk.Button(nav, text="Skip", command=self._cmd_skip).pack(side="left", padx=(8, 0))
        ttk.Button(nav, text="Next", style="Accent.TButton",
                   command=self._cmd_next).pack(side="right")

    def _cmd_add(self):
        cmd = self.cmd_entry_var.get().strip()
        if cmd:
            self.cmd_listbox.insert("end", cmd)
            self.cmd_entry_var.set("")

    def _cmd_remove(self):
        sel = self.cmd_listbox.curselection()
        if sel:
            self.cmd_listbox.delete(sel[0])

    def _cmd_next(self):
        self.data["allowed_commands"] = list(self.cmd_listbox.get(0, "end"))
        self.data["allow_remote_exec"] = self.allow_remote_exec_var.get()
        self._next()
        self._run_install()

    def _cmd_skip(self):
        self.data["allowed_commands"] = []
        self.data["allow_remote_exec"] = False
        self._next()
        self._run_install()

    # ------------------------------------------------------------------
    # Screen 5: Installing
    # ------------------------------------------------------------------

    def _build_installing(self):
        f = ttk.Frame(self.container)
        self.screens.append(f)

        ttk.Label(f, text="Installing...", style="Title.TLabel").pack(anchor="w", pady=(0, 16))

        self.steps_frame = ttk.Frame(f)
        self.steps_frame.pack(fill="x", anchor="w")

        step_texts = [
            "Creating directory...",
            "Copying files...",
            "Writing configuration...",
            "Registering service...",
            "Starting service...",
        ]
        self.step_labels: list[ttk.Label] = []
        for text in step_texts:
            lbl = ttk.Label(self.steps_frame, text=f"     {text}", style="Step.TLabel")
            lbl.pack(anchor="w", pady=3)
            self.step_labels.append(lbl)

        self.progress = ttk.Progressbar(f, mode="determinate", maximum=len(step_texts),
                                        style="Horizontal.TProgressbar")
        self.progress.pack(fill="x", pady=(16, 8))

        self.status_label = ttk.Label(f, text="", style="Small.TLabel", wraplength=440)
        self.status_label.pack(anchor="w", pady=(4, 0))

        # Close button (hidden until done)
        self.close_btn = ttk.Button(f, text="Close", style="Accent.TButton",
                                    command=self.root.destroy)

    def _mark_step(self, idx: int, success: bool = True):
        mark = "\u2714" if success else "\u2718"
        style = "StepDone.TLabel" if success else "StepFail.TLabel"
        current_text = self.step_labels[idx].cget("text")
        # Replace leading spaces with mark
        new_text = f"  {mark}  {current_text.strip()}"
        self.step_labels[idx].configure(text=new_text, style=style)
        self.progress["value"] = idx + 1

    def _run_install(self):
        """Execute install steps in a background thread."""
        threading.Thread(target=self._install_thread, daemon=True).start()

    def _install_thread(self):
        """Perform the actual installation steps."""
        import time

        def ui(fn):
            self.root.after(0, fn)

        try:
            # Step 0: Create directory
            INSTALL_DIR.mkdir(parents=True, exist_ok=True)
            ui(lambda: self._mark_step(0, True))
            time.sleep(0.3)

            # Step 1: Copy files from bundled data
            # Stop existing service first
            nssm_dst = INSTALL_DIR / "nssm.exe"
            if nssm_dst.exists():
                subprocess.run([str(nssm_dst), "stop", SERVICE_NAME], capture_output=True)
                time.sleep(1)

            monitor_src = _get_bundled_path("mqtt-network-monitor.exe")
            nssm_src = _get_bundled_path("nssm.exe")

            if not monitor_src.exists():
                ui(lambda: self._mark_step(1, False))
                ui(lambda: self.status_label.configure(
                    text=f"Bundled monitor exe not found at: {monitor_src}",
                    style="Error.TLabel"))
                ui(lambda: self.close_btn.pack(pady=(16, 0)))
                return

            if not nssm_src.exists():
                ui(lambda: self._mark_step(1, False))
                ui(lambda: self.status_label.configure(
                    text=f"Bundled nssm.exe not found at: {nssm_src}",
                    style="Error.TLabel"))
                ui(lambda: self.close_btn.pack(pady=(16, 0)))
                return

            shutil.copy2(monitor_src, INSTALL_DIR / "mqtt-network-monitor.exe")
            shutil.copy2(nssm_src, INSTALL_DIR / "nssm.exe")
            ui(lambda: self._mark_step(1, True))
            time.sleep(0.3)

            # Step 2: Write configuration
            # On upgrade, wizard is pre-filled with existing values,
            # so writing is safe — user's changes are intentional
            config_yaml = _build_config_yaml(self.data)
            config_path = INSTALL_DIR / CONFIG_NAME
            config_path.write_text(config_yaml, encoding="utf-8")
            ui(lambda: self._mark_step(2, True))
            time.sleep(0.3)

            # Step 3: Register Windows service via NSSM
            nssm = str(INSTALL_DIR / "nssm.exe")
            monitor = str(INSTALL_DIR / "mqtt-network-monitor.exe")

            # Remove old service if exists
            subprocess.run([nssm, "remove", SERVICE_NAME, "confirm"], capture_output=True)
            time.sleep(0.5)

            # Install
            result = subprocess.run([nssm, "install", SERVICE_NAME, monitor],
                                    capture_output=True, text=True)
            reg_ok = result.returncode == 0

            if reg_ok:
                subprocess.run([nssm, "set", SERVICE_NAME, "DisplayName", SERVICE_DISPLAY], capture_output=True)
                subprocess.run([nssm, "set", SERVICE_NAME, "Description", SERVICE_DESC], capture_output=True)
                subprocess.run([nssm, "set", SERVICE_NAME, "AppDirectory", str(INSTALL_DIR)], capture_output=True)
                subprocess.run([nssm, "set", SERVICE_NAME, "Start", "SERVICE_AUTO_START"], capture_output=True)
                subprocess.run([nssm, "set", SERVICE_NAME, "AppExit", "Default", "Restart"], capture_output=True)
                subprocess.run([nssm, "set", SERVICE_NAME, "AppRestartDelay", "10000"], capture_output=True)
                log_path = str(INSTALL_DIR / "monitor.log")
                subprocess.run([nssm, "set", SERVICE_NAME, "AppStdout", log_path], capture_output=True)
                subprocess.run([nssm, "set", SERVICE_NAME, "AppStderr", log_path], capture_output=True)
                subprocess.run([nssm, "set", SERVICE_NAME, "AppStdoutCreationDisposition", "4"], capture_output=True)
                subprocess.run([nssm, "set", SERVICE_NAME, "AppStderrCreationDisposition", "4"], capture_output=True)

            ui(lambda: self._mark_step(3, reg_ok))
            time.sleep(0.3)

            # Step 4: Start the service
            if reg_ok:
                result = subprocess.run([nssm, "start", SERVICE_NAME],
                                        capture_output=True, text=True)
                start_ok = result.returncode == 0
            else:
                start_ok = False
            ui(lambda: self._mark_step(4, start_ok))

            if reg_ok and start_ok:
                ui(lambda: self.status_label.configure(
                    text="Installation complete! Your device should appear in the "
                         "MQTT Network Monitor dashboard within 30 seconds.",
                    style="Success.TLabel"))
            elif reg_ok:
                ui(lambda: self.status_label.configure(
                    text=f"Service registered but failed to start. Check {INSTALL_DIR / 'monitor.log'}",
                    style="Error.TLabel"))
            else:
                ui(lambda: self.status_label.configure(
                    text="Service registration failed. Make sure you're running as Administrator.",
                    style="Error.TLabel"))

        except Exception as exc:
            ui(lambda: self.status_label.configure(
                text=f"Installation failed: {exc}", style="Error.TLabel"))

        # Show close button
        ui(lambda: self.close_btn.pack(pady=(16, 0)))

    # ------------------------------------------------------------------
    # Run
    # ------------------------------------------------------------------

    # ------------------------------------------------------------------
    # Uninstall
    # ------------------------------------------------------------------

    def _uninstall(self):
        if not messagebox.askyesno(
            "Uninstall",
            "This will stop the monitor service, remove it, and delete all files "
            f"from {INSTALL_DIR}.\n\nAre you sure?"
        ):
            return

        # Switch to installing screen to show progress
        self._show_screen(len(self.screens) - 1)

        # Reuse progress UI
        for lbl in self.step_labels:
            lbl.configure(text="", style="Step.TLabel")
        self.progress["value"] = 0
        self.status_label.configure(text="")

        step_texts = [
            "Stopping service...",
            "Removing service...",
            "Deleting files...",
        ]
        for i, text in enumerate(step_texts):
            if i < len(self.step_labels):
                self.step_labels[i].configure(text=f"     {text}")
        self.progress["maximum"] = len(step_texts)

        # Change title
        for child in self.screens[-1].winfo_children():
            if hasattr(child, 'cget') and child.cget("style") == "Title.TLabel":
                child.configure(text="Uninstalling...")
                break

        threading.Thread(target=self._uninstall_thread, daemon=True).start()

    def _uninstall_thread(self):
        import time

        def ui(fn):
            self.root.after(0, fn)

        try:
            # Step 0: Stop service
            nssm = str(INSTALL_DIR / "nssm.exe")
            subprocess.run([nssm, "stop", SERVICE_NAME], capture_output=True)
            time.sleep(1)
            ui(lambda: self._mark_step(0, True))
            time.sleep(0.3)

            # Step 1: Remove service
            result = subprocess.run([nssm, "remove", SERVICE_NAME, "confirm"],
                                    capture_output=True, text=True)
            ui(lambda: self._mark_step(1, result.returncode == 0))
            time.sleep(0.3)

            # Step 2: Delete install directory
            import shutil
            try:
                shutil.rmtree(INSTALL_DIR)
                ui(lambda: self._mark_step(2, True))
            except Exception as e:
                ui(lambda: self._mark_step(2, False))
                ui(lambda: self.status_label.configure(
                    text=f"Could not fully remove {INSTALL_DIR}: {e}\nSome files may need manual deletion.",
                    style="Error.TLabel"))
                ui(lambda: self.close_btn.pack(pady=(16, 0)))
                return

            ui(lambda: self.status_label.configure(
                text="Uninstall complete. MQTT Network Monitor has been removed.",
                style="Success.TLabel"))

        except Exception as exc:
            ui(lambda: self.status_label.configure(
                text=f"Uninstall failed: {exc}", style="Error.TLabel"))

        ui(lambda: self.close_btn.pack(pady=(16, 0)))

    def run(self):
        self.root.mainloop()


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

def main():
    wizard = InstallerWizard()
    wizard.run()


if __name__ == "__main__":
    main()
