const express = require("express");
const app = express();
const config = require("./config.json");
const mongoose = require("mongoose");
const mongo = require('./mongodb/mongo.js');
const ejs = require("ejs");
const state_schema = require("./mongodb/schemas/state_schema.js");

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  await mongo().then(async (mongooose) => {
    try {
      // fetchs data from mongodb
      await state_schema.find({}).then(data => {
        res.send(data[0].toJSON());
      })
    } finally{
      mongooose.connection.close();
    }
  });
});

app.listen(4000, () => {
  console.log("Server started on port 3000");
});
