FROM node:18.16.0 AS builder

ARG GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS="--max-old-space-size=4096"

WORKDIR /app

COPY package.json ./
COPY . .

RUN yarn install

RUN npm install -g serve

RUN yarn build

EXPOSE 3000

CMD ["serve", "-s", "dist"]
