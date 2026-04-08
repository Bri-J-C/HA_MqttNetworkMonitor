import os
import logging
from fastapi import Request
from starlette.responses import JSONResponse

logger = logging.getLogger(__name__)

PUBLIC_PATHS = ("/health",)


async def require_ingress(request: Request, call_next):
    """Middleware ensuring requests come through HA Ingress proxy.

    In dev mode (DEV_MODE=1), all requests are allowed.
    Health and non-API paths are always allowed.
    API paths require the X-Ingress-Path header.
    """
    path = request.url.path

    if any(path.startswith(p) for p in PUBLIC_PATHS):
        return await call_next(request)

    if os.environ.get("DEV_MODE") == "1":
        return await call_next(request)

    if not path.startswith("/api"):
        return await call_next(request)

    if not request.headers.get("X-Ingress-Path"):
        logger.warning(f"Blocked direct API access to {path}")
        return JSONResponse(
            status_code=403,
            content={"detail": "Direct API access not allowed. Use Home Assistant Ingress."},
        )

    return await call_next(request)
