const { body } = require("express-validator");

const userCreateValidation = () => {
    return [
        body("name")
            .isString()
            .withMessage("O nome é obrigatório.")
            .isLength({ min: 3 })
            .withMessage("O nome precisa ter no minimo três caracteres."),
        body("email")
            .isString()
            .withMessage("O email é obrigatório.")
            .isEmail()
            .withMessage("Insira um e-mail válido."),
        body("password")
            .isString()
            .withMessage("A senha é obrigatório.")
            .isLength({ min: 5 })
            .withMessage("Insira uma senha com no minimo 5 caracteres."),
        body("confirmPassword")
            .isString()
            .withMessage("A confirmação de senha é obrigatório.")
            .custom((value, { req }) => {
                if (value != req.body.password) {
                    throw new Error("As senhas não são iguais")
                }
                return true;
            })
    ];
};

module.exports = {
    userCreateValidation,
    // loginValidation,
    // UpdateValidation,
}