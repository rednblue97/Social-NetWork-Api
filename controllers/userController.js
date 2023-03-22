const { User } = require('../models');

module.exports ={
    getAllUsers( req, res) {
        User.find()
        .then((userData) => {res.json(userData)})
        .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__V')
        .populate("thoughts")
        .then((userData) =>
            !userData
                ? res.status(404).json({ message: 'No user with that ID!'})
                : res.status(userData)
        )
        .catch((err) => res.status(500).json(err));
    },
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
            .then((user) => 
            !user
            ? res.status(404).json({ message: 'No user with that ID!'})
            : res.join(user)
        )
        .catch((err) => res.status(500).json(err)); 
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) => 
        !user
        ? res.status(404).json({ message: 'No user with that ID!'})
        : res.join(user)
        )
    },

};