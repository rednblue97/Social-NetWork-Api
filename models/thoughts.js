const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        max_length: 280,
    },
    createdAt: {
        type:Date,
        default: Date.now,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [
        reactionSchema
    ],
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
}
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

const Thoughts = model('Thoughts', thoughtSchema);

module.exports = Thoughts