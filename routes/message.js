import express from "express";
import mongoose from "mongoose";
const router = express.Router();
import Message from "../models/message.js";

//create a message
router.post("/", (req, res) => {
  const message = new Message(req.body);

  message
    .save()
    .then(() => {
      const id = message._id;
      res.send(`${id} registered successfully`);
      console.log(`${id} is registered to the system`);
      //console.log(new Date(message.createdAt).toLocaleString())
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
});

//
router.get("/:user", (req, res) => {
  let query = { receiver: req.params.user };
  if (req.query.single !== "true") {
    if (req.query.opened === "false") query.opened = "false";
    console.log(query);
    Message.find(query)
      .then((docs) => {
        res.send(docs.length);
      })
      .catch((err) => {
        res.status(400).send(err.message);
      });
  } else {
    query.opened = "false";
    Message.findOne(query)
      .then((docs) => {
        res.send(docs);
      })
      .catch((err) => {
        res.status(400).send(err.message);
      });
  }
});

//
router.delete("/:id", (req, res) => {
  let id = req.params.id ;
    Message.findOneAndDelete({ _id: id })
      .then((docs) => {
        res.send(docs);
      })
      .catch((err) => {
        res.status(400).send(err.message);
      });
});

export default router;
