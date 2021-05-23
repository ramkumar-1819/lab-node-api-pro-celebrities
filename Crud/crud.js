const express=require('express');
const router=express.Router();
const ObjectId=require('mongoose').Types.ObjectId;
const {Celebrities}=require('../model/model');
//Getting the details of celebrities
router.get('/',(req,res)=>{
    Celebrities.find((err,docs)=>{
        if(err){
            res.status(500).send({ errorMessage: "The celebrities information could not be retrieved." })
        }
        res.send(docs)
    })
})
//Posting the celebrities details
router.post('/',(req,res)=>{
    const newCelebrities=new Celebrities({
        name:req.body.name,
        occupation:req.body.occupation,
        catchphrase:req.body.catchphrase
    })
    newCelebrities.save((err,docs)=>{
        if(err){
            if(err.name==="ValidationError"){
                res.status(400).send({ errorMessage: "name,occupation,catchphrase needed in the body" })
            }
            else{
               res.status(500).send({errorMessage: "The celebrities information could not be posted." })
            }
        }
        res.send(docs)
    })
})
//Getting the particular celebrities details by id
router.get('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(404).send({ message: "The user with the specified ID does not exist." })
    }
    Celebrities.findById(req.params.id,(err,docs)=>{
        if(err){
            res.status(404).send({ message: "The user with the specified ID does not exist." })
        }
        res.send(docs)
    })
})
//Updating the celebrities details
router.put('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(404).send({ message: "The user with the specified ID does not exist." })
    }
    const updateCelebrities={
        name:req.body.name,
        occupation:req.body.occupation,
        catchphrase:req.body.catchphrase
    }
    Celebrities.findByIdAndUpdate(req.params.id,{$set:updateCelebrities},{new:true},(err,docs)=>{
        if(err){
           res.status(500).send({errorMessage: "The celebrities information could not be updated." })
        }
        else{
            res.send(docs)
        }
    })
})
//Deleting the celebrities
router.delete('/:id/delete',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(404).send({ message: "The user with the specified ID does not exist." })
    }
    Celebrities.findByIdAndRemove(req.params.id,(err,docs)=>{
        if(err){
            res.status(500).send({errorMessage: "The celebrities information could not be posted." })
        }
        res.send(docs)
    })
})
module.exports=router