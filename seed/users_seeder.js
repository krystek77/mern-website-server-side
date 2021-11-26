import User from '../models/users.js';
import bcrypt from 'bcryptjs'

export default async ()=>{

    const admin_password = await bcrypt.hash("admin",10);
    const admin = new User({
        firstName:"Krystian",
        lastName:"Wrona",
        email:"admin@gmail.pl",
        createdAt:Date.now(),
        password:admin_password,
        selectedImage:"",
        role:"admin"
    });

    const user_password = await bcrypt.hash("user",10);
    const user= new User({
        firstName:"Ewelina",
        lastName:"Wrona",
        email:"user@gmail.pl",
        createdAt:Date.now(),
        password:user_password,
        selectedImage:"",
        role:"user"
    });

    const existingAdmin = await User.findOne({email:admin.email});
    const existingUser = await User.findOne({email:user.email});
    if(existingAdmin) return;
    if(existingUser) return;
    await admin.save();
    await user.save();
}