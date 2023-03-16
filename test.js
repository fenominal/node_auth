if (loverEmail || password || cpassword || mobile || fullName) {
    // Check empty value...
    if (loverEmail) {
      // empty email..
      if (password) {
        // Empty password..
        if (cpassword) {
          // Empty conform password.
          if (mobile) {
            // Empty mobile...
            if (valid_email) {
              // check valid email.
              if (loverEmail != logUserEmail) {
                // check enter email and User email is same or not.
                if (!existinguser) {
                  // check alredy used email
                  if (valid_password && valid_cpassword) {
                    // check valid password.
                    if (password == cpassword) {
                      // Check password and comform password is same or not.
                      if (typeof mobile == "number") {
                        // Chek phone is number or not...
                        if (valid_phone) {
                          // Check phone number validation.
                          if (logUserPhone != mobile) {
                            if (Object.keys(existinguserPhone).length === 0) {
                              // Check phone number use by other user or not...
                              const hashedPassword = await bcrypt.hash(
                                password,
                                12
                              );
                              const hashedCPassword = await bcrypt.hash(
                                cpassword,
                                12
                              );
                              const updatedProfile =
                                await users.findByIdAndUpdate(
                                  _id,
                                  {
                                    $set: {
                                      userEmail: loverEmail,
                                      cpassword: hashedCPassword,
                                      password: hashedPassword,
                                      userMobile: mobile,
                                    },
                                  },
                                  { new: true }
                                );
                              res.status(200).json({
                                status: "Success",
                                message: "Profile Update",
                              });
                            } else {
                              res.status(500).json({
                                status: "Fail",
                                message:
                                  "You Are Not Authorize To Perfom This Action...",
                              });
                            }
                          } else {
                            res.status(400).send({
                              status: "Fail",
                              message:
                                "Entered the same Phone used as earlier...",
                            });
                          }
                        } else {
                          res.status(400).send({
                            status: "Fail",
                            message: process.env.INVALID_PHONE,
                          });
                        }
                      } else {
                        res.status(500).json({
                          status: "Fail",
                          message: process.env.NOT_ANUMBER_PHONE,
                        });
                      }
                    } else {
                      res.status(400).send({
                        status: "Fail",
                        message: process.env.PASS_CPASS_MISSMATCH,
                      });
                    }
                  } else {
                    res.status(400).send({
                      status: "Fail",
                      message: process.env.INVALID_PASSWORD,
                    });
                  }
                } else {
                  res.status(400).send({
                    status: "Fail",
                    message: process.env.USER_EXISTE,
                  });
                }
              } else {
                res.status(400).send({
                  status: "Fail",
                  message: process.env.EMAIL_USED,
                });
              }
            } else {
              res
                .status(400)
                .send({ status: "Fail", message: process.env.INVADLI_EMAIL });
            }
          } else {
            return res.status(400).send({
              status: "Fail",
              message: process.env.EMPTY_CONFORM_MOBILE,
            });
          }
        } else {
          return res.status(400).send({
            status: "Fail",
            message: process.env.EMPTY_CONFORM_PASSWORD,
          });
        }
      } else {
        return res.status(400).send({
          status: "Fail",
          message: process.env.EMPTY_PASSWORD,
        });
      }
    } else {
      return res.status(400).send({
        status: "Fail",
        message: process.env.EMPTY_EMAIL,
      });
    }
  } else {
    return res.status(400).send({
      status: "Fail",
      message: process.env.EMPTY_SIGNUP_ALL,
    });
  }