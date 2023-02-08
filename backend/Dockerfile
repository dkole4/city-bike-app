FROM node:18 as base

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copy source files to the image
COPY . .
RUN npm run build

# Skip building if testing version was chosen
FROM base as app-test
ENV NODE_ENV test

# Build the app if build version was chosen
FROM base as app-build
ENV NODE_ENV production
USER node