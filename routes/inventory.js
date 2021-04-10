var express = require('express');
var router = express.Router();
var pool = require('./api/pool');


router.post('/addInventory',(req,res)=>{

    const body = req.body;
    console.log('bodyyyyy',body);
    
    const qry = `insert into inventory set ?`

    pool.query(qry,body,(err,result)=>{
      if(err)
      {     console.log(err)
          return res.status(400).json([])
      }  
      else
      {
        return res.status(200).json(result)
      }
    })
})


module.exports = router;