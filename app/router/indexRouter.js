const userRouter = require("./userRouter");
const adminRouter = require("./adminRouter");

const user = require("@ctrl/user");
const auth = require  ("@middleware/auth");
const guest = require("@middleware/guest");

module.exports = (app) => {
    app.use("/dashboard", auth, adminRouter);
    app.get("/user/logout", user.logout);
    app.use("/user", guest, userRouter);
}