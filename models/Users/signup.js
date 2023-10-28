import bcrypt from "bcrypt";
import validator from "validator";

async function signup(email, password){
    //email and password validation
    if(!email || !password)
        return [ {fields: ["email", "password"], message:"All fields must be filled"} , null];

    if(!validator.isEmail(email))
        return [ {fields: ["email"], message:"Email is not valid"} , null];

    //Strong password must conatain capital, small, and special character and number    
    if(!validator.isStrongPassword(password))
        return [ {fields: ["password"], message:"Password is not strong enough"} , null];

    const exists = await this.findOne({ email });
    if(exists)
        return [ {fields: ["email"], message:"Email already in use, please login"} , null];

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    //creating user in collection
    const user = await this.create({ email, password: hash});

    return [null, user];
}

export default signup;