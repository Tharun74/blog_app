const User = require('../models/user')

async function handleSignup(req, res) {  
  try {
    const { fullname, email, password } = req.body;
    const user = await User.create({
      fullname,
      email,
      password
    });
    if(!user){
      res.send('User already exists');
    }
    res.redirect('/');
  }
  catch (error) {
    console.error("Error in signup : ",error);
    res.status(500).send(error.message);
  }
}

async function handleSignin(req,res){
  try{
  const {email,password} = req.body;
  const token = await User.matchPassword(email,password);
  console.log(token);
  res.cookie(token,token).redirect('/'); 
  }
  catch(error){
    console.error('Error in signin : ',error.message);
    res.render('signin',{
      error : "Incorrect Email or Password"
    })
  }
}

module.exports = { handleSignup,handleSignin };