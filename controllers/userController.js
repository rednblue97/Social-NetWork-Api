const { Users } = require('../models');

module.exports ={
    getAllUsers( req, res) {
        Users.find()
        .then((users) => res.join(users))
        .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        Users.findOne({ _id: req.params.userId })
        .select('-__V')
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with that ID!'})
                : res.status(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        Users.create(req.body)
        .then((user) => res.join(user))
        .catch((err) => {
            return res.status(500).json(err)
        });
    },
    updateUser(req, res) {
        Users.findOneAndUpdate(
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
        Users.findOneAndDelete({ _id: req.params.userId })
        .then((user) => 
        !user
        ? res.status(404).json({ message: 'No user with that ID!'})
        : res.join(user)
        )
    }

}