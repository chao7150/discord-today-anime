FROM node:20

WORKDIR /work

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run compile
CMD ["npm", "run", "start"]