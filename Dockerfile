FROM node:latest as builder
COPY package.json package-lock.json ./
RUN npm install && mkdir /app && mv ./node_modules ./app
WORKDIR /app
COPY . .
RUN npm run build --prod

FROM nginx:alpine
COPY --from=builder /app/dist/sort-algo-visualizer /usr/share/nginx/html
