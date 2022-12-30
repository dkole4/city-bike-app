FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

ENV NODE_ENV production

CMD [ "node", "dist/index.js" ]
USER node