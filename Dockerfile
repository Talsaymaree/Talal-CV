FROM node:18-alpine as builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.25.2
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/out .
ENTRYPOINT ["nginx", "-g", "daemon off;"]