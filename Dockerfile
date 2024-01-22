FROM node:alpine
WORKDIR /
COPY package.json package-lock.json ./
RUN npm i --production
COPY . .
EXPOSE 8000
CMD ["node","server.js"]