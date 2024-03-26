const User = require("../models/user");
const SuccessResponse = require("../utils/common/SuccessResponse");
const ErrorResponse = require("../utils/common/ErrorResponse");
const StatusCodes = require("http-status-codes");
const { options } = require("../utils/common/cookieHelper");
const sendMail = require("../utils/helper/mailHelper");

async function createUser(req, res) {
  try {

    console.log(req.body);
    const { email, firstName, lastName, password, role } = req.body;

    console.log(email, role);
    var user = await User.findOne({ email: email, role: role });

    console.log("Find user", user);
    if (user) {
      ErrorResponse.error = "User already exists please log in!!";
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    user = await User.create({
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
      role: role,
    });

    console.log(user);

    const token = await user.getJWTToken();
    user.password = undefined;
    SuccessResponse.message = "User created successfully";
    SuccessResponse.data = user;

    console.log(token);
    res.cookie("token", token, options);
    res.header("accessToken", token);

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

async function login(req, res) {
  try {
    console.log("Inside login controller");
    console.log(req);
    const { email, password, role } = req.body;

    const user = await User.findOne({ email, role }).select("+password");

    if (!user) {
      ErrorResponse.error = "User doesn't exist, please create a account!";
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if (await user.isValidatePassword(password)) {
      const token = await user.getJWTToken();
      user.password = undefined;

      res.cookie("token", token, options);
      res.header("accessToken", token);

      SuccessResponse.message = "Successfully logged in!";
      SuccessResponse.data = user;

      return res.status(StatusCodes.OK).json(SuccessResponse);
    } else {
      ErrorResponse.error = "Invalid Password, please try again !";
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

async function logout(req,res){
    try{
        res.cookie("token", null , {
            expires: new Date(Date.now()),
            httpOnly: true,
        });

        res.header("accessToken", null);


        SuccessResponse.message = "Successfully logged out!";
        SuccessResponse.data = "";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(error){
        ErrorResponse.error = error;
        return res.status(StatusCodes.OK).json(ErrorResponse);
    }

}

async function forgotPassword(req,res){
  try{
    const {email, role} = req.body;

    const user = await User.findOne({email, role});

    if(!user){
      ErrorResponse.error = "User not found, please create an account";
      return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
    }

    const forgotToken  = await user.getForgotToken();

    await user.save({ validateBeforeSave: false });

    const url =  process.env.HOST_PATH + "/" + "reset-password/"+forgotToken;

    const subject = "Forgot password";

    const msg = "Below is the url for resetting your password\n" + url; 

    await sendMail(email, subject, msg);

    SuccessResponse.message = "Successfully sent reset password link to the email";
    SuccessResponse.data = "";

    return res.status(StatusCodes.OK).json(SuccessResponse);
  }

  catch(error){
    console.log(error);
    ErrorResponse.error = error.message;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }

}

async function resetPassword(req,res){
  try{
    const forgotToken = req.params.token;
    const {password} = req.body;

    const user = await User.findOne({forgotPasswordToken: forgotToken});

    if(!user){
      ErrorResponse.error = "Invalid reset password request";
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if(user.forgotPasswordExpiry < Date.now()){
      ErrorResponse.error = "Time to reset the password is expired!";
      return res.status(StatusCodes.REQUEST_TIMEOUT).json(ErrorResponse);
    }

    user.password = password;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;

    await user.save();

    const jwtToken = user.getJWTToken();

    res.cookie("token", jwtToken, options);

    res.header("accessToken", jwtToken);


    SuccessResponse.message = "Successfully reset the password for user";
    SuccessResponse.data = user;

    return res.status(StatusCodes.OK).json(SuccessResponse);

  }
  catch(error){
    ErrorResponse.error = error.message;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}



module.exports = {
  createUser,
  login,
  logout,
  forgotPassword,
  resetPassword
};
