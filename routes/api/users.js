const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Admin = require("../../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


router.post(
  "/",
  [
    check("name", "Name is Required").not().isEmpty(),
    check("id", "Include a valid id").isNumeric(),
    check(
      "password",
      "Please enter a password of minimum 3 Chracters"
    ).isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id, name, password } = req.body;
    try {
      let user = await Admin.findOne({ id });
      if (user) {
        
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new Admin({
        name,
        id,
        password,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      // res.send('admin Registered');

      //JsonWebToken

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(payload, "JWTSECRET", { expiresIn: 360000000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
