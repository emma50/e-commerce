# syntax=docker/dockerfile:1

FROM node:12-alpine
EXPOSE 3000
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . /app
CMD ["npm", "run", "dev"]
