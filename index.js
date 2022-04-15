const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
require('dotenv').config()

const app = express();
const port = 5000;
//middleware
app.use(cors())
app.use(express.json())
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pn2kl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
//console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        //console.log('connect to database');

        const database = client.db("carMechanic");
        const servicesCollection = database.collection("services");

        // get api show output all services
        app.get('/services', async (req, res) => {
            const curser = servicesCollection.find({});
            const services = await curser.toArray();
            res.send(services);
        });
        // get api show output single services
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await servicesCollection.findOne(query);
            res.json(service);
        })
        // post method and client to server site connection
        app.post('/services', async (req, res) => {
            //const service = req.body;
            console.log('hit the post api');
            //const result = await servicesCollection.insertOne(service);
            //console.log(result);
            res.send('hit the');
            /*  const service = {
                 "name": "samsul huda",
                 "price": "3423",
                 "description": "bangladesh is quraenr desh .bangladesh is large population",
                 "img": "https://i.ibb.co/dGDkr4v/1.jpg"
             } */

        });
        // delete api
        app.delete('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await servicesCollection.deleteOne(query);
            res.json(result);

            //console.log(result);
        })

    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir)
// get method
app.get('/', (req, res) => {
    res.send('backend server');
});
app.listen(port, () => {
    console.log('running server port', port);

})