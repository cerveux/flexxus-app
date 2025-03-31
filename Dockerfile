# Build stage
FROM node:22.14.0-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build
RUN npm i --omit=dev

# Runtime stage
FROM node:22.14.0-alpine
WORKDIR /usr/src/app
RUN apk add --no-cache tini && \
    addgroup -S app && adduser -S app -G app
USER app
COPY --from=builder --chown=app:app /usr/src/app/node_modules ./node_modules
COPY --from=builder --chown=app:app /usr/src/app/dist ./dist
COPY --from=builder --chown=app:app /usr/src/app/src/docs/ ./dist/docs/
COPY --chown=app:app package*.json ./

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["npm", "start"]
