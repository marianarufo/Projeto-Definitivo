const bcryptjs = require('bcryptjs');
const Users = require('../models/Users');
const { decryptedToken } = require('../../utils/token');
const mailer = require('../../modules/mailer');
const crypto = require("crypto");

class UserController{
    async create(req,res){
        try {
          const verifyUser = await Users.findOne({
            where: {
                email:req.body.email,
            },
        });

        if (verifyUser) {
            return res.status(400).json({message: "E-mail has been used by someone else"})
        }
        
        const user = await Users.create(req.body)
        
          return res.send( "User successfully created!" );

        } catch (error) {
        
          return res.send("Failed to create a user");
        }

       
    }
        
    async update(req, res) {
        const {
          user_name, name, avatar, bio, gender, password, old_password, new_password, confirm_new_password,
        } = req.body;
    
        const user = await Users.findOne({
          where: {
            user_name: user_name, 
          }
        });

        if (!user) {
            return res.status(400).json({ message: 'User not exits!' });
          }
      
          let encryptedPassword = '';

          if (!await user.checkPassword(password)) {
            return res.status(401).json({ error: 'Password does not match!' });
          }

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
          const { user_name, password } = req.body;
          
        
          const user = await Users.findOne({
              where:{
              user_name: user_name
              },
          });
          

          if (!user_name) {
            return res.status(400).json({ message: 'We need a user_name!' });
          }


          if (!user) {
            return res.status(400).json({ message: 'User not found!' });
          }

          if (!password) {
            return res.status(400).json({ message: 'We need a password!' });
          }

          if (!await user.checkPassword(password)) {
            return res.status(400).json({ error: 'Password does not match!' });
          }

          await Users.destroy({
              where: {
                  user_name: user_name
              },
              });
      
          return res.status(200).json({ message: 'User deleted!' });
        }

          async userProfile(req, res) {
            
            const { user_name } = req.body;

            const user = await Users.findOne({ where: {user_name: user_name}});
        
            if (!user) {
              return res.status(400).json({ message: 'User not exists!' });
            }
        
            const {
              id, name, email, avatar, bio, gender,
            } = user;
        
            return res.status(200).json({
              user: {
                id, name, user_name, email, avatar, bio, gender,
              },
            });
          }

          async rescue(req, res){
            const { email } = req.body;
            try {
                const user = await Users.findOne({ 
                  where: {
                     email, 
                    }
                    });
                if(!user){
                    return res.status(400).json({ message: "User not found!"});
                }
                const token = crypto.randomBytes(20).toString('hex');
                const now = new Date();
                now.setHours(now.getHours() + 1);

                await Users.update(
                  {
                    password_reset_token: token,
                    password_reset_expires: now,
                  },
                  {
                    where: {
                      email,
                    },
                  },
                );

                mailer.sendMail({
                    to: email,
                    from: 'mariana.rufo@compjunior.com.br',
                    template: 'auth/forgot_password',
                    context: { token },
                }, (err) => {
                    if(err){
                        console.log(err);
                        return res.status(400).json({ message: 'Cannot send forgot password email!'});
                    }
                    return res.status(200).json({ message: "Email sent successfully!"});
                })
            } catch (error) {
                return res.status(400).send({ message: "Unable to change the password!"});
            }
        }

        async listAllUsers(req, res) {
          const allUsers = await Users.findAll();
      
          return res.status(200).json({
            data: allUsers,
          });
        }

    }
    module.exports = new UserController();