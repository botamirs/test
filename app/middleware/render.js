module.exports = (app) => {
    app.use((req, res, next) => {    
        const errors =  req.flash("errors");
        const hasError = errors.length > 0;
        let user = null;

        if("user" in req.session) {
            user = req.session.user;
        }

        res.userRender = (template, option) => {
            option = {...option, errors, hasError}
            res.render(template, option);
        }
       
        res.adminRender = (template, option) => {
            option = {...option, errors, hasError, fullName: user.fullname}
            res.render(template, option);
        }
        next();
    });
}