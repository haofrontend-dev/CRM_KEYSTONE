# CMS Keystone (Payload + Next.js) — production image.
# Build runs `next build`; runtime runs `next start` on :3000.
FROM node:22-bookworm-slim

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# Install ALL deps (incl. dev: next, cross-env, typescript) needed to build.
# NODE_ENV stays unset here so npm doesn't skip devDependencies; the runtime
# container gets NODE_ENV=production from docker-compose.
COPY package.json package-lock.json ./
RUN npm ci

# App source.
COPY . .

# NEXT_PUBLIC_* is inlined into the (public) client bundle, so the real
# domain must be present at build time. Not a secret.
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

# Secrets (PAYLOAD_SECRET, DATABASE_URI) needed for static prerender are
# mounted via BuildKit -> they never persist in image layers or `docker history`.
RUN --mount=type=secret,id=payload_secret \
    --mount=type=secret,id=database_uri_build \
    PAYLOAD_SECRET="$(cat /run/secrets/payload_secret)" \
    DATABASE_URI="$(cat /run/secrets/database_uri_build)" \
    npm run build

EXPOSE 3000
# DATABASE_URI at runtime is injected by docker-compose (points to the
# internal postgres service, not the build-time value).
CMD ["node", "node_modules/next/dist/bin/next", "start", "-p", "3000", "-H", "0.0.0.0"]
