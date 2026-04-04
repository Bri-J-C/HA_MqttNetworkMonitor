"""Entry point for the installer wizard exe."""
import sys

def main():
    try:
        from mqtt_monitor.installer_gui import main as wizard_main
        wizard_main()
    except Exception as e:
        try:
            import tkinter.messagebox as mb
            mb.showerror("Installer Error", f"{type(e).__name__}: {e}")
        except Exception:
            import traceback
            traceback.print_exc()
            input("Press Enter to close...")

if __name__ == "__main__":
    main()
