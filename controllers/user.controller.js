// const { userModel, picModel, proModel } = require('../modules/user.model')
// const cloudinary = require('cloudinary');
// const jwt = require('jsonwebtoken');
// const { response } = require('express');
// // const { post } = require('../routes/user.route');
// const SECRET = process.env.JWT_SECRET
// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET
// });
// const registerUser = (req, res) => {
//     const newUser = req.body;
//     const email = req.body.email
//     userModel.findOne({ email: email }, (err, user) => {
//         if (err) {
//             res.status(501).send({ message: 'Internal Server Error', status: false })
//         } else {
//             if (user) {
//                 res.send({ message: 'Email Already Exist', status: false })
//             } else {
//                 userModel.findOne({ username: req.body.username }, (err, result) => {
//                     if (result) {
//                         res.send({message:'Username Exist', status:false});
//                     } else {
//                         const form = new userModel(newUser)
//                         form.save((err) => {
//                             if (err) {
//                                 console.log(`an error occured`)
//                                 res.status(501).send({ message: 'user sign up failed,please try again later', status: false })
//                             } else {
//                                 res.send({ message: 'Registration Successful', status: true })
//                             }
//                         })

//                     }
//                 })

//             }
//         }
//     })

// }
// const profile = (req, res) => {
//     proModel.findOne(req.body, (err, response) => {
//         if (err) {
//             res.status(501).send({status: false, message: "Internal Server Error"});
//         } else {
//             if(result) {
//                 res.send({status: true, message: "Success", image: response.image});
//             }
//         }
//     })
// }

// const setProfile = (req, res) => {
//     const sent = req.body;
//     const file = req.body.myfile
//     const token=req.body.token
//     console.log(sent)
//     // const user = req.body.currentUser
//     cloudinary.v2.uploader.upload(file,
//         { folder: 'Profile' },
//         (err, result) => {
//             if (err) {
//                 console.log(err)
//                 res.send({ message: 'Upload failed' })
//             } else {
//                 jwt.verify(token, SECRET, (err, userDetails) => {
//                   userModel.updateMany({email:userDetails.email},{$set:{file:result.secure_url}},
//                     function(error,result1){
//                         if(error){
//                             console.log(error)
//                         }
//                         else{
//                              res.send({ message: 'Upload successful',image:result.secure_url}) 
//                         }
//                     })

//                 }
//                 )
              
//             }
//         });

// }
// const UploadFile = (req, res) => {
//     const sent = req.body;
//     const file = req.body.myfile
//     const cap = req.body.caption
//     const user = req.body.currentUser
//     //const file = req.body.
//     cloudinary.v2.uploader.upload(file,
//         { folder: 'InstagramPost' },
//         (err, result) => {
//             if (err) {
//                 console.log(err)
//                 res.send({ message: 'Upload failed' })
//             } else {
//                 jwt.verify(req.body.token, SECRET, (err, userDetails) => {
//                     if (err) {
//                         console.log(err)
//                     } else {
//                         let email = userDetails.email
//                         var form = new picModel({
//                             created_at: new Date(),
//                             image: result.secure_url,
//                             userId: email,
//                             caption: cap,
//                             username: user
//                         });

//                         form.save((error, details) => {
//                             if (error) {
//                                 console.log(error)
//                                 console.log(`error`)
//                                 res.send({ message: "upload failed, please try again" })
//                             } else {
//                                 res.send({ message: 'upload successful', image: result.secure_url })
//                                 console.log(details);
//                             }

//                         })
//                     }
//                 })
//             }
//         });

// }
// const login = (req, res) => {
//     const email = req.body.email
//     const password = req.body.password
//     userModel.findOne({ email: email }, (err, user) => {
//         if (err) {
//             res.status(501).send({ message: 'server error', status: false })
//         } else {
//             if (!user) {
//                 res.send({ message: 'Depart from me', status: false })
//             } else {
//                 user.validatePassword(password, (err, same) => {
//                     if (err) {
//                         console.log(`error dey`)
//                     } else {
//                         if (same) {
//                             const token = jwt.sign({ email }, SECRET, { expiresIn: '1h' })
//                             console.log(token)
//                             res.send({ message: 'correct password', status: true, token })
//                         } else {
//                             res.send({ message: 'invalid password', status: false })
//                         }
//                     }
//                 })
//             }
//         }
//     })
// }
// const getDashboard = (req, res) => {
//     const token = req.headers.authorization.split(' ')[1]
//     jwt.verify(token, SECRET, (err, result) => {
//         console.log(result);
//         if (err) {
//             console.log(err)
//             res.send({ status: false, message: 'unauthorized' })
//         } else {
//             console.log("e dey work")
//             userModel.findOne({ email: result.email }, (error, userDetails) => {
//                 if (error) {
//                     res.status(501).send({ status: false, message: 'internal server error' })
//                 } else {
//                     res.send({ status: true, message: 'still valid', userDetails: userDetails})
//                 }
//             }
//             )

//         }

//     }
//     )
// }
// const getAllUser=(req,res)=>{
//     userModel.find((err,result)=>{
//         if(err){
//             console.log(err)
//             res.send({ status:false, message: 'can not find'})
//         }
//         else{
//             res.send({ status: true, message: 'found', AllUser: result})
//         }
//     })
// }
// const getPost=(req,res)=>{
//     picModel.find((err, pic) => {
//         if (err) {
//             res.status(501).send({ status: false, message: 'upload failed try again later' })
//         } else {
//             res.send({ status: true, message: 'still valid', userPic: pic })

//         }
//     })

// }

// module.exports = { registerUser, login, getDashboard, UploadFile, profile, setProfile, getPost, getAllUser }