const bcrypt = require("bcrypt");

const fs = require("fs");

const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });

const { sequelize, Comment, User, Post, Reactions } = require("../models");

const { Model } = require("sequelize");
const { up } = require("../migrations/20210802105548-create-post");

exports.createPost = async function (req, res) {
  const { userId, body } = req.body;
  const postObject = req.file;
  if (body == null && postObject != null) {
    try {
      const user = await User.findOne({ where: { id: userId } });
      const post = await Post.create({
        image: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
        userId: user.id,
      });
      return res.status(201).json(post);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } else if (body != null && postObject == null) {
    try {
      const user = await User.findOne({ where: { id: userId } });
      const post = await Post.create({
        body,

        userId: user.id,
      });
      return res.status(201).json(post);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } else if (body != null && postObject != null) {
    try {
      const user = await User.findOne({ where: { id: userId } });
      const post = await Post.create({
        body,
        image: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
        userId: user.id,
      });
      return res.status(201).json(post);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } else {
    return res
      .status(500)
      .json({ message: "message et/ou image nécessaire(s)" });
  }
};

exports.getAllPosts = async function (req, res) {
  try {
    const post = await Post.findAll({
      include: [
        { model: User, as: "user" },
        { model: Comment },
        { model: Reactions },
      ],
    }); //declared in model post associations
    return res.status(201).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.getOnePost = async function (req, res) {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
      include: [
        { model: User, as: "user" },
        { model: Comment },
        { model: Reactions },
      ], // declared in model post association
    });
    return res.status(201).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.updatePost = async function (req, res) {
  const post = await Post.findOne({
    where: { id: req.params.postId },
  });
  const { body } = req.body;
  const upObject = req.file;
  console.log(req.params.image);

  if (!post.image && upObject) {
    try {
      const image = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
      const filename = await image.split("/images/")[1];
      post.body = body;
      post.image = image;
      post.save();
      return res.status(201).json([post, { message: "post & image maj !" }]);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } else if (upObject && !body) {
    try {
      const image = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
      const filename = await post.image.split("/images/")[1];
      await fs.unlink(`images/${filename}`, () => {
        post.image = image;
        post.save();
        return res.status(201).json([post, { message: "image updated !" }]);
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } else if (upObject && post.image) {
    try {
      const image = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
      const filename = await post.image.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        post.body = body;
        post.image = image;
        post.save();
        return res
          .status(201)
          .json([post, { message: "post & image updated !" }]);
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } else {
    try {
      post.body = body;
      await post.save();
      return res.status(201).json([post, { message: "post updated !" }]);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
};

exports.deletePost = async function (req, res) {
  const post = await Post.findOne({
    where: { id: req.params.postId },
  });
  if (post.image) {
    try {
      const filename = await post.image.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        post.destroy();
        return res
          .status(200)
          .json({ message: "post deleted & image deleted !" });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } else {
    try {
      post.destroy();
      return res.status(200).json({ message: "post deleted !" });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
};
