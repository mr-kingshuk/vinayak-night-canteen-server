import bcrypt from "bcrypt";

async function login(email, password){
    //email and password validation
    if(!email || !password)
        throw Error("All fields must be filled");

    //as user has already signed up, so the email must be valid and password must be strong
    const user = await this.findOne({ email });
    if(!user)
        throw Error(`Email doesn't exists`)

    //comparing hashed password
    const match = await bcrypt.compare(password, user.password);
    if(!match)
        throw Error('Incorrect Password')
    
    return user;    
}

export default login;