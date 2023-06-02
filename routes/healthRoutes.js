import express from 'express';
const router = express.Router();


  

router.get("/",async(req,res)=>{
    try{
      const response=await fetch("http://qts.iitkgp.ac.in/last/gail/current/2000");
          const result = await response.json();
          console.log(result) ;
          res.status(200).json({health_data:result});
          console.log("in health");
    }catch(e){
      res.status(400).json({msg:e});
    }
  }
  );


export default router;