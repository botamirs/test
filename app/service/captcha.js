const axios = require('axios').default;

module.exports = async (captchaResponse, remoteIp) => {
    try {
        if(!captchaResponse) throw err;
    
        const CAPTCHA_SECRET = process.env.CAPTCHA_SECRET;
        const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${CAPTCHA_SECRET}&response=${captchaResponse}&remoteip=${remoteIp}`;
    
        const response = await axios.post(verifyUrl, {
            method: "POST",
            Headers: {
                Accept: "application/json",
                "content-Type": "application/x-www-from-urlencoded; charset=uft-8"
            }
        });
    
        return response.data;
    } catch (err) {
       return {success: false, err}
    }

}