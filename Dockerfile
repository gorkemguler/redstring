# Redstring — kendi sunucunuzda çalıştırmak için / to run it on your own machine.
#
#   docker build -t redstring .
#   docker run -d -p 8080:80 --name redstring redstring
#   http://localhost:8080
#
# Uygulama tamamen statiktir: imaj yalnızca dosyaları servis eder, hiçbir veri
# saklamaz. Kayıtlar kullanıcının tarayıcısında kalır.
# The app is fully static: the image only serves files and stores nothing.
# Records stay in the user's browser.

FROM nginx:1.27-alpine

LABEL org.opencontainers.image.title="Redstring" \
      org.opencontainers.image.description="Case management for private investigators — runs entirely in the browser" \
      org.opencontainers.image.source="https://github.com/gorkemguler/redstring" \
      org.opencontainers.image.licenses="MIT"

COPY index.html /usr/share/nginx/html/
COPY assets/    /usr/share/nginx/html/assets/
COPY docs/      /usr/share/nginx/html/docs/
COPY LICENSE    /usr/share/nginx/html/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -q --spider http://localhost/ || exit 1
