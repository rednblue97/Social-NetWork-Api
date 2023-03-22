const { response } = require('express');
const { Thoughts, User } = require('../models');

module.exports ={
  // lets the user get ALL the thoughts
    getAllThoughts(req, res) {
        Thoughts.find()
        .then((thoughtData) => res.json(thoughtData))
        .catch((err) => res.status(500).json(err)); 
    },
    getSingleThought(req, res) {
        Thoughts.findOne({ _id: req.params.thoughtId })
        .select('-__V')
        .then((thoughtData) => 
            !thoughtData
                ? res.status(404).json({ message: 'No thought with that ID!'})
                : res.status(thoughtData)
        )
        // response.json(thoughtData)
        .catch((err) => res.status(500).json(err));
    },
    // Allows the user to create thoughts
    createThought(req, res) {
        Thoughts.create(req.body)
          .then((thoughtData) => {
            return User.findOneAndUpdate(
              { _id: req.body.userId },
              { $push: { thoughts: thoughtData._id } },
              { new: true }
            );
          })
          .then((userData) => {
            if (!userData) {
              return res.status(404).json({ message: 'Thought created  without Id' });
            }
            res.json({ message: 'Thought created!' });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
        },
    // createThought(req, res) {
    //     Thoughts.create(req.body)
    //         .then((thoughtData) => res.json(thoughtData))
    //         .catch((err) => {
    //             return res.status(500).json(err)
    //         });
    // },
    updateThought(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new:true }
        )
            .then((thoughtData) => 
            !thoughtData
            ? res.status(404).json({ message: 'No thought with this ID!'})
            : res.join(thoughtData)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Allows the user to delete thoughts with the id
    deleteThought(req, res) {
        Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thoughtData) => 
        !thoughtData
        ? res.status(404).json({ message: 'No thought with this ID!'})
        : res.json(thoughtData)
        )
    },
};