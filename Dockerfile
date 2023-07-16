FROM node:18.16 as dev
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./
RUN npm install --silent

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]