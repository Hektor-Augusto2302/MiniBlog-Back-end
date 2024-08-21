const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: "7d",
    });
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            return res.status(422).json({ errors: ['Este email já está em uso'] });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            _id: newUser._id,
            token: generateToken(),
            message: "Usuario criado com sucesso",
        });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

module.exports = {
    registerUser,
    // registerAdminUser,
    // login,
    // update,
    // getCurrentUser,
    // getUserById,
}