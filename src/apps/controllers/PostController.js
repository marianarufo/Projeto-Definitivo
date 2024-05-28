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
}

module.exports = new PostController();