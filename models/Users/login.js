import bcrypt from "bcrypt";

async function login(email, password){
    //email and password validation
    if(!email || !password)
        return [ {fields: ["email", "password"], message:"All fields must be filled"} , null];

    //as user has already signed up, so the email must be valid and password must be strong
    const user = await this.findOne({ email });
    if(!user)
        return [ {fields: ["email"], message:"Email doesn't exists"} , null];

    //comparing hashed password
    const match = await bcrypt.compare(password, user.password);
    if(!match)
        return [ {fields: ["password"], message:"Password doesn't match"} , null];
    
    return [null, user];    
}

export default login;