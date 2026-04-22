FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --network-timeout=1000000
COPY . .
RUN npm install @rollup/rollup-linux-x64-musl --save-optional
ARG VITE_API_URL
ARG VITE_CDN_URL
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_CDN_URL=$VITE_CDN_URL
RUN npm run build
RUN npm run build

FROM alpine:latest AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
CMD ["tail", "-f", "/dev/null"]