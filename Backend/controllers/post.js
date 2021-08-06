const bcrypt = require("bcrypt");
/* pour avoir accès au système de fichier pour delete les données 
dans la base de donnée */
const fs = require("fs"); //file system

/*  on importe jwt */
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });

const { sequelize, User, Post } = require("../models");

const { Model } = require("sequelize");
const { post } = require("../routes/post");

/*pour tester dans insomnia :
choisir multipart form 
ensuite, dans le premier new name mettre body et dans new value mettre le message
puis dans le deuxième new name mettre image puis changer le new value en file
dans le troisième new name mettre userId et dans new value mettre 1 ou X
x étant le userId auquel associé le message */
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
    const post = await Post.findAll({ include: [{ model: User, as: "user" }] }); //declared in model post associations
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
      include: [{ model: User, as: "user" }], // declared in model post association
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
  const image = `${req.protocol}://${req.get("host")}/images/${
    //on utilise multer
    req.file.filename
  }`;
  if (req.file) {
    try {
      const filename = await post.image.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        post.body = body; //cette forme est la seule qui fonctionne
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
