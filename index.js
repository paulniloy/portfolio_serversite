const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express')
const app = express()
const port = 3000;
var cors = require('cors');
require('dotenv').config()
app.use(cors());
app.use(express.json());

// niloy-portfolio
// HjjdNK0C3meM6SVA
console.log(process.env.password);
console.log(process.env.user_name);


const uri = `mongodb+srv://${process.env.user_name}:${process.env.password}@paulniloy.38wqfao.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const database = client.db('portfoliio');
    const work = database.collection('work');
    const blog = database.collection('blogs');
    const clientinfo = database.collection('client');

    app.post("/addwork", async(req,res)=>{
        const workitem = req.body;
        const result = await work.insertOne(workitem);
        res.send(result); 
    })
    app.get("/works", async(req,res)=>{
        const result = await work.find().toArray();
        res.send(result);
    })

    app.delete("/deletework/:id", async(req,res)=>{
        const id = req.params.id;
        const query = {_id : new ObjectId(id)};
        const result = await work.deleteOne(query);
        res.send(result);
    })
    app.post("/addblog", async(req,res)=>{
        const workitem = req.body;
        const result = await blog.insertOne(workitem);
        res.send(result); 
    })
    app.get("/blogs", async(req,res)=>{
        const result = await blog.find().toArray();
        res.send(result);
    })
    app.delete("/deleteblog/:id", async(req,res)=>{
        const id = req.params.id;
        const query = {_id : new ObjectId(id)};
        const result = await blog.deleteOne(query);
        res.send(result);
    })

    // separate blog data

    app.get('/separateblog/:id', async(req,res)=>{
        const id = req.params.id;
        const query = {_id : new ObjectId(id)};
        const result = await blog.findOne(query);
        res.send(result)
    })
    app.get('/separatework/:id', async(req,res)=>{
        const id = req.params.id;
        const query = {_id : new ObjectId(id)};
        const result = await work.findOne(query);
        res.send(result)
    })
    // workers post 
    app.post("/client", async(req,res)=>{
        const info = req.body;
        const result = await clientinfo.insertOne(info);
        res.send(result); 
    })
    app.get('/clientinfo', async(req,res)=>{
        const result = await clientinfo.find().toArray();
        res.send(result)
    })
    app.delete("/deleteclient/:id", async(req,res)=>{
        const id = req.params.id;
        const query = {_id : new ObjectId(id)};
        const result = await clientinfo.deleteOne(query);
        res.send(result);
    })





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello there')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})