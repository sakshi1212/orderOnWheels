const express = require("express");
const bodyParser = require("body-parser");
const faker = require("faker");
const times = require("lodash.times");
const random = require("lodash.random");
const db = require("./models");
const apiOrder = require("./api/orders");
// const apiAuthor = require("./api/author");

const app = express();
app.use(bodyParser.json());
// app.use(express.static("/public"));

apiOrder(app, db);
// apiAuapiOrderthor(app, db);

db.sequelize.sync().then(() => {
  // populate author table with dummy data
//   db.author.bulkCreate(
//     times(10, () => ({
//       firstName: faker.name.firstName(),
//       lastName: faker.name.lastName()
//     }))
//   );
//   // populate post table with dummy data
//   db.post.bulkCreate(
//     times(10, () => ({
//       title: faker.lorem.sentence(),
//       content: faker.lorem.paragraph(),
//       authorId: random(1, 10)
//     }))
//   );
  app.listen(8080, () => console.log("App listening on port 8080!"));
});

