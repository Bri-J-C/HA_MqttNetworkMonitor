ARG BUILD_FROM
FROM ${BUILD_FROM}

RUN apk add --no-cache python3 py3-pip

WORKDIR /app

COPY requirements.txt .
RUN pip3 install --no-cache-dir --break-system-packages -r requirements.txt

COPY server/ server/
COPY frontend/dist/ frontend/dist/
COPY run.sh /

RUN chmod a+x /run.sh

# Security: non-root user would break bashio (requires HA supervisor root access),
# so we keep root but add a health check instead.
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
    CMD wget -q --spider http://localhost:8100/api/devices || exit 1

CMD ["/run.sh"]
