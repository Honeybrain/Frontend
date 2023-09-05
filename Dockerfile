FROM node:18.16.0

WORKDIR /app

COPY . .

RUN yarn install

RUN npm install -g serve

RUN yarn build

EXPOSE 3000

CMD ["serve", "-s", "dist"]
