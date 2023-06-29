const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: function(timestamp) {
      return formatDate(timestamp);
    }
  }
});

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleString(); // Adjust the formatting as per your requirements
  return formattedDate;
}

module.exports = reactionSchema;
