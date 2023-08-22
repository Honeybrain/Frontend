FROM node:18.16.0 AS builder

ARG GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS="--max-old-space-size=4096"

WORKDIR /app

COPY package.json ./
COPY . .

RUN yarn install

RUN yarn build

FROM nginx:alpine
RUN apk add --no-cache bash

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
