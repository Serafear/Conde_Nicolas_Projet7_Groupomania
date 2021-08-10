const fs = require("fs"); //file system

require("dotenv").config({ path: "./config.env" });

const { sequelize, User, Post, Reactions } = require("../models");

const { Model } = require("sequelize");
const { post } = require("../routes/post");
const { reaction } = require("../routes/reactLikeDislike");

exports.createReaction = async function (req, res) {
  const { userId, postId, likes, dislikes } = req.body;
  const user = await User.findOne({ where: { id: userId } });
  const post = await Post.findOne({ where: { id: postId } });

  if (postId == null) {
    return res.status(400).json({ message: "invalid parameters" });
  } else {
    if (likes) {
      try {
        const reaction = await Reactions.create({
          postId: post.id,
          userId: user.id,
          likes: +1,
        });
        return res.status(201).json([reaction, { message: "vous avez liké ce message !" }]);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    } else if (dislikes) {
      try {
        const reaction = await Reactions.create({
          postId: post.id,
          userId: user.id,
          dislikes: -1,
        });
        return res.status(201).json([reaction, { message: "vous avez disliké ce message !" }]);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    }
  }
};
exports.getAllReactions = async function (req, res) {
  try {
    const reaction = await Reactions.findAll({
      include: [
        {
          model: Post,
          as: "post",
          include: [{ model: User, as: "user" }],
        },
      ],
    }); //declared in model associations
    return res.status(201).json(reaction);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
exports.getOneReaction = async function (req, res) {
  try {
    const reaction = await Reactions.findOne({
      where: { id: req.params.reactId },
      include: [
        {
          model: Post,
          as: "post",
          include: [{ model: User, as: "user" }],
        },
      ], // declared in models association
    });
    return res.status(201).json(reaction);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
exports.updateReaction = async function (req, res) {};
exports.deleteReaction = async function (req, res) {
  try {
    const reaction = await Reactions.findOne({
      where: { id: req.params.reactId },
    });
    reaction.destroy();
    return res.status(200).json({ message: "reactions deleted !" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
