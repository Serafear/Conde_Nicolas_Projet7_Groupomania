const fs = require("fs"); //file system

require("dotenv").config({ path: "./config.env" });

const { sequelize, User, Post, Reactions } = require("../models");

const { Model } = require("sequelize");
const { post } = require("../routes/post");
const { reaction } = require("../routes/reactLikeDislike");

exports.createReaction = async function (req, res) {
  const { userId, postId } = req.body;
  const user = await User.findOne({ where: { id: userId } });
  const post = await Post.findOne({ where: { id: postId } });
  const Liked = "like";
  const Disliked = "dislike";

  try {
    const [reaction, created] = await Reactions.findOrCreate({
      where: { userId: user.id },
      defaults: {
        postId: post.id,
      },
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
      //ici il faut recupérer l'ancienne réaction et la mettre à jour
      await Reactions.update({
        isLike : req.body.isLike // il va recupérer l'info demandée : ligne 4 insomnia create reaction
      },
        {
        where : {userId: user.id, postId: post.id},
      })
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
exports.updateReaction = async function (req, res) {
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
