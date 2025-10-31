// utils/seedAdmin.js
import 'dotenv/config';
import {connectDb} from '../config/db.js';
import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs';

const createAdmin = async () => {
    await connectDb();
    const existing = await User.findOne({email: 'admin@local'});
    if(existing) {console.log('admin exists'); process.exit();} 
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
        name: 'Admin',
        email: 'admin@local',
        password: hashedPassword,
        role: 'admin'
    });

    console.log('admin created: admin@local / admin123');
    process.exit();

};

createAdmin();

//run this in terminal once only - node utils/seedAdmin.js, it will create an admin user
