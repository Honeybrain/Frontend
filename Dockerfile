FROM node:18.16.0

WORKDIR /app

COPY . .
COPY src/environment-prod.ts src/environment.ts

RUN yarn install

RUN npm install -g serve

RUN yarn build

EXPOSE 3000

CMD ["serve", "-s", "dist"]
