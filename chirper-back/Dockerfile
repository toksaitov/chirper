FROM node:18.1.0-bullseye

EXPOSE 8080
WORKDIR /chirper

COPY package.json /chirper
RUN npm install

COPY . /chirper

CMD ["npm", "start"]
