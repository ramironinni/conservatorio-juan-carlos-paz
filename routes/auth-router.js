const express = require("express");
const router = express.Router();
const path = require("path");

const {check} = require("express-validator");
const { body } = require('express-validator');
const isSignedIn = require("../middlewares/auth/assert-signed-in");
const isAdmin = require("../middlewares/auth/assert-is-admin");
const isAtLeastLevelTwo = require("../middlewares/auth/assert-is-at-least-level-two");

const multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/users");
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
router.get("/login/:motive?", authController.showLoginMotive)
router.get("/register", isSignedIn, isAdmin, authController.showRegister);
router.post("/register", upload.single("photo"), authController.register);

module.exports = router;