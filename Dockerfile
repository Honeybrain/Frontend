FROM node:18.16.0

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist"]
