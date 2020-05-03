FROM node:latest

COPY package.json /work/package.json
WORKDIR /work
RUN npm install
COPY . /work

RUN npm run compile
CMD ["npm", "run", "start"]