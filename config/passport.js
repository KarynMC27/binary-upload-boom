// const passport = require("passport"); //new
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          // Find the user by email
          const user = await User.findOne({ email: email.toLowerCase() });
          if (!user) {
            return done(null, false, { msg: `Email ${email} not found.` });
          }
  
          if (!user.password) {
            return done(null, false, {
              msg:
                "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
            });
          }
          user.comparePassword(password, (err, isMatch) => {
            if (err) {
              return done(err);
            }
            if (isMatch) {
              return done(null, user);
            }
            return done(null, false, { msg: "Invalid email or password." });
          });
          // return done(null, user); // Successful authentication
        } catch (err) {
          return done(err); // Handle errors
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
  }


// const crypto = require(`crypto`);

// module.exports = function (passport) {
//   passport.use(
//     new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
//       try {
//         // Find user by email
//         const user = await User.findOne({ email: email.toLowerCase() });

//         // If user is not found
//         if (!user) {
//           return done(null, false, { msg: `Email ${email} not found.` });
//         }

//         // If the user does not have a password
//         if (!user.password) {
//           return done(null, false, {
//             msg:
//               "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
//           });
//         }

//         // Use a promise to wrap the comparePassword callback
//         const isMatch = await new Promise((resolve, reject) => {
//           user.comparePassword(password, (err, isMatch) => {
//             if (err) return reject(err);
//             resolve(isMatch);
//           });
//         });

//         // If password matches
//         if (isMatch) {
//           return done(null, user);
//         }

//         // If password doesn't match
//         return done(null, false, { msg: "Invalid email or password." });
//       } catch (err) {
//         // Catch any errors and pass them to done
//         return done(err);
//       }
//     })
//   );
// };


// module.exports = function (passport) {
//   passport.use(
//     new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
//       try {
//         // Find user by email
//         const user = await User.findOne({ email: email.toLowerCase() });

        // If user is not found
        // if (!user) {
        //   return done(null, false, { msg: `Email ${email} not found.` });
        // }

        // If the user does not have a password
        // if (!user.password) {
        //   return done(null, false, {
        //     msg:
        //       "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
        //   });
        // }

        // // Compare password
        // user.comparePassword(password, (err, isMatch) => {
        //             if (err) {
        //               return done(err);
        //             }
        //             if (isMatch) {
        //               return done(null, user);
        //             }
        //             return done(null, false, { msg: "Invalid email or password." });
        //           });
                  // .catch(err => {
                  //             return done(err);
                  //           });
        


        // If password matches
        // if (isMatch) {
        //   return done(null, user);
        // }

        // If password doesn't match
        // return done(null, false, { msg: "Invalid email or password." });
//       } catch (err) {
//         // Catch any errors and pass them to done
//         return done(err);
//       }
//     })
//   );
// };

// module.exports = function (passport) {
//   passport.use(
//     new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
//       User.findOne({ email: email.toLowerCase() })
//         .then(user => {
//           if (!user) {
//             return done(null, false, { msg: `Email ${email} not found.` });
//           }
//           if (!user.password) {
//             return done(null, false, {
//               msg:
//                 "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
//             });
//           }

//           return user.comparePassword(password); // Assume this returns a promise
//         })
//         .then(isMatch => {
//           if (isMatch) {
//             return done(null, user);
//           }
//           return done(null, false, { msg: "Invalid email or password." });
//         })
//         .catch(err => {
//           return done(err);
//         });
//     })
//   );
// };



// module.exports = function (passport) {
//   passport.use(
//     new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
//       User.findOne({ email: email.toLowerCase() }, (err, user) => {
//         if (err) {
//           return done(err);
//         }
//         if (!user) {
//           return done(null, false, { msg: `Email ${email} not found.` });
//         }
//         if (!user.password) {
//           return done(null, false, {
//             msg:
//               "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
//           });
//         }
//         user.comparePassword(password, (err, isMatch) => {
//           if (err) {
//             return done(err);
//           }
//           if (isMatch) {
//             return done(null, user);
//           }
//           return done(null, false, { msg: "Invalid email or password." });
//         });
//       });
//     })
//   );

  // passport.serializeUser((user, done) => {
  //   done(null, user.id);
  // });

 

  
  

  // passport.deserializeUser(async (id, done) => {
  //   try{
  //     const user = await User.findById(id)
  //     done(null, user)
  //   }catch (err) {
  //     done(err)
  //   }
  // });



// passport.use(new LocalStrategy(function verify(username, password, cb) {
//   db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, row) {
//     if (err) { return cb(err); }
//     if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }
    
//     crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
//       if (err) { return cb(err); }
//       if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
//         return cb(null, false, { message: 'Incorrect username or password.' });
//       }
//       return cb(null, row);
//     });
//   });
// }));

// router.post('/login/password', passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/login'
// }));

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//       if (!user.verifyPassword(password)) { return done(null, false); }
//       return done(null, user);
//     });
//   }
// ));