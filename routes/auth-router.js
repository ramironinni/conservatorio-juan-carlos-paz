const express = require("express");
const router = express.Router();
const {check} = require("express-validator");

const multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/products");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});
var upload = multer({ storage: storage });


const authController = require("../controllers/auth-controller")

router.get("/login", authController.showLogin);
router.post("/login",
    [
        check("email")
            .isEmail()
            .withMessage("Debe ser un email válido"),
        check("password")
            .not().isEmpty()
            .withMessage("Debe introducir la contraseña")
    ] , authController.login);
router.get("/register", authController.showRegister);
router.post("/register", upload.single("photo"), authController.register);

module.exports = router;