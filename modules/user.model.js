// const mongoose = require('mongoose')
// const bcrypt = require('bcryptjs');
// const userSchema = mongoose.Schema({
//     firstname:String,
//     lastname:String,
//     email:String,
//     username:String,
//     file:String,
//     password:String,
// })

// let saltRound = 10;
// userSchema.pre('save',function(next){
//     bcrypt.hash(this.password,saltRound,(err,hashedPassword)=>{
//         if(err){
//             console.log(err)
//         }else{
//             this.password = hashedPassword
//             next()
//         }
//     })
// })
// userSchema.methods.validatePassword = function(password,callback){
//     console.log(this)
//     console.log(password)
//     bcrypt.compare(password,this.password,(err,same)=>{
//         if(!err){
//             callback(err,same)
//         }else{
//             next()
//         }
//     })
// }
// const picSchema= mongoose.Schema({
//     image: String,
//     userId: String,
//     created_at: Date,
//     username: String,
//     fullname: String,
//     caption: String,
    
// })
// const proSchema= mongoose.Schema({
//     image: String,
//     userId: String,
//     created_at: String,
//     username: String,
//     email: String
// })

// const userModel = mongoose.model('user_tb',userSchema);
// const picModel = mongoose.model('pic_tb',picSchema);
// const proModel = mongoose.model('pro_tb',proSchema);
// module.exports ={userModel,picModel,proModel}