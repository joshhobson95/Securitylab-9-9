const bcrypt = require('bcryptjs');
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        console.log(users[i])
        let existingPassword = bcrypt.compareSync(password, users[i].password)
        if (
          users[i].username === username && existingPassword) {
            let securedUser = {...users[i]}
            delete securedUser.password;
            res.status(200).send(securedUser);
        }

      }
      res.status(400).send("User not found.");
    },
    register: (req, res) => {
      let {username, email, firstName, lastName, password,} = req.body;

     






      const salt = bcrypt.genSaltSync(5);
       password = bcrypt.hashSync(password, salt);


        let userObj = {
         username,
         email,
         firstName,
         lastName,
         password,
         
        };

        users.push(userObj);


        let securedUser = {...userObj}
        delete userObj.password;
        res.status(200).send(securedUser);


    }
}



// mSXuLE5hX6qFcDB

// if ( bcrypt.compareSync(pin, users[i].password)) 
//this checks hashed passwords against userspassword

//almost working but there is some problems with illegal arguments: string, undefined
//Got the user data to get sent back but there is no hashedpassword getting sent back
