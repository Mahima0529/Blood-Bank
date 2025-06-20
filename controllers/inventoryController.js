//create inventory
// const inventoryModel = require("../models/inventoryModel");
// const usermodel  =require("../models/usermodel");
// const createInventoryController = async(req,res) =>{
//     try{
//         const {email,inventoryType} = req.body
//         //validatio
//         const user = await usermodel.findOne({email})
//         if(!user){
//              throw new Error('User Not Found')
//         }

//         if(inventoryType === "In" && user.role!=="donar"){
//              throw new Error("Not a donar account")

//         }
//         if(inventoryType === "Out"&& user.role!= "hospital"){
//              throw new Error("Not a hospital")
//         }
//         //save record

//         const inventory= new inventoryModel(req.body)
//         await inventory.save()
//         return res.status(200).send({
//             success:true,
//             message:"New Blodd Record Added"

//         })
//     }catch(error){
//         console.log(error)
//         return res.status(500).send({
//             success:true,
//             message:"Error in creating inventory API",
//             error
//         })
//     }
// };

// module.exports = {createInventoryController};


// const inventoryModel = require("../models/inventoryModel");
// const userModel = require("../models/usermodel");

// const createInventoryController = async (req, res) => {
//   try {
//     const { email, inventoryType } = req.body;

//     // Validation: Find user by email
//     const user = await userModel.findOne({ email });
//     if (!user) {
//       throw new Error("User Not Found");
//     }

//     // Role-based checks
//     if (inventoryType === "in" && user.role !== "donar") {
//       throw new Error("Not a donar account");
//     }

//     if (inventoryType === "out" && user.role !== "hospital") {
//       throw new Error("Not a hospital");
//     }

//     // Set organisation field (required in schema)
//     const newInventoryData = {
//       ...req.body,
//       organisation: user._id, // Inject the organisation ID
//     };

//     // Save inventory record
//     const inventory = new inventoryModel(newInventoryData);
//     await inventory.save();

//     return res.status(200).send({
//       success: true,
//       message: "New Blood Record Added",
//       data: inventory
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       success: false,
//       message: "Error in creating inventory API",
//       error: error.message
//     });
//   }
// };

// module.exports = { createInventoryController };


const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/usermodel");

const createInventoryController = async (req, res) => {
  try {
    const { email } = req.body;
    let { inventoryType } = req.body;

    if (!req.body.quantity || !inventoryType) {
      return res.status(400).send({
        success: false,
        message: "Quantity and inventoryType are required",
      });
    }

    inventoryType = inventoryType.toLowerCase(); // ✅ Normalize to match schema

    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User Not Found");
    }

    if (inventoryType === "in" && user.role !== "donar") {
      throw new Error("Not a donar account");
    }

    if (inventoryType === "out" && user.role !== "hospital") {
      throw new Error("Not a hospital");
    }

    const newInventoryData = {
      ...req.body,
      inventoryType,
      organisation: user._id,
    };

    const inventory = new inventoryModel(newInventoryData);
    await inventory.save();

    return res.status(200).send({
      success: true,
      message: "New Blood Record Added",
      data: inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in creating inventory API",
      error: error.message,
    });
  }
};

//Get ALL BLOOD RECORDS
const getInventoryController=async(req,res)=>{
  try{
    const inventory=await inventoryModel.find({
      organisation: req.userId,
    })
    .populate("organisation")
    // .populate("hospital")
    .sort({createdAt: -1});
     return res.status(200).send({
      success: true,
      message: "Fetched all inventory records successfully",
     inventory,
    });
  } catch(error){
    console.log(error);
    return res.status(500).send({
      success:false,
      message:"Error In Get AAll Inventory",
      error,
    });
  }
}

module.exports = { createInventoryController,getInventoryController };
