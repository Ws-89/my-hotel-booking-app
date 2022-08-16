FROM node:14 as builder



RUN mkdir -p /app

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build --prod

# CMD ["npm", "start"]

FROM nginx:alpine

COPY src/nginx/etc/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder app/dist/my-hotel-app usr/share/nginx/html


