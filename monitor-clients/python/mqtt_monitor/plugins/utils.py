"""Shared utilities for monitor plugins."""

import logging
import subprocess

logger = logging.getLogger(__name__)


def run_command(cmd, timeout=5):
    """Run a shell command safely, return stripped stdout or None."""
    try:
        proc = subprocess.run(
            cmd, shell=True, capture_output=True, text=True, timeout=timeout
        )
        return proc.stdout.strip() if proc.returncode == 0 else None
    except (subprocess.TimeoutExpired, OSError) as e:
        logger.debug("Command failed: %s: %s", cmd, e)
        return None


def run_command_tolerant(cmd, timeout=5):
    """Run a shell command and return stripped stdout regardless of exit code."""
    try:
        proc = subprocess.run(
            cmd, shell=True, capture_output=True, text=True, timeout=timeout
        )
        return proc.stdout.strip()
    except (subprocess.TimeoutExpired, OSError) as e:
        logger.debug("Command failed: %s: %s", cmd, e)
        return None


def run_command_int(cmd, timeout=5):
    """Run a command and return result as int, or 0 on failure."""
    val = run_command(cmd, timeout)
    try:
        return int(val) if val is not None else 0
    except (ValueError, TypeError):
        return 0


def collector(attr_name):
    """Decorator that registers a function as a named metric collector.

    The decorated function is added to the module-level COLLECTORS dict
    of the module where the decorated function is defined.
    """
    def decorator(func):
        # Stash the collector name on the function so the per-module
        # COLLECTORS dict can be populated at decoration time by the
        # caller's module-level code.
        func._collector_name = attr_name
        return func
    return decorator


def make_collector(registry):
    """Create a collector decorator bound to a specific registry dict.

    Usage at the top of a plugin module::

        COLLECTORS = {}
        collector = make_collector(COLLECTORS)
    """
    def _collector(attr_name):
        def decorator(func):
            registry[attr_name] = func
            return func
        return decorator
    return _collector
