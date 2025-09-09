 const mongoose = require('mongoose')

 const userSchema = new mongoose.Schema({
    role:{
         type:String,
          required:[true,'email is required'],
          enum:['admin','organisation','donar','hospital']
    },
    // name:{
    //       type:String,
    //       required: function(){
    //         if(this.role === 'user'|| this.role ==='admin'){
    //             return true;
    //         }
    //         return false;
    //       }
    // },
name: {
  type: String,
  required: function () {
    return this.role === 'donar' || this.role === 'admin';
  }
},


    
//     organisation:{
//          type:String,
//           required: function(){
//             if(this.role === 'organisation'){
//                 return true
//             }
//             return false

//     }
// },

organisationName: {
  type: String,
  required: function () {
    return this.role === 'organisation';
  }
}
,
// hospital:{
//     type:String,
//      required: function(){
//             if(this.role === 'hospital'){
//                     return true
//             }
//             return false
//             }
// },

hospitalName: {
  type: String,
  required: function () {
    return this.role === 'hospital';
  }
}
,
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true,
         lowercase: true,   // ✅ ensures it's saved lowercase
  trim: true
    },
    password:{
        type:String,
        required:[true,'passwaord is required'],
    },
    website:{
        type:String,
    },
    address:{
        type:String,
        required:[true,'address is required'],
    },
    phone:{
         type:String,
        required:[true,'phone no is required'],
    },
    },{timestamps:true}
 );

 module.exports = mongoose.model('users',userSchema)
