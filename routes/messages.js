import express from 'express';

const router = express.Router();

router.get("/",(req,res)=>{
    return res.status(200).send("Get all messages");
})
router.get("/:id",(req,res)=>{
    return res.status(200).send("Get message by id");
})

export default router;
