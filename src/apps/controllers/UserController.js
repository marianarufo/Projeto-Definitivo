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
        
        
    }
    module.exports = new UserController();