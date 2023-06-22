
FROM node:16-alpine
WORKDIR /frontend
COPY package.json .
COPY package-lock.json .
RUN npm install --silent
RUN npm install react-scripts -g --silent
COPY . .
ENV PORT=3000
EXPOSE 3000
CMD ["npm", "run", "start"]



