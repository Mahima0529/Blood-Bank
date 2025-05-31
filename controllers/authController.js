const usermodel = require("../models/usermodel");
const bcrypt = require('bcryptjs')
const registerController =async(req,res)=>{
  try{
    const existingUser =await usermodel.findOne({email:req.body.email})
//validation
if(existingUser){
    return res.status(200).send({
        success:false,
        message: 'user already exists'
    })
}
//hash password
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(req.body.password,salt)
req.body.password = hashedPassword
//rest data
const user = new usermodel(req.body)
await user.save()
return res.status(201).send({
    success:true,
    message: 'user registered successfully',
})
} catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:"error in register API",
        error

    })
}
};

module.exports={ registerController};