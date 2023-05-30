FROM node

WORKDIR /app

COPY . .

RUN yarn install
RUN npm install -g serve

RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "dist"]