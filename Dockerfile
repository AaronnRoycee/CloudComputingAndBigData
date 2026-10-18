FROM nginx:1.27-alpine

# Render assigns the listening port via $PORT; 8080 is the local default.
ENV PORT=8080
# Restrict envsubst to PORT so nginx variables like $uri survive templating.
ENV NGINX_ENVSUBST_FILTER="PORT"

COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY site/ /usr/share/nginx/html/

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -qO- "http://127.0.0.1:${PORT}/healthz" || exit 1
