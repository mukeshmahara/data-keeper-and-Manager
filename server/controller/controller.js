const Userdb = require("../model/model");
var userdb = require("../model/model");

// create and save new user

exports.create = (req, res) => {
  //Validate Request
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty" });
    return;
  }
  //new user

  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });
  //save user in the database
  user
    .save(user)
    .then((data) => {
      res.redirect('/adduser')
      // res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some Error occured while creating a create Operation",
      });
    });
};

// retrive and return all users

exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: `Cannot find user with id ${id}` });
        } else {
          console.log(data);
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: `Error retriving data with id ${id}` });
      });
  } else {
    Userdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error Occured while retriving the user information",
        });
      });
  }
};

//update a new identified user by user id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "data to update cannot be empty" });
  }
  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(400).send({
          message: `cannot update with id ${id}. May be user not found`,
        });
      } else {
        console.log("user information successfully updated");
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error update user information" });
    });
};

//delete a user by a specified by
exports.delete = (req, res) => {
  const id = req.params.id;
  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Connot delete id ${id}. May be id is wrong` });
      } else {
        console.log("user with id " + id + " was deleted successfully");
        res.send({ message: " User was deleted successfully" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id =" + id,
      });
    });
};
