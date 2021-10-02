const { Router } = require("express");
const router = new Router();

const admin = require("@ctrl/admin");

router.get("/", admin.dashboard);

router.get("/add-post", (req, res) => {
    res.adminRender("admin/addPost", {pageTitle: "ساخت پست جدید"});
});
router.get("/edit-post/:id", admin.getEditPost);
router.post("/edit-post/:id", admin.editPost);

router.get("/delete-post/:id", admin.deletePost);

router.post("/image-upload", admin.uploadImage);
router.post("/add-post", admin.createPost);
module.exports = router;