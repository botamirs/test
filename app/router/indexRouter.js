const userRouter = require("./userRouter");
const user = require("@ctrl/user");
const auth = require  ("@middleware/auth");
const guest = require("@middleware/guest");


module.exports = (app) => {
    app.get("/panel", auth, (req, res) => res.send(req.session));
    app.get("/user/logout", user.logout);
    app.use("/user", guest, userRouter);
}