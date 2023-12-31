const mongoose = require('mongoose');
const reactionSchema = require('../schemas/reactionSchema');

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: function(timestamp) {
      return formatDate(timestamp);
    }
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
});

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleString(); // Adjust the formatting as per your requirements
  return formattedDate;
}

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
