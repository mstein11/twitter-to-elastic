FROM mhart/alpine-node:11
RUN npm install
COPY . /
ENTRYPOINT ["node", "index.js"]
