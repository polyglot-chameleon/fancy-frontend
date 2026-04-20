FROM node:24.15.0-alpine3.23 AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /usr/src/app
COPY package*.json ./
COPY pnpm-lock.yaml ./
COPY . .
RUN npx update-browserslist-db@latest

FROM base AS root
RUN pnpm install
CMD ["pnpm", "start"]

FROM base as api
WORKDIR /usr/src/app/api
COPY api/* ./
RUN pnpm install
RUN node db.js
CMD ["pnpm", "dev"]
