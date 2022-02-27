/*
 * Class to store Seeds
 */

var database;
const { ErrorHandler } = require('../helpers/error')
class Seed {
  constructor() {
    this.mongo = require('mongodb').MongoClient
    this.bcrypt = require('bcrypt')
    this.userData = require('./user.json');
    // this.logger = require("../helpers/Logger")
  }

  /*
* Connect to database and add seeds
*/

  connect() {
    this.mongo.connect(process.env.MONGO_CNNSTR, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
      .then(async (client) => {
        console.log("----client connected--in----");
        database = client.db(process.env.DB_NAME);

        console.log("SEED STARTED");
          this.userData.forEach((element) => {
            if (element.password) {
              element.password = this.bcrypt.hashSync(
                element.password,
                this.bcrypt.genSaltSync(10)
              );
            }
            element.createdAt = new Date();
          });



        await this.createCollectionIfItDoesNotExist("users");
        await database.collection("users").insertMany(this.userData);

        console.log("SEED FINISHED");
      })
      .catch((err) => {
        ErrorHandler(err,"Seeding Error")
        console.log("SEED ERROR", err);
      });
  }

  // Clear the data added by seeding
  clearSeed(){
    this.mongo.connect(process.env.MONGO_CNNSTR, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
      .then(async (client) => {
        database = client.db(process.env.DB_NAME);
        await database.collection("users").deleteMany({})
        console.log('CLEAR SEED FINISHED');
      })
      .catch((err) => {
        ErrorHandler(err,"Clear Seeding Error")
        console.log("CLEAR SEED ERROR", err);
      })
  }

  /*
* check collection is already exist or not. If not then create collection
*/
  async createCollectionIfItDoesNotExist(collName) {
    const collection = await database
      .listCollections({}, { name: true })
      .toArray();
    var tableExist = false;
    collection.forEach((element) => {
      if (element.name == collName) {
        tableExist = true;
      }
    });
    if (!tableExist) {
      let didCreateCollection = await database.createCollection(collName);
      return didCreateCollection.ok === 1;
    } else {
      return false;
    }
  }
}

module.exports = new Seed();