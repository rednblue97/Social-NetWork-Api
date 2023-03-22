const { User } = require('../models');

module.exports ={
    // allows the user to get ALL users
    getAllUsers( req, res) {
        User.find()
        .then((userData) => {res.json(userData)})
        .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        // .populate("thoughts")
        .then((userData) =>
            !userData
                ? res.status(404).json({ message: 'No user with that ID!'})
                : res.status(userData)
        )
        .catch((err) => res.status(500).json(err));
    },
    // allows the user to create a new user
    createUser(req, res) {
        User.create(req.body)
        .then((userData) => res.json(userData))
        .catch((err) => {
            return res.status(500).json(err)
        });
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new:true } 
        )
            .then((userData) => 
            !userData
            ? res.status(404).json({ message: 'No user with that ID!'})
            : res.join(userData)
        )
        .catch((err) => res.status(500).json(err)); 
    },
    // allows the user to delete a user with id
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
        .then((userData) => 
        !userData
        ? res.status(404).json({ message: 'No user with that ID!'})
        : res.json(userData)
        )
    },

};