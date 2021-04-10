var express = require('express');
var router = express.Router();
var pool = require('./api/pool');
var upload = require('./api/multer');
const { json } = require('express');

// insert data query //
router.post('/accessoriesData',upload.single('image'),(req, res)=>{
    console.log('req.bodyyyyyyyyyy',req.body);
    
    pool.query('insert into accessories(console_type_id,model_name,description,price,stock,rented,image,rent,offer,offertype) values(?,?,?,?,?,?,?,?,?,?)',[req.body.console_type_id, req.body.model_name, req.body.description, req.body.price,req.body.stock, req.body.rented, req.file.filename,req.body.rent,req.body.offer,req.body.offertype],(err, result)=>{
           if(err){
               console.log(err);
               return res.status(400).json(err)
           }
            else{
                return res.status(200).json({result})
            }
        })
    
        
})

// show the display data query
router.get('/accessoriesDispaly',function(req, res){
    pool.query('select * from accessories',function(err, result){
        if(err){
            return res.status(400).json({status:false,err})
        }
         else{
             return res.status(200).json({status:true,result})
         }
    })
})

// delete query
router.delete('/accessoriesDelete/:accessoriesId',function(req, res){
    pool.query('delete from accessories where accessoriesId=?',[req.params.accessoriesId],function(err, result){
        if(err){
            console.log(err);
            return res.status(400).json({status:false,err})
        }
         else{
             return res.status(200).json({status:true,result})
         }
    })
})



router.post('/update/:id',upload.single('image'),(req,res)=>{
    
        if (req.body.image != "") {
            qry =
              "update accessories set console_type_id=?,model_name=?,description=?,price=?,stock=?,rented=?,image=? where accessoriesId=?";
            para = [
              req.body.console_type_id, req.body.model_name, req.body.description, req.body.price,req.body.stock, req.body.rented, req.file.filename ,req.params.id
            ];
          }
          else{
            qry =
            "update accessories set console_type_id=?,model_name=?,description=?,price=?,stock=?,rented=? where accessoriesId=?";
          para = [
            req.body.console_type_id, req.body.model_name, req.body.description, req.body.price,req.body.stock, req.body.rented,req.params.id
          ];
          }
          pool.query(qry, para, function (err, result) {
            if (err) {
                return res.status(400).json({status:false,err})
            } else {
                return res.status(200).json({status:true,result})
            }
          });
         }) 


         router.post('/displaybyid',(req,res)=>{
            console.log('req.body',req.body);
            
            pool.query('select * from accessories where console_type_id=?',[req.body.console_type_id],(err,result)=>{
                if(err)
                {   console.log(err);    
                  return  res.status(400).json([])
                }
                else
                {
                    return  res.status(200).json(result)
                }
            })
        })      


        
router.get('/displayForStock',(req,res)=>{
    pool.query("select ac.*,(select count(i.accessoriesId) from inventory i where i.accessoriesId=ac.accessoriesId) as stock ,(select count(i.accessoriesId) from inventory i where i.status='rentable' and i.accessoriesId =ac.accessoriesId) as rentable ,(select count(i.accessoriesId) from inventory i where i.status='nonrentable' and i.accessoriesId=ac.accessoriesId) as nonrentable from accessories ac;" ,(err,result)=>{
        
        if(err){
            return res.status(400).json({status:false,err})
        }
        else
        {
            console.log('dataaaaaaaa',result);
            
            return res.status(200).json({status:true,result})
        } 
    })
})



module.exports = router ;