const multer = require("multer");
const uuid = require("uuid").v4;
const sharp = require("sharp");

const posts = require("@model/postModel");
const { formatDate } = require("@service/jalali");
const postValidate = require("@service/postValidate");

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
        const validate = postValidate(req.body);
        if(validate !== true) throw validate;

        await posts.create({...req.body, user: req.session.user._id});

        res.redirect("/dashboard");
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/dashboard/add-post");
     }
}


exports.getEditPost = async (req, res) => {
    const post = await posts.findOne({_id: req.params.id});

    if(!post) {
        return res.redirect("/dashboard");
    }

    if(post.user.toString() !== req.session.user._id) {
        return res.redirect("/dashboard");
    } else {
        res.adminRender("admin/editPost", {
            pageTitle: "داشبورد",
            post
        });
    }
    
}

exports.editPost = async (req, res) => {

    const post = await posts.findOne({_id: req.params.id});

    try {
        if(!post) return res.redirect("/dashboard");

        if(post.user.toString() !== req.session.user._id) {
            return res.redirect("/dashboard");
        }
        
        const validate = postValidate(req.body);
        if(validate !== true) throw validate;
        
        const { title, status, body} = req.body;

        post.title = title;
        post.status = status;
        post.body = body;

        await post.save();
        return res.redirect("/dashboard");
        
    } catch (err) {
        req.flash("errors", err);
        return res.redirect(`/dashboard/edit-post/${post._id}`);
    }
}

exports.deletePost = async (req, res) => {
    try {
        await posts.findByIdAndDelete(req.params.id);
        res.redirect("/dashboard");
    } catch (err) {
        res.redirect("/dashboard")
    }
}
exports.uploadImage = (req, res) => {
    // const storage = multer.diskStorage({
    //     destination: (req, file, cb) => {
    //         cb(null, "./public/uploads/");
    //     },
    //     filename: (req, file, cb) => {
    //         cb(null, `${uuid()}_${file.originalname}`);
    //     },
    // });

    const fileFilter = (req, file, cb) => {
        if (file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb("تنها پسوند JPEG پشتیبانی میشود", false);
        }
    };

    const upload = multer({
        limits: { fileSize: 4000000 },
        // dest: "uploads/",
        // storage: storage,
        fileFilter: fileFilter,
    }).single("image");

    upload(req, res, async (err) => {
        if (err) {
            if (err.code === "LIMIT_FILE_SIZE") {
                return res.status(400).send("حجم فایل ارسالی نباید بیشتر از 4 مگابایت باشد");
            }
            res.send(err);
        } else {
            if (req.file) {
                const fileName = `${uuid()}_${req.file.originalname}`;
                await sharp(req.file.buffer).jpeg({
                    quality: 60,
                }).toFile(`./public/uploads/${fileName}`)
                .catch(err => { console.log(err)});

                res.status(200).send("آپلود عکس موفقیت آمیز بود");
            } else {
                res.send("جهت اپلود باید عکسی انتخاب کنید");
            }
        }
    });
};