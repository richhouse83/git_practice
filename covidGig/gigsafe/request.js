const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://richhouse83:beehive1@cluster0.vfvmg.mongodb.net/covid_gig?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const database = client.db('covid_gig');
    const collection = database.collection('venues');

    const query = { name: 'Night and Day Cafe' };
    const venue = await collection.findOne(query);
    let response;

    if (!venue){
        response = 'Venue not found';
    } else response = venue; 

    console.log(response);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);