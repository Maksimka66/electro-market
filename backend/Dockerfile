FROM node:12.13-alpine

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY . .

COPY ./backend ./backend

CMD ["npm", "run", "dev"]