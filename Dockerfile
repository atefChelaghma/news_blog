
FROM node:18-alpine as builder


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


RUN npm run build


FROM nginx:alpine as production


COPY --from=builder /app/dist /usr/share/nginx/html


COPY nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 80


HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1


CMD ["nginx", "-g", "daemon off;"]