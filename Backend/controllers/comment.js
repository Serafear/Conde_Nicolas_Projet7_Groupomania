const fs = require("fs"); //file system

require("dotenv").config({ path: "./config.env" });

const { sequelize, User, Post, Comment } = require("../models");

const { Model } = require("sequelize");

exports.createComment = async function (req, res) {
  const { userId, postId, body } = req.body;
  const user = await User.findOne({ where: { id: userId } });
  const post = await Post.findOne({ where: { id: postId } });
  const commentObject = req.file;

  if (body == null && commentObject != null) {
    try {
      const comment = await Comment.create({
        image: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
        postId: post.id,
        userId: user.id,
      });
      return res.status(201).json([comment, { message: "comment crée !" }]);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } else if (body != null && commentObject == null) {
    try {
      const comment = await Comment.create({
        body,

        postId: post.id,
        userId: user.id,
      });
      return res.status(201).json([comment, { message: "comment crée !" }]);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } else if (body != null && commentObject != null) {
    try {
      const comment = await Comment.create({
        body,
        image: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
        postId: post.id,
        userId: user.id,
      });
      return res.status(201).json([comment, { message: "comment crée !" }]);
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

exports.getAllComments = async function (req, res) {
  try {
    const comment = await Comment.findAll({
      include: [{ model: User, as: "user" }, {model: Post, as:"post", include:[{model: Comment}]}],
    }); //declared in model post associations
    return res.status(201).json(comment);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.getOneComment = async function (req, res) {
  try {
    const comment = await Comment.findOne({
      where: { id: req.params.commentId },
      include: [{ model: User, as: "user" }, {model: Post, as:"post", include:[{model: Comment}]}], // declared in models association
    });
    return res.status(201).json(comment);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.updateComment = async function (req, res) {
  const comment = await Comment.findOne({
    where: { id: req.params.commentId },
  });
  const { body } = req.body; //indispensable
  //image doit être déclaré à l'extérieur pour être utilisable avec un post.image
  if (req.file && !comment.image) {
    try {
      const image = `${req.protocol}://${req.get("host")}/images/${
        //on utilise multer
        req.file.filename
      }`;
      const filename = await image.split("/images/")[1]; //pas comment.image mais simplement image

      comment.body = body; //cette forme est la seule qui fonctionne
      comment.image = image;
      comment.save();
      return res
        .status(201)
        .json([comment, { message: "comment & image maj !" }]);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } else if (req.file && !body) {
    try {
      const image = `${req.protocol}://${req.get("host")}/images/${
        //on utilise multer
        req.file.filename
      }`;
      const filename = await comment.image.split("/images/")[1];
      await fs.unlink(`images/${filename}`, () => {
        comment.image = image;
        comment.save();
        return res.status(201).json([comment, { message: "image updated !" }]);
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } else if (req.file && comment.image) {
    try {
      const image = `${req.protocol}://${req.get("host")}/images/${
        //on utilise multer
        req.file.filename
      }`;
      const filename = await comment.image.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        comment.body = body; //cette forme est la seule qui fonctionne
        comment.image = image;
        comment.save();
        return res
          .status(201)
          .json([comment, { message: "post & image updated !" }]);
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } else {
    try {
      comment.body = body;
      await comment.save();
      return res.status(201).json([comment, { message: "comment updated !" }]);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
};

exports.deleteComment = async function (req, res) {
  const comment = await Comment.findOne({
    where: { id: req.params.commentId },
  });
  if (comment.image) {
    try {
      const filename = await comment.image.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        comment.destroy();
        return res
          .status(200)
          .json({ message: "comment deleted & image deleted !" });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } else {
    try {
      comment.destroy();
      return res.status(200).json({ message: "comment deleted !" });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
};
