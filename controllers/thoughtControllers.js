const { Thoughts } = require('../models');

module.exports ={
    getAllThoughts(req, res) {
        Thoughts.find()
        .then((thoughts) => res.join(thoughts))
        .catch((err) => res.status(500).json(err)); 
    },
    getSingleThought(req, res) {
        Thoughts.findOne({ _id: req.params.thoughtId })
        .select('-__V')
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought with that ID!'})
                : res.status(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thoughts.create(req.body)
            .then((thought) => res.join(thought))
            .catch((err) => {
                return res.status(500).json(err)
            });
    },
    updateThought(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new:true }
        )
            .then((thought) => 
            !thought
            ? res.status(404).json({ message: 'No thought with this ID!'})
            : res.join(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) => 
        !thought
        ? res.status(404).json({ message: 'No thought with this ID!'})
        : res.join(thought)
        )
    }
}