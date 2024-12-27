
const Comment = require("../models/Comment");
const User = require('../models/User');

module.exports = {
  createComment: async (req, res) => {
    try {
      const user = req.user; // The logged-in user object
      const username = user.userName;  // Get the username from the logged-in user

      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
        user: user._id,
        username: username,
      });
      console.log("Comment has been added!");
      console.log(`${user._id}`)
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },

  deleteComment: async (req,res) => {
    const commentId = req.params.id;
    const postId= req.body.postId;
    console.log(`Deleting comment with ID: ${commentId} for post ID: ${postId}`);
    try {
      const result = await Comment.findByIdAndDelete(commentId)
      console.log("Deleted comment", result)
      res.redirect(`/post/${postId}`);
    } catch (err) {
      if (err) return res.status(500).send(err)
    }

  },
};

  //  try {
  //     // Find post by id
  //     let post = await Post.findById({ _id: req.params.id });
  //     // Delete image from cloudinary
  //     await cloudinary.uploader.destroy(post.cloudinaryId);
  //     // Delete post from db
  //     await Post.remove({ _id: req.params.id });
  //     console.log("Deleted Post");
  //     res.redirect("/profile");
  //   } catch (err) {
  //     res.redirect("/profile");
  //   }
  // },
