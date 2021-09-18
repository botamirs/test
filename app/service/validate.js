const Validator = require("fastest-validator");
const v = new Validator({
    messages: {
        email: "ایمیل معتبر نیست",
        emailEmpty: "ایمیل نمیتواند خالی باشد",
        stringMin: `کلمه عبور باید بیشتر از 6 کاراکتر باشد {actual}`,
        equalField: "تکرار کلمه عبور یکسان نیست"
    }
});

const createSchema = {
    email: {type: "email", min: 6, max: 200},
    pass: "string|min:6",
    confirmPass: {type: "equal", field: "pass"} 
}


const loginSchema = {
    email: {type: "email", min: 6, max: 200},
    pass: "string|min:6",
}


const validRegister = v.compile(createSchema);
const validLogin = v.compile(loginSchema);

module.exports = (userObject, howSchema = 0) => {
    const errors = [];
    const schema = howSchema == 1 ? validLogin : validRegister;

    const validate = schema(userObject);

    if(validate !== true) {
        validate.forEach(element => {
            errors.push(element.message);
        });
        return errors;
    }

    return validate
}