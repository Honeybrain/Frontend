FROM node

WORKDIR /app

COPY package.json ./

RUN yarn install
RUN npm install -g serve

COPY . .

ENV API_URL=http://host.docker.internal:8000

RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "dist"]