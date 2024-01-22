FROM node:alpine
WORKDIR /
COPY package.json package-lock.json ./
RUN npm i
COPY . .
EXPOSE 8000
CMD ["node","server.js"]