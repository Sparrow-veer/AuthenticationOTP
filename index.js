const { request } = require('express');
const express=require('express');
const app=express();
const fast2sms = require('fast-two-sms')
const otpGenerator = require('otp-generator')
const DB=require('./db_connection');

require('dotenv').config();


app.get("/GetCode/:number",async (req,res)=>{
    var otp=otpGenerator.generate(6, { digits:true,upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets:false });
    var options = {authorization : process.env.API_KEY , message :otp ,  numbers : [req.params.number]} 
    const result=await fast2sms.sendMessage(options)
    const record=await DB.findOne({UserId:req.params.number});
    if(record)
    {
        await DB.updateOne({$set: { Code: otp }});
    }
    else
    {
        const newuser=new DB({
            UserId:req.params.number,
            Code:otp
          });
          newuser.save();
    }
    res.status(201).send(result);
})

app.get("/Authenticate/:number/:code",async(req,res)=>{
    const record=await DB.findOne({UserId:req.params.number});
    console.log(record);
    var status="";
    var flag;
    if(record && record.Code==req.params.code)
    {
        status="Succesfully Authenticated";
        flag=true;
    }
    else{
        status="Error: Wrong Code";
        flag=false;
    }
    res.status(flag?200:404).send(status);
})


app.listen(5000,()=>{
    console.log("listening at 5000");
})