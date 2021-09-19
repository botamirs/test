const { Router } = require("express");
const router = new Router();

const admin = require("@ctrl/admin");

router.get("/", admin.dashboard);

router.get("/add-post", (req, res) => {
    res.adminRender("admin/addPost", {pageTitle: "ساخت پست جدید"});
});

router.post("/add-post", admin.createPost);
module.exports = router;