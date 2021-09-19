const posts = require("@model/postModel");
const { formatDate } = require("@service/jalali");

module.exports.dashboard = async (req, res) => {
    const userPost = await posts.find({ user: req.session.user._id });
    res.adminRender("admin/dashboard", {
        pageTitle: "داشبورد",
        posts: userPost,
        formatDate
    });
}
module.exports.createPost = async (req, res) => {
    try {
        console.log(req.body);
        const user = await posts.create({...req.body, user: req.session.user._id});
        res.redirect("/dashboard");
    } catch (err) {
        console.log(err);
    }
}