const Posts = require('../models/Posts');

class PostController {
  async create(req, res) {
    const {author_id, image, description } = req.body;

    const newPost = await Posts.create({
      image,
      description,
      author_id
    });

    if (!newPost) {
      return res.status(400).json({ message: 'Created post failed' });
    }
    return res.status(200).json({ data: { image, description } });
  }

  async delete(req, res) {
    const { id } = req.params;

    const verifyPost = await Posts.findOne({
      where: {
        id,
      },
    });

    if (!verifyPost) {
      return res.status(404).json({ message: 'Post does not exits!' });
    }

    //.

    const deletedPost = await Posts.destroy({
      where: {
        id,
      },
    });

    if (!deletedPost) {
      return res.status(400).json({ message: 'Failed to delete this post!' });
    }

    return res.status(200).json({ message: 'Post deleted!' });
  }

}


module.exports = new PostController();