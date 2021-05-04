import express from "express";
const router = express.Router();
import Message from "../models/message.js";

router.get("/", (req, res) => {
  res.send('Welcome to the Messaging-System-api!!')
})

//create a message
router.post("/write", (req, res) => {
  const message = new Message(req.body);

  message
    .save()
    .then(() => {
      const id = message._id;
      res.send(`${id} created successfully`);
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
});

//read a message: find and modify
router.get("/read/:user", (req, res) => {
  let query = { receiver: req.params.user };
  query.opened = "false";
  Message.findOne(query)
    .then(async (doc) => {
      if(doc !== null){
        await Message.findOneAndUpdate({_id: doc._id},{opened: 'true'}).then(()=>{
          res.status(200).send(doc);
        })
        .catch((err)=>{
          console.log(err)
          res.status(400).send({message: "Error while trying to update the message...", err});
        })
      }
      else res.status(400).send({message: "There are no messages left"});
    })
    .catch((err) => {
      res.status(400).send({err});
    });
});

//get message per user with option(unread param)
router.get("/:user", (req, res) => {
  let query = { receiver: req.params.user };
  if (req.query.unread === "true") query.opened = "false";
  Message.find(query)
    .then((docs) => {
      res.send(docs);
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
});

//delete message by id
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
