FROM node:18.16 as dev
WORKDIR /app
ENV PATH ./node_modules/.bin/:$PATH

COPY package*.json ./
COPY . .
RUN npm ci

EXPOSE 5173

CMD ["npm", "run", "dev"]