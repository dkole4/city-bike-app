FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copy source files to the image
COPY . .

# Build the app
RUN npm run build

# Set environment to production
ENV NODE_ENV production

CMD [ "node", "dist/index.js" ]
USER node