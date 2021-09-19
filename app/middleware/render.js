module.exports = (app) => {
    app.use((req, res, next) => {    
        const errors =  req.flash("errors");
        const success = req.flash("success");
        const hasError = errors.length > 0;
        let user = null;

        if("user" in req.session) {
            user = req.session.user;
        }

        res.userRender = (template, option) => {
            option = {...option, errors, success, hasError}
            res.render(template, option);
        }
       
        res.adminRender = (template, option) => {
            option = {...option, errors, success, hasError, fullName: user.fullname}
            res.render(template, option);
        }
        next();
    });
}