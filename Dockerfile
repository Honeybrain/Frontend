FROM node:18.16.0

RUN mkdir -p /app
WORKDIR /app
COPY . /app/

ENV NODE_OPTIONS=--openssl-legacy-provider

RUN npm install -f
RUN npm install -g serve
RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "build"]