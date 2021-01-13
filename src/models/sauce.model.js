const mongoose = require('mongoose');
const { checkWebURL } = require('node-uri');
const { toJSON } = require('./plugins');

const sauceSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    manufacturer: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    mainPepper: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator(value) {
          return checkWebURL(value);
        },
        message: (props) => `${props.value} is not a valid URL`,
      },
    },
    heat: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
    usersLiked: {
      type: [String],
      default: [],
    },
    usersDisliked: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
sauceSchema.plugin(toJSON);

sauceSchema.methods.like = function ({ like, userId }) {
  // should like
  if (like === 1) {
    this.likeByUserId(userId);
  }

  // should dislike
  if (like === -1) {
    this.dislikeByUserId(userId);
  }

  // should unlike or undislike
  if (like === 0) {
    this.resetLikeByUserId(userId);
  }
};

sauceSchema.methods.isLikedByUserId = function (userId) {
  return this.usersLiked.includes(userId);
};

sauceSchema.methods.isDislikedByUserId = function (userId) {
  return this.usersDisliked.includes(userId);
};

sauceSchema.methods.likeByUserId = function (userId) {
  if (!this.isLikedByUserId(userId)) {
    this.likes += 1;
    this.usersLiked.push(userId);
  }
};

sauceSchema.methods.dislikeByUserId = function (userId) {
  if (!this.isDislikedByUserId(userId)) {
    this.dislikes += 1;
    this.usersDisliked.push(userId);
  }
};

sauceSchema.methods.resetLikeByUserId = function (userId) {
  if (this.isLikedByUserId(userId)) {
    this.likes += -1;
    this.usersLiked = this.usersLiked.filter((id) => id !== userId);
  }

  if (this.isDislikedByUserId(userId)) {
    this.dislikes += -1;
    this.usersDisliked = this.usersDisliked.filter((id) => id !== userId);
  }
};

/**
 * @typedef Sauce
 */
const Sauce = mongoose.model('Sauce', sauceSchema);

module.exports = Sauce;
