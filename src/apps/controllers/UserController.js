const bcryptjs = require('bcryptjs');
const Users = require('../models/Users');



class UserController{
    async create(req,res){
        const verifyUser = await Users.findOne({
            where: {
                email:req.body.email,
            },
        });

        if (verifyUser) {
            return res.status(400).json({message: "E-mail has been used by someone else"})
        }
        const user = await Users.create(req.body)
        if(!user){
            return res.status(400).json({message: "Failed to create a user"})
        }
        return res.send( "User successfully created!" );
    }
        
    async update(req, res) {
        const {
          name, avatar, bio, gender, old_password, new_password, confirm_new_password,
        } = req.body;
    
        const user = await Users.findOne({id: req.userId});

        if (!user) {
            return res.status(400).json({ message: 'User not exits!' });
          }
      
          let encryptedPassword = '';
      
          if (old_password) {
            if (!await user.checkPassword(old_password)) {
              return res.status(401).json({ error: 'Old password does not match!' });
            }
      
            if (new_password === '' || confirm_new_password === '') {
              return res.status(401).json({
                error: 'We need a new_password and confirm_new_password attributes!',
              });
            }
      
            if (new_password !== confirm_new_password) {
              return res.status(401).json({
                error: 'New password and confirm new password does not match',
              });
            }
      
            encryptedPassword = await bcryptjs.hash(new_password, 8);
          }
      
          await Users.update(
            {
              name: name || user.name,
              avatar: avatar || user.avatar,
              bio: bio || user.bio,
              gender: gender || user.gender,
              password_hash: encryptedPassword !== '' ? encryptedPassword : user.password_hash,
            },
            {
              where: {
                id: user.id,
              },
            },
          );
      
          return res.status(200).json({ message: 'User updated!' });
        }

        async delete(req, res) {
            const { user_name } = req.body;
            const user = await Users.findOne({
                where:{
                user_name: user_name
                },
            });

            if (!user) {
              return res.status(400).json({ message: 'User not exists!' });
            }
        
            await Users.destroy({
                where: {
                    user_name: user_name
                },
                });
        
            return res.status(200).json({ message: 'User deleted!' });
          }

    }
    module.exports = new UserController();