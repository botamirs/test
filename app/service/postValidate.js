const Validator = require("fastest-validator");
const v = new Validator({
    messages: {
        stringEnum: "وضعیت فقط میتواند خصوصی یا عمومی باشد",
        stringMin: `باید بیشتر از 6 کاراکتر باشد {field}`,
    }
});

const postSchema = {
    title: {type: "string", trim: true, min: 6, max: 150, messages: {
        stringMin: "عنوان کوتاه است حداقل 6 کاراکتر باشد",
        stringMax: "عنوان طولانی است حداکثر 150 کاراکتر"
    }},
    body: {type: "string",min:6},
    status: {type: "string", enum: ["public", "private"]} 

};

const postValid = v.compile(postSchema);

module.exports = (postObject) => {
    const errors = [];

    const schema = postValid;

    const validate = schema(postObject);
    if(validate !== true) {
        validate.forEach(element => {
            errors.push(element.message);
        });
        return errors;
    }

    return validate
}