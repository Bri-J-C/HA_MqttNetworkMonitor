import os
import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient
from server.auth import require_ingress


class TestIngressAuth:
    @pytest.fixture
    def app_with_auth(self):
        app = FastAPI()
        app.middleware("http")(require_ingress)

        @app.get("/api/test")
        def test_endpoint():
            return {"ok": True}

        @app.get("/health")
        def health():
            return {"healthy": True}

        @app.get("/some-page")
        def page():
            return {"page": True}

        return app

    def test_allows_ingress_requests(self, app_with_auth):
        client = TestClient(app_with_auth)
        resp = client.get("/api/test", headers={"X-Ingress-Path": "/api/hassio_ingress/abc123"})
        assert resp.status_code == 200

    def test_blocks_direct_api_access(self, app_with_auth):
        client = TestClient(app_with_auth)
        resp = client.get("/api/test")
        assert resp.status_code == 403

    def test_allows_health_endpoint(self, app_with_auth):
        client = TestClient(app_with_auth)
        resp = client.get("/health")
        assert resp.status_code == 200

    def test_allows_non_api_paths(self, app_with_auth):
        client = TestClient(app_with_auth)
        resp = client.get("/some-page")
        assert resp.status_code == 200

    def test_allows_all_in_dev_mode(self, app_with_auth, monkeypatch):
        monkeypatch.setenv("DEV_MODE", "1")
        client = TestClient(app_with_auth)
        resp = client.get("/api/test")
        assert resp.status_code == 200
