const User = require('../models/user')

async function handleSignup(req, res) {  
  try {
    const { fullname, email, password } = req.body;
    await User.create({
      fullname,
      email,
      password
    });
    res.redirect('/');
  }
  catch (error) {
    console.error("Signup error:", error);
    res.status(500).send("Error during signup");
  }
}

module.exports = { handleSignup };