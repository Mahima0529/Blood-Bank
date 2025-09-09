// const mongoose = require("mongoose")

// const inventorySchema = new mongoose.Schema({
//     inventoryType:{
//         type:String,
//         required:[true, 'inventory type require'],
//         enum:['in', 'out']
//     },
//     bloodGroup:{
//         type:String,
//         required:[true,'blood group is required'],
//         enum:['0+','0-','AB+' ,'AB-','A+','A-','B+','B-']


//     },
//     quantity:{
//         type:Number,
//         ref:'organisations',
//         required:[true,'organisation is required']
//     },
//     organisation:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref:'users',
//         required:[true,'organisation is required']
//     },
//     hospital:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref:'users',
//         required: function(){
//             return this.inventoryType ==="Out";
//         }
//     },
//     donar:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref:"users",
//         required: function(){
//             return this.inventoryType ==="In";
//         },
//     },
// },
// {timestamps:true}
// );

const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    inventoryType: {
      type: String,
      required: [true, 'Inventory type is required'],
      enum: ['in', 'out'],
    },
    bloodGroup: {
      type: String,
      required: [true, 'Blood group is required'],
      enum: ['O+', 'O-', 'AB+', 'AB-', 'A+', 'A-', 'B+', 'B-'], // Fixed: '0+' ➝ 'O+'
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
    },
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: [true, 'Organisation is required'],
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: function () {
        return this.inventoryType === 'out'; // Fixed case: 'Out' ➝ 'out'
      },
    },
    donar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: function () {
        return this.inventoryType === 'in'; // Fixed case: 'In' ➝ 'in'
      },
    },
  },
  { timestamps: true }
);

// ✅ Export the model correctly to use it as a constructor
module.exports = mongoose.model('Inventory', inventorySchema);
