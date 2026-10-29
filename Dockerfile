FROM node:26-slim

WORKDIR /work

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run compile
RUN npm prune --omit=dev
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx
CMD ["node", "-r", "dotenv/config", "./dist/index.js"]
