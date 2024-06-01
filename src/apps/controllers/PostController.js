
const Posts = require('../models/Posts');
const Users = require('../models/Users');


class PostController {
  async create(req, res) {
    
    
    const { image, description, user_name, password } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'We need a password!' });
    }

    if (!user_name) {
      return res.status(400).json({ message: 'We need a user_name!' });
    }

    const findUser = await Users.findOne({
      where:{
        user_name
      }
    });

    if(!findUser){
      return res.status(400).json({ message: 'User not found!' });
    }


    if (!await findUser.checkPassword(password)) {
      return res.status(401).json({ message: 'Password does not match!' });
    }
    const newPost = await Posts.create({
      image,
      description,
      author_user_name: user_name
    });

    if (!newPost) {
      return res.status(400).json({ message: 'Created post failed' });
    }
    return res.status(200).json({ message: 'Upload concluded!' });

  }

  async delete(req, res) {
  
    const { id } = req.params;

    const { user_name, password } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'We need a password!' });
    }

    if (!user_name) {
      return res.status(400).json({ message: 'We need a user_name!' });
    }

    const verifyPost = await Posts.findOne({
      where: {
        id,
      },
    });

    try {
      const { author_user_name } = verifyPost;

    if (author_user_name !== user_name) {
      return res.status(400).json({ message: 'You are not the author!' });
    }

      const verifyUser = await Users.findOne({
        where: {
          user_name,
        },
      });

      if (verifyUser === null) {
        return res.status(404).json({ message: 'User does not exits!' });
      }   

      if (!await verifyUser.checkPassword(password)) {
        return res.status(401).json({ message: 'Password does not match!' });
      }
  
      const deletedPost = await Posts.destroy({
        where: {
          id,
        },
      });
  
      if (!deletedPost) {
        return res.status(400).json({ message: 'Failed to delete this post!' });
      }
  
      return res.status(200).json({ message: 'Post deleted!' });
      
    } catch (error) {
      
      if (verifyPost === null) {
        return res.status(404).json({ message: 'Post does not exits!' });
      }   
  }
}


  async update(req, res) {
    const { id } = req.params;
    const { description, user_name, password } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'We need a password!' });
    }

    if (!user_name) {
      return res.status(400).json({ message: 'We need a user_name!' });
    }

    if (!description) {
      return res.status(400).json({ message: 'Add some description!' });
    }

    const verifyPost = await Posts.findOne({
      where: {
        id,
      },
    });

    try {
      const { author_user_name } = verifyPost;

      const postUpdate = await Posts.update(req.body, { where: { id } });

    if (author_user_name !== user_name) {
      return res.status(400).json({ message: 'You are not the author!' });
    }

      const verifyUser = await Users.findOne({
        where: {
          user_name,
        },
      });

      if (!await verifyUser.checkPassword(password)) {
        return res.status(401).json({ message: 'Password does not match!' });
      }
  
      if (!postUpdate) {
        return res.status(400).json({ message: 'Failed to update this post!' });
      }

      if (postUpdate) {
        return res.status(400).json({ message: 'Post updated!' });
      }
      
    } catch (error) {
      
      if (verifyPost === null) {
        return res.status(404).json({ message: 'Post does not exits!' });
      }   
  }
}



async listPosts(req, res) {

  const { user_name } = req.body;

  const allPosts = await Posts.findAll({
    order: [
      ['id', 'DESC'],
    ],
    where: {
      author_user_name: user_name
    },
  });

  if (!allPosts) {
    return res.status(400).json({ message: 'Failed to list all posts' });
  }

  const formattedData = [];

  for (const item of allPosts) {
    formattedData.push({
      id: item.id,
      image: item.image,
      description: item.description,
      number_likes: item.number_likes,
    });
  }

  return res.status(200).json({
    data: formattedData,
  });
}

async addLike(req, res) {
  const { id } = req.params;

  const verifyPost = await Posts.findOne({
    where: {
      id,
    },
  });

  if (!verifyPost) {
    return res.status(404).json({ message: 'Post does not exits!' });
  }

  const postUpdate = await Posts.update({ number_likes: verifyPost.number_likes + 1 },
    {
      where: { id },
    });

  if (!postUpdate) {
    return res.status(400).json({ message: 'Failed to add like in this post!' });
  }

  return res.status(200).json({
    message: '+1 Like!',
  });

  if(!findUser){
    return res.status(400).json({ message: 'User not found!' });
  }
}

async listAllPosts(req, res) {
  const allPosts = await Posts.findAll();

  return res.status(200).json({
    data: allPosts,
  });
}


    
}

module.exports = new PostController();