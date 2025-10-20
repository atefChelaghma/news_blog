
FROM node:18-alpine as builder

# Define build arguments for API keys
ARG VITE_NEWS_API_KEY
ARG VITE_GUARDIAN_API_KEY
ARG VITE_NYT_API_KEY

# Set them as environment variables for the build
ENV VITE_NEWS_API_KEY=$VITE_NEWS_API_KEY
ENV VITE_GUARDIAN_API_KEY=$VITE_GUARDIAN_API_KEY
ENV VITE_NYT_API_KEY=$VITE_NYT_API_KEY

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
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1/ || exit 1


CMD ["nginx", "-g", "daemon off;"]