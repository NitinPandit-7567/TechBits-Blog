const Likes = require("../model/likes");
const wrapAsync = require("../utils/wrapAsync");
const AppError = require("../utils/AppError");
const Users = require("../model/users");
const Posts = require("../model/posts");

module.exports.newLike = wrapAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await Users.findById(req.session.user_id);
  const post = await Posts.findById(id);
  if (user !== null && post !== null) {
    if (post.status !== "draft") {
      const like = new Likes({
        like: req.body.like,
        author: user._id,
        post: post._id,
      });
      await like.save();
      return res.status(201).json({ status: 201, _id: like._id });
    } else {
      return next(new AppError(403, "Not Authorized"));
    }
  } else {
    return next(new AppError(404, "Not Found"));
  }
});

module.exports.updateLike = wrapAsync(async (req, res, next) => {
  const { l_id } = req.params;
  if (
    req.body.like !== undefined &&
    (req.body.like.toString() === "false" ||
      req.body.like.toString() === "true")
  ) {
    await Likes.findByIdAndUpdate(
      l_id,
      { like: req.body.like },
      { runValidators: true, new: true }
    );
    res.status(200).json({ status: 200, message: "Like Updated" });
  } else {
    return next(new AppError(400,'Invalid Data'))
  }
});

module.exports.getLikes = wrapAsync(async (req, res, next) => {
  const { id } = req.params;
  const likes = await Likes.find({ post: { _id: id } });
  let likeCount = 0;
  let dislikeCount = 0;
  const result = { likeCount, dislikeCount };
  if (likes.length > 0) {
    for (let i of likes) {
      if (i.like) {
        result.likeCount += 1;
      } else {
        result.dislikeCount += 1;
      }
      if (i.author._id.toString() === req.session.user_id) {
        result.isLiked = i.like;
        result._id = i._id;
      }
    }
    return res.status(200).json({ ...result });
  } else {
    return res
      .status(200)
      .json({ status: 200, message: "There are no Likes yet" });
  }
});

module.exports.deleteLike = wrapAsync(async (req, res, next) => {
  const { l_id } = req.params;
  await Likes.findByIdAndDelete(l_id);
  return res.status(200).json({ status: 200, message: "Like Deleted" });
});
