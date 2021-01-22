const {render}= require('ejs');
const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.get('/login',(req, res)=> res.render('login'));

router.get('/register',(req, res)=> res.render('register'));

router.post('/register', (req , res)=>{
 const{ name, email, password, password2 }= req.body;
let errors= [];

if(!name|| !email || !password || !password2){
    errors.push({ msg: 'please fill in all the fields'});
}

if(password !== password2){
    errors.push({ msg: 'password do not match'})
}

if(password.length < 6){
    errors.push({ msg: 'password should be atleeast 6 characters'});
}
 if(errors.length > 0){
res.render('register',{
errors,
name,
email,
password,
password2
});
 }

 else{
User.findOne({email: email})
.then( user =>{
    if(user){
        errors.push({msg: 'Already exits'})
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        })
    }
    else{
        const newUser = new User({
            name,
            email,
            password
        })
        newUser.save()
        .then(user =>{
            res.redirect('/users/login')
        })
        .catch(err => console.log(err))
    }
})
.catch( err => console.log(err))
}

} )
router.post('/login', (req,res) =>{
    const { email , password}= req.body

    let errors = []

    if(!email || !password ){
        errors.push({msg: 'Please fill in all fields!'})
    }

    if(password.length <6){
        errors.push({msg: 'Passwords should be atleast 6 characters'})
    }

    if(errors.length >0){
        res.render('login',{
            errors,
            email,
            password
        })
    }
    else{
       // Validation passed
       
       User.findOne( { email: email })
       .then( user =>{
           if(user){
               if(password == user.password){
                   res.redirect('/index')
               }
               else{
                   errors.push({msg: 'Invalid password'})
                   res.render('login',{
                    errors,
                    email,
                    password
                  })
               }
           }
           else{
            errors.push({msg: 'User not found'})
            res.render('login',{
             errors,
             email,
             password
           })
           }
       })
       .catch( err => console.log(err))
    }

} )


module.exports = router