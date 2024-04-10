const Profile = require("../models/profileSchema");
const Thread = require("../models/threadSchema");
const jwt = require("jsonwebtoken");

const fetchThreads = async (req, res) => {
  const token = req.cookies.jwt;
  if (!token)
    return res.json({
      error: "Please login first, to fetch threads based on your informations",
    });
  const decoded = jwt.verify(token, "jwtsecret");
  const user = await Profile.findOne({ user_id: decoded.id });
  const userLanguage = user.language;
  const userCity = user.city;

  const { page = 1, limit = 6 } = req.query;
  const skip = (page - 1) * limit;

  const threads = await Thread.find()
    .populate("profile_id", "followers_count language city age -_id")
    .skip(skip)
    .limit(limit);

  threads.sort((a, b) => {
    if (b.profile_id.followers_count !== a.profile_id.followers_count) {
      return b.profile_id.followers_count - a.profile_id.followers_count;
    }

    if (b.likes_count !== a.likes_count) {
      return b.likes_count - a.likes_count;
    }

    if (b.createdAt.getTime() !== a.createdAt.getTime()) {
      return b.createdAt.getTime() - a.createdAt.getTime();
    }

    if (a.profile_id.age !== b.profile_id.age) {
      return b.profile_id.age - a.profile_id.age;
    }

    if (
      a.profile_id.language === userLanguage &&
      b.profile_id.language !== userLanguage
    ) {
      return -1;
    } else if (
      a.profile_id.language !== userLanguage &&
      b.profile_id.language === userLanguage
    ) {
      return 1;
    }

    return 0;
  });

  res.json(threads);
};

module.exports = {
  fetchThreads,
};
