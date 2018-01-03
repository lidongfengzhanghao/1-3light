var light=require("ueklight");
var router=light.Router();
var mysql=require('./mysql');
router.get("/",function(req,res){
    res.render("index.html",{name:"light"});
})
router.get('/fetch',function(req,res){
    mysql.query(`select * from student`,function(err,data){
        if(err){
            res.end('err');
        }else{
            res.send(JSON.stringify(data));
        }
    })
})
router.get('/addCon',function(req,res){
    var name=req.query.name;
    var sex=req.query.sex;
    var age=req.query.age;
    mysql.query(`insert into student (name,sex,age) values ('${name}','${sex}','${age}')`,function(err,data){
        if(err){
            res.end('err');
        }else{
            res.send('ok');
        }
    })

})
router.get('/del/:id',function(req,res){
    var id=req.query.id;
    mysql.query('delete from student where id='+id,function(err,data){
        if(err){
            res.end('err');
        }else{
            res.send('ok');
        }
    })
})
router.get('/query/:id',function(req,res){
    var id=req.query.id;
    mysql.query('select * from student where id='+id,function (err, data){
        if(err){
            res.end('err');
        }else{
            res.send(JSON.stringify(data));
        }
    })
})
router.get('/updateCon',function(req,res){
    var name=req.query.name;
    var sex=req.query.sex;
    var age=req.query.age;
    var id=req.query.id;
    mysql.query(`update student set name='${name}',sex='${sex}',age='${age}' where id=`+id,function(err,data){
        if(err){
            res.end('err');
        }else{
            res.send('ok');
        }
    })
})