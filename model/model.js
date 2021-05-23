const mongoose=require('mongoose'),Schema=mongoose.Schema;
//defining the schema
const details=new Schema({
    name:{type:String,required:true},
    occupation:{type:String,required:true},
    catchphrase:{type:String,required:true}
})
//making the model
const Celebrities=mongoose.model("Celebrities",details);
module.exports={Celebrities};