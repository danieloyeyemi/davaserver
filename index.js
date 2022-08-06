const express= require('express') //importing express and putting into variable/constant express
const app = express();
const mongoose = require("mongoose")
const path = require("path");
const { MongoClient, ServerApiVersion } = require('mongodb')
const bcryptjs= require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const formidable = require('formidable')
const cloudinary = require('cloudinary')
app.use(express.static(path.resolve(__dirname, "./build")));
app.use(express.static(__dirname+'/public'))
const cors = require('cors')
app.use(cors())
const PORT = process.env.PORT || 3000;
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET 
});

const goodsSchema= new mongoose.Schema(
    {
        imgofgood:String,
        nameofgood:String,
        amountinnaira:String,
        numberavailable:String,
        imgdesc:String
    }
)

const userSchema= new mongoose.Schema(
    {
        firstname:String,
        lastname:String,
        email:String,
        username:String,
        password:String

    }
    
)
const usercartSchema= new mongoose.Schema(
    {
    username: String,
    goodsdetail: Object
}
)


const goodsModel= mongoose.model("Item_tb", goodsSchema)
const userModel= mongoose.model("user_tb", userSchema)
const usercartModel= mongoose.model("usercart_tb", usercartSchema)

const bodyParser= require('body-parser')
app.use(bodyParser.json())
const url=process.env.URI
app.use(bodyParser.urlencoded({extended: true}))
mongoose.connect(url, (err)=>{
    if (err) {
        console.log(err.message);
        console.log("Error");
    }
    else{
        console.log("working");
    }
})
app.use(express.static(__dirname+'/public'))
app.use(express.static(__dirname+'/build/static'))
app.set('view engine', 'ejs')


app.get('/all', (request, response)=>{
    goodsModel.find((error,result)=>{
        console.log(result)
        response.send({result})
    })
})
app.post('/addgood',(request, response)=>{
    
    console.log(request.body)
})
app.post('/remove',(request, response)=>{
    console.log(request.body)
    const recusername=request.body.name
    usercartModel.deleteMany({username: recusername},(err,result)=>{
        console.log(result)
    })
})
        app.post('/delfc', (request, response)=>{
            // console.log(request.body)
            const fimg=request.body
                usercartModel.find({username: fimg.username}, (err, result)=>{
                    if(err){
                        console.log(err.message)
                    }
                    else{
                        console.log(result.goodsdetail)
                    }
                })
        })
app.post('/login', (request, response)=>{
    const loginform= request.body
    const newLogin={
        username:loginform.username,
        password:loginform.password
    }
    let found= userModel.find({username: newLogin.username},(err,result)=>{
        if (err) {
                    console.log(err.message)
                }
                // else if(result.length==0){
                //     console.log("Nothing")
                //     // response.send({message:})
                //     response.send({message: "Sorry! You have no account!",result})
                //     // response.send({result})
                // }
                else if(result){
                    
                    const username=(result[0].username)
                    const passw=result[0].password;
                    const myPlaintextPassword = newLogin.password;
                    bcryptjs.hash(myPlaintextPassword, 10)
                    .then((hash) => {
                        return bcryptjs.compare(myPlaintextPassword, passw)
                    }).then((result) => {
                        if(result==true){
                            jwt.sign({username},  process.env.JWT_SECRET, function(err, token) {
                                // console.log(token);
                                response.send({message:"Your login is successful!",result,token,username})
                            });
                        }
                        else{
                            response.send({message:"Incorrect Password!",result})
                        }
                    })
                    // response.send({result})
                }
                else{
                response.send({message:"I don't know what's up",result})
                // response.send({result})
                }


            })
})
app.get('/dashcheck',(request,response)=>{
    const auth= request.headers.authorization
    const token = auth.split(' ')[1]
    console.log(token)
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err){
            console.log(`jwt could not be decoded`)
            response.send({message:err.message})
        }
        
        else{
            console.log(decoded.username)
            
            response.send({message:'verification successful', username:decoded.username})
        }
    })
})
app.post('/signup', (request, response)=>{
    console.log(request.body)
    const newUserForm=request.body
console.log(newUserForm)
            const myPlaintextPassword = newUserForm.password
            const salt = bcryptjs.genSaltSync(10);
            const hash = bcryptjs.hashSync(myPlaintextPassword, salt);
            console.log(hash)
            const newForm= {
                firstname: newUserForm.firstname,
                lastname:newUserForm.lastname,
                email:newUserForm.email,                
                username:newUserForm.username,
                password:hash
                            }
                            userModel.find({username: newForm.username},(err,result)=>{
                                if(result.length>0){
                                    console.log("Exists")
                                    response.send({message:`Username already exists. Is it you, ${newForm.username}? Please do well to login instead.`, text: 'no'})
                                }
                                else{
                                    response.send({message: 'Success', text:'yes'})
                                    let formm = new userModel(newForm)    
                                    formm.save()
                                }
                            })
})
app.post('/addToCart', (request,response)=>{
    const theimg=(request.body.theimg)
    const name=(request.body.name)
    const amount=(request.body.amount)
    const quantity=(request.body.quantity)
    const username=(request.body.username)

    const itemshii= 
    {
        username: username,
        goodsdetail:{
            theimg,name,amount,quantity
        }
    }

    let itemm = new usercartModel(itemshii)
    itemm.save()
    console.log(itemshii)
})
// let found= userModel.find({username: newLogin.username},(err,result)=>{})

    app.post('/', (request, response)=>{
        const bod= request.body
        console.log(bod.myfile);
        const oldPath = bod.myfile;
                cloudinary.v2.uploader.upload(oldPath, (error, result)=>{
                    if(error){
                        console.log(error)
                    }
                    else{
                        const newForm= {
                            imgofgood: result.secure_url,
                            nameofgood: bod.nameofgood,
                            amountinnaira:bod.amountinnaira,
                            imgdesc:bod.imgdesc,
                            numberavailable:bod.numberavailable
                        }
                        const image =  result.secure_url
                        let formm = new goodsModel(newForm)
                        console.log(image)
                        response.send(result)
                        formm.save()
                    }
                });

        })
    
    // response.send(result)
    // response.render('getdata')
    app.get('/ad', (req,res)=>{
        res.render('ad')
})

app.get('/mp', (req,res)=>{
    res.render('marketplace')
})
app.post('/getgoods',(request, response)=>{
    console.log(request.body.name)
    const usernamee=(request.body.name)
    console.log(usernamee)
    usercartModel.find({username: usernamee},(err,result)=>{
        response.send(result)
        console.log(result)
    })
})
 app.listen(PORT, ()=>{console.log(`app is running on port ${PORT}`)})




