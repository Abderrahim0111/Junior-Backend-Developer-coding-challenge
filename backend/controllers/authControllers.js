const User = require("../models/userSchema");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const Profile = require("../models/profileSchema");
const {faker} = require('@faker-js/faker');
const Thread = require("../models/threadSchema");


async function createThreadsForUser(user, profileId) {
  const numThreads = 3;
  const threads = [];

  for (let i = 0; i < numThreads; i++) {
      const title = faker.lorem.words(); 
      const content = faker.lorem.paragraphs();
      const thread = await Thread.create({
          user_id: user._id,
          title,
          content,
          profile_id: profileId
      });
      threads.push(thread);
  }

  return threads;
}

const register = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        if (!email || !name || !password) {
          return res.json({ error: "All fields are required!" });
        }
        const isEmail = await User.findOne({ email: email });
        if (isEmail) {
          return res.json({ error: "Email taken!" });
        }
        const isName = await User.findOne({ name: name });
        if (isName) {
          return res.json({ error: "Name taken!" });
        }
        const user = await User.create(req.body);
        if (!user) {
          return res.json({ error: "Registration error, try again!" });
        }

        const profile = await Profile.create({ user_id: user._id });
        await createThreadsForUser(user, profile._id);

        const token = jwt.sign({ id: user._id }, "jwtsecret");
        const { password: pass, ...rest } = user._doc;
        res.cookie("jwt", token, { 
          httpOnly: true, 
          maxAge: 365 * 24 * 60 * 60 * 1000,
          secure: true,
          sameSite: 'none'
        });
        res.json(rest);
      } catch (error) {
        return res.json({ error: error.message });
      }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
          return res.json({ error: "All fields are required!" });
        }
        const isUser = await User.findOne({ email: email });
        if (!isUser) {
          return res.json({ error: "User don't exist, try to sign up first!" });
        }
        const match = await bcrypt.compare(password, isUser.password);
        if (!match) {
          return res.json({ error: "Incorrect password!" });
        }
        const token = jwt.sign({ id: isUser._id }, "jwtsecret");
        const { password: pass, ...rest } = isUser._doc;
        res.cookie("jwt", token, { 
          httpOnly: true, 
          maxAge: 365 * 24 * 60 * 60 * 1000,
          secure: true,
          sameSite: 'none'
        });
        
        res.json(rest);
      } catch (error) {
        return res.json({ error: error.message });
      }
}

const logout = async (req, res) => {
    try {
        if (!req.cookies.jwt) {
          return res.json({ error: "Not allowed!" });
        }
        res.clearCookie("jwt");
        res.json({ message: "Logged out successfully!" });
      } catch (error) {
        return res.json({ error: error.message });
      }
}

module.exports = {
    register,
    login,
    logout
}