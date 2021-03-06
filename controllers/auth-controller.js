const getFromDB = require("../utils/getFromDB");
const getOneFromDB = require("../utils/getOneFromDB");
const getLastId = require("../utils/getLastId");
const saveInDB = require("../utils/saveInDB");
const editInDB = require("../utils/editInDB");
const deleteFromDB = require("../utils/deleteFromDB");

const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");


const authController = {
    showLogin: (req,res) => {
        if (res.locals.user) {
        res.redirect("/");
        } else {
            res.render("auth/login");
        }

    },
    showLoginMotive: (req, res) => {
        if (req.params.motive == "invalidLogin") {
            const message = "El email y/o la contraseña no son correctos";
            res.render("auth/login", {message})
        }
    },
    login: (req,res) => {
        
        let errors = validationResult(req);

        if (!errors.isEmpty()) {

            const errorsEmail = errors.errors.filter(
                (error) => error.param == "email"
            );

            let errorsEmailMessage;

            if (errorsEmail != "") {                
                errorsEmailMessage = errorsEmail[0].msg;
            }

            const validEmail = req.body.email;

            const errorsPassword = errors.errors.filter(
                (error) => error.param == "password"
            );

            let errorsPasswordMessage;

            if (errorsPassword != "") {                
                errorsPasswordMessage = errorsPassword[0].msg;
            }
            
            return res.render("auth/login", {
                errorsEmailMessage,
                validEmail,
                errorsPasswordMessage                
            });
        }
        
        const users = getFromDB("usersDB");

        const user = users.find((user) => {
            return (
                user.mail == req.body.mail &&
                bcrypt.compareSync(req.body.password, user.password)
            );
        });

        if (!user) {
            return res.redirect("/auth/login/invalidLogin");
        }

        req.session.loggedUserId = user.id;

        res.redirect("/")
    },
    showRegister: (req,res) => {
        res.render("auth/register");
    },
    register: (req,res) => {
        const users = getFromDB("usersDB");

        const newUserId = getLastId(users);

        delete req.body.passwordCheck; //TO DO validar password

        const newUser = {
            id: newUserId,
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10),
            // photo: req.file.filename,
        };

        saveInDB(users, newUser, "usersDB");

        res.redirect("/auth/login")
    },
}

module.exports = authController;