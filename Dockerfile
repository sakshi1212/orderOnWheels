# define which image of node
FROM node:10
# create application directory
WORKDIR /usr/src/app
# install app dependencies
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

COPY start.sh /usr/src/app
RUN ["chmod", "+x", "/usr/src/app/start.sh"]
# drop db is already exists 
# RUN NODE_ENV=production ./node_modules/sequelize-cli/lib/sequelize db:drop
# create Db via sequelize
# RUN NODE_ENV=production ./node_modules/sequelize-cli/lib/sequelize db:create
# create all tables via sequelize migrations
# RUN NODE_ENV=production ./node_modules/sequelize-cli/lib/sequelize db:migrate:undo

EXPOSE 8080

# ENTRYPOINT ["./start.sh"]

# use node server.js to start the app
# CMD [ "node", "server.js" ]

