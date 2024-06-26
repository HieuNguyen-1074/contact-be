const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'please, name '],
    },
    email: {
      type: String,
      required: [true, 'please, email '],
    },

    phone: {
      type: String,
      required: [true, 'please, phone '],
    },

    avatar: { type: String, required: [true, 'please, file '] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Contact', contactSchema);
