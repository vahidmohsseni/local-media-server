FROM node:lts-buster

WORKDIR /server

RUN mkdir /h1
RUN mkdir /h2

COPY logs/. /server/logs/.
COPY scripts/. /server/scripts/.
COPY src/. /server/src/.
COPY .prettierignore /server/.
COPY .prettierrc /server/.
COPY .eslintrc.json /server/.
COPY config.js /server/.
COPY nodemon.json /server/.
COPY package-lock.json /server/.
COPY package.json /server/.
COPY testfile /server/.
COPY server.js /server/.

RUN npm install


ENV LOCATION=/h1

EXPOSE 3000
EXPOSE 3001

CMD ["node", "server.js"]