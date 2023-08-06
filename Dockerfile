FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN yarn build --no-lint

EXPOSE 3000

CMD ["npm", "start"]
