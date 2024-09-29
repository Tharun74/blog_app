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
    console.error("Signup error:", error);
    res.status(500).send("Error during signup");
  }
}

async function handleSignin(req,res){
  try{
  const {email,password} = req.body;
  const user = await User.matchPassword(email,password);
  console.log(user);
  res.redirect('/');  
  }
  catch(error){
    console.error('Error in signin : ',error.message);
    res.status(400).send(error.message);
  }
}

module.exports = { handleSignup,handleSignin };