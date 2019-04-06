const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// Get Posts
router.get("/", async (req, res) => {
  const posts = await loadPostsCollection(); // get the post collection to work with
  res.send(await posts.find({}).toArray());
});
// Add Posts
router.post("/", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  }); // insertOne is a mongodb function, inserts one record
  res.status(201).send();
});

// Delete Posts
/* to delete the id passed in the line below, it is req.params.id */
router.delete("/:id", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send();
});

// Function to get the posts from the server
async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://sbcruz1:jansport91@vue-expess-6cpww.mongodb.net/test?retryWrites=true",
    {
      useNewUrlParser: true
    }
  );
  return client.db("vue_express").collection("posts");
}

module.exports = router;
