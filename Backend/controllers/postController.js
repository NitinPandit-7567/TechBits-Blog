const Users = require("../model/users");
const Posts = require("../model/posts");
const wrapAsync = require("../utils/wrapAsync");
const AppError = require("../utils/AppError");
const Comments = require("../model/comments");
const Likes = require("../model/likes");
const fs = require("fs");
const path = require("path");
const defaultImage = "../../blog-cover-picture.png";

const unlinkImage = function (image) {                                        //function to delete image from storage
  if (image !== defaultImage && image !== undefined) {                     
    const image_path = image.split("/");
    const filename = image_path[image_path.length - 1];
    const file_path = path.join(
      __dirname,
      "../../TechBits/public/uploads/" + filename
    );
    try {
      fs.unlinkSync(file_path);
    } catch (err) {
      if (err) {
        console.error(`Error while unlinking image ${filename}:`, err);
      } else {
        console.log(`Image ${filename} unlinked successfully.`);
      }
    }
  }
};

module.exports.allPosts = wrapAsync(async (req, res, next) => {
  let page = (req.query.page>0 ? req.query.page : 0) || 1;                             //checking if page value in the request query is greater than 0, else setting it to 1
  const resultsPerPage = req.query.size || 5;                                          //setting the page size to 5 if page size is not present in request query
  const total = await Posts.countDocuments({ status: "published" });                   //fetching count of documents that were published
  const pages = Math.ceil(total / resultsPerPage);                                     //calculating total pages
  if( page>pages){
    page=pages;                                                                       //setting page to last page if page is greater than total pages
  }
  let posts = await Posts.find(                                                       //sorting the published posts in descending order and getting paginated results from the databse
    { status: "published" },
    { content: 0, updatedAt: 0, status: 0 }
  )
    .sort({ createdAt: "descending" })
    .lean()
    .skip((page - 1) * resultsPerPage)
    .limit(resultsPerPage)
    .populate({ path: "author", select: { _id: 1, username: 1 } });
  if (posts && posts.length > 0) {
    for (let i of posts) {
      const comments = await Comments.find({ post: { _id: i._id } });               //calculating total comments for each post
      i.commentsCount = comments.length;
    }
  }
  return res.status(200).json({ pages, page, size: resultsPerPage, posts });        //sending back the current page, total pages, page size and the posts
});

module.exports.myPosts = wrapAsync(async (req, res, next) => {                      //same logic as getAllposts but filters using user ID and fetches draft posts as well
  let page = (req.query.page>0 ? req.query.page : 1) || 1;
  const resultsPerPage = req.query.size || 5;
  const total = await Posts.countDocuments({author: { _id: req.session.user_id }});     
  const pages = Math.ceil(total / resultsPerPage);
  if(page>pages){
    page=pages;
  }
  let posts = await Posts.find(
    { author: { _id: req.session.user_id } },
    { content: 0 }
  )
    .sort({ createdAt: "descending" })
    .lean()
    .skip((page - 1) * resultsPerPage)
    .limit(resultsPerPage)
    .populate({ path: "author", select: { _id: 1, username: 1 } });
  for (let i of posts) {
    const comments = await Comments.find({ post: { _id: i._id } });
    i.commentsCount = comments.length;
  }
  return res.status(200).json({ pages, page, size: resultsPerPage, posts });
});

module.exports.newPost = wrapAsync(async (req, res, next) => {
  let image = defaultImage;                                           //initilaizing image to point to the default cover image
  if (req.file) {
    image = "../../uploads/" + req.file.filename;                     //if file was uploaded, storing the file path in the image variable
  }
  let { title, summary, content, tags, status } = req.body;
  if (tags) {
    if (!tags.length > 0) {                                           //checking if tags were added to the post
      tags = [];                                                      //storing an empty array if tags were not added
    } else {
      tags = JSON.parse(tags);                                        //storing the array of tags if they were added
    }
  }
  const author = await Users.findById(req.session.user_id);           //setting the current user as the author of the post 
  const new_post = new Posts({
    author,
    title,
    summary,
    content,
    tags,
    status,
    image,
  });
  await new_post.save();
  return res.status(201).json({ id: new_post._id });              //sending back the new post ID with status 201
});

module.exports.getPost = wrapAsync(async (req, res, next) => {      
  const { id } = req.params;
  const post = await Posts.findById(id).populate({               //fetching the post details using the post ID and populating author detauls
    path: "author",
    select: { _id: 1, username: 1, email: 1, name: 1 },
  });
  if (post) {
    res.status(200).json({ post: post });
  } else {
    return next(new AppError(404, "Not Found"));
  }
});

module.exports.editPost = wrapAsync(async (req, res, next) => {    
  const { id } = req.params;
  let { title, summary, content, tags, status, image} = req.body;
  if (req.file) {                                                         //checking if file was uploaded in the update request
    let {deleteImage} = req.body;
    deleteImage = JSON.parse(deleteImage);                
    if (deleteImage.toDelete) {                                           //if file was uploaded and deleteImage is set to true, deleting the old image
      unlinkImage(deleteImage.image);
    }
    image = image = "../../uploads/" + req.file.filename;                 //else storing the default image path
  }
  if (tags) {                                                             //storing the tags
    if (!tags.length > 0) {                                     
      tags = [];
    } else if (!Array.isArray(tags)) {
      tags = JSON.parse(tags);
    }
  }
  const post = await Posts.findByIdAndUpdate(                           //updating the post
    id,
    { title, summary, content, tags, status, image },
    { runValidators: true, new: true }
  );
  res.status(200).json({ status: 200, message: "Post Updated" });
});

module.exports.deletePost = wrapAsync(async (req, res, next) => {
  const { id } = req.params;
  const post = await Posts.findByIdAndDelete(id).catch((err) => {           //deleting the post using the post ID
    return next(err);
  });
  if (post) {
    unlinkImage(post.image);                                                //deleting the image after post deletion
    return res.status(200).json({ status: 200, message: "success" });
  } else {
    return next(404, "Not Found");
  }
});
