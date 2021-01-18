const fs = require("fs");
const path = require("path");

function recordameMiddleware(req, res, next) {
    next();

    if (
        req.cookies.recordame != undefined &&
        req.session.usuarioLogueado == undefined
    ) {
        let usersJSON = fs.readFileSync(
            path.join(__dirname, "../data/usersDB.json")
        );
        let users;
        if (usersJSON == "") {
            users = [];
        } else {
            users = JSON.parse(usersJSON);
        }

        let usuarioALoguearse; // crea la variable, si la creo dentro del for el scope es local y no la puedo usar fuera

        for (let user of users) {
            if (user.username == req.cookie.recordame) {
                usuarioALoguearse = user;
                break;
            }
        }

        req.session.usuarioLogueado = usuarioALoguearse;
    }
}

module.exports = recordameMiddleware;
