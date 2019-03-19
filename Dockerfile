FROM node:6
RUN npm install
COPY . /
#ENTRYPOINT ["node", "index.js"]
ENTRYPOINT ["ls"]
