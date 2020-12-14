import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@proshop.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Tony',
        email: 'tony@proshop.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Hanru',
        email: 'hanru@proshop.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Shining',
        email: 'shining@proshop.com',
        password: bcrypt.hashSync('123456', 10),
    },
]

export default users