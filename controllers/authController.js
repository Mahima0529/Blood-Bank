// const usermodel = require("../models/usermodel");
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')

// const registerController =async(req,res)=>{
//   try{
//     const existingUser =await usermodel.findOne({email:req.body.email})
// //validation
// if(existingUser){
//     return res.status(200).send({
//         success:false,
//         message: 'user already exists'
//     })
// }
// //hash password
// const salt = await bcrypt.genSalt(10)
// const hashedPassword = await bcrypt.hash(req.body.password,salt)
// req.body.password = hashedPassword
// //rest data
// const user = new usermodel(req.body)
// await user.save()
// return res.status(201).send({
//     success:true,
//     message: 'user registered successfully',
//     user:existingUser
// })
// } catch(error){
//     console.log(error)
//     res.status(500).send({
//         success:false,
//         message:"error in register API",
//         error

//     })
// }
// };

// //login callback
// const loginController =async(req,res) =>{
//     try{
//         const user = await usermodel.findOne({email:req.body.email})
//         if(!user){
//             return res.status(404).send({
//                 success:false,
//                 message:"user not found"
//             })
//         }
// //check role
// if(user.role!= req.body.role){
//     return res.status(500).send
// ({
//     success:false,
//     message:"role dosent match"
// });
// }
//         //compare password
//         const comparePassword = await bcrypt.compare(req.body.password, user.password);
//         if(!comparePassword){
//             return res.status(500).send({
//                 success:false,
//                 message:"invalid Credentials",
//             });
//         }
// // //check role
// // if(user.role!= req.body.role){
// //     return res.status(500).send
// // ({
// //     success:false,
// //     message:"role dosent match"
// // })}




//         const token =jwt.sign({userId: user._id},  process.env.JWT_SECRET, {
//             expiresIn: "1d",
//         });
//         return res.status(200).send({
//             success:true,
//             message:"Login Successfully",
//             token,
//             user,
//         });

//     }catch(error){
//         console.log(error)
//         res.status(500).send({
//             success:false,
//             message:"error in login API",
//             error
//         })
//     }
// };
//  //GET CURRENT USER 
//  const currentUserController =async(req, res)=>{
//     try{

//         const user= await usermodel.findOne({ _id: req.body.userId});
//         return res.status(200).send({
//             success:true,
//             message:"User Fetched Succesfully",
//             user,
//         })
//     }catch(error){
//         console.log(error)
//         return res.status(500).send({
//             success:false,
//             message:'unable to get current user',
//         })
//     }
//  };

// module.exports={ registerController,loginController,currentUserController} ;



const usermodel = require("../models/usermodel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register Controller
const registerController = async (req, res) => {
  try {
    const existingUser = await usermodel.findOne({ email: req.body.email });

    // Validation
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: 'User already exists'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    // Save user
    const user = new usermodel(req.body);
    const savedUser = await user.save();

    return res.status(201).send({
      success: true,
      message: 'User registered successfully',
      user: savedUser  // ✅ Correct user returned
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in register API",
      error: error.message
    });
  }
};

// Login Controller
const loginController = async (req, res) => {
  try {
    const user = await usermodel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found"
      });
    }

    // Check role
    if (user.role !== req.body.role) {
      return res.status(400).send({
        success: false,
        message: "Role doesn't match"
      });
    }

    // Compare password
    const comparePassword = await bcrypt.compare(req.body.password, user.password);
    if (!comparePassword) {
      return res.status(400).send({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).send({
      success: true,
      message: "Login successfully",
      token,
      user
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login API",
      error: error.message
    });
  }
};

// Get Current User
const currentUserController = async (req, res) => {
  try {
    const user = await usermodel.findById(req.body.userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).send({
      success: true,
      message: "User fetched successfully",
      user
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Unable to get current user',
      error: error.message
    });
  }
};

module.exports = {
  registerController,
  loginController,
  currentUserController
};
