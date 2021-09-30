const fs = require("fs");

require("dotenv").config({ path: "./config.env" });

const { sequelize, User, Post, Reactions } = require("../models");

const { Model } = require("sequelize");

exports.createReaction = async function (req, res) {
  const { userId, postId } = req.body;
  const user = await User.findOne({ where: { id: userId } });
  const post = await Post.findOne({ where: { id: postId } });
  const Liked = "like";
  const Disliked = "dislike";

  try {
    const [reaction, created] = await Reactions.findOrCreate({
      where: { userId: user.id, postId: post.id },
    });
    if (created && Liked) {
      reaction.isLike = Liked;

      await reaction.save();
      return res
        .status(201)
        .json([reaction, { message: "vous avez liké ce message !" }]);
    } else if (created && Disliked) {
      reaction.isLike = Disliked;
      await reaction.save();
      return res
        .status(201)
        .json([reaction, { message: "vous avez disliké ce message !" }]);
    } else {
      await reaction.update(
        {
          isLike: req.body.isLike,
        },
        {
          where: { userId: user.id, postId: post.id },
        }
      );
      return res
        .status(201)
        .json([reaction, { message: "vous avez mis à jour votre réaction !" }]);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
exports.getAllReactions = async function (req, res) {
  try {
    const reaction = await Reactions.findAll({
      include: [
        { model: User, as: "user" },
        { model: Post, as: "post" },
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
      ],
    });
    return res.status(201).json(reaction);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

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
