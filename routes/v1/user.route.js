const express = require("express");
const catchAsync = require("../../utils/catchAsync");
const httpStatus = require("http-status");
const ApiError = require("../../utils/ApiError");

const router = express.Router();

let users = [];

router.route("/login").post(
  catchAsync(async (req, res) => {
    try {
      console.log(users);
      const index = users?.findIndex((user) => req.body.username == user);
      if (index != -1) {
      } else {
        users.push(req.body.username);
      }
      return res.send({
        code: 200,
        msg: "Successfully Logged In",
        data: users,
      });
    } catch (err) {
      throw err;
    }
  })
);

router.route("/getUsers").get(
  catchAsync(async (req, res) => {
    try {
      return res.send({
        code: 200,
        msg: "Successfully Got usesrs",
        data: users,
      });
    } catch (err) {
      throw err;
    }
  })
);

module.exports = router;
