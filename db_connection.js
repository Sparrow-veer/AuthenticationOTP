const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/AuthenticationDB",{ useNewUrlParser: true,useUnifiedTopology: true  });

const DBschema=new mongoose.Schema({
    UserId:String,
    Code:String
    });

const AuthenticationSchema=mongoose.model("code",DBschema);

module.exports=AuthenticationSchema;
    