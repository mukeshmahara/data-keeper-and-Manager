const axios = require('axios');




exports.homeRoutes = (req,res)=>{
    //Making a get request call to api/users
    axios.get('http://localhost:3000/api/users').then(response=>{
        
        res.render('index',{title:"home",users:response.data});
    }).catch(err=>{
        res.send(err);
    })
    // axios.get('http://localhost:3000/api/users').then(function(response){
        
    //     res.render('index',{title:"home",users:response.data});
    // }).catch(err=>{
    //     res.send(err);
    // })
    // res.render('index',{title:"home"});
}

exports.addUser =(req,res)=>{
    res.render('adduser',{title:"add User"});
}

exports.updateUser = (req,res)=>{
    axios.get('http://localhost:3000/api/users',{params :{id:req.query.id}})
    
    .then(userdata=>{
        res.render('update_user',{title:"update User",user:userdata.data});
    })
    .catch(err=>{
        res.send(err);
    })
    // res.render('update_user',{title:"update User"});
};