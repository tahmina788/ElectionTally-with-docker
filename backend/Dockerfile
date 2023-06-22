FROM node:16-alpine
WORKDIR /backend
COPY package.json .
COPY package-lock.json . 
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
