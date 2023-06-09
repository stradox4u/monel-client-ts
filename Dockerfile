FROM node:18 as dev
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./
RUN npm install --silent

COPY . ./