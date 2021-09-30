const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });

const { sequelize, User } = require("../models");

const { Model } = require("sequelize");

exports.signup = async function (req, res) {
  const { nom, prenom, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ nom, prenom, email, password: hash });
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.login = async function (req, res) {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    const passwordCompare = await bcrypt.compare(
      req.body.password,
      user.password
    );
    const accessToken = jwt.sign(
      user.toJSON(),
      process.env.ACCESS_TOKEN_SECRET
    );
    if (passwordCompare != false) {
      res.status(200).json({
        userId: user.id,
        token: accessToken,
      });
    } else if (passwordCompare === false) {
      return res.status(401).json({ error: "Utilisateur inconnu" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};
exports.getOneUser = async function (req, res) {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(404).json(error);
  }
};
exports.updateUser = async function (req, res) {
  const { nom, prenom, email, password } = req.body;
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    const hash = await bcrypt.hash(password, 10);
    user.nom = nom;
    user.prenom = prenom;
    user.email = email;
    user.password = hash;

    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
exports.deleteUser = async function (req, res) {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    await user.destroy();
    return res.status(200).json({ message: "User deleted !" });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};
exports.getMe = async function (req, res) {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  try {
    const user = await User.findOne({ where: { id: decodedToken.id } });
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};
