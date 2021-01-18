const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");

// VIEW ENGINE CONFIG
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.listen(3000, () => {
    console.log("Servidor funcionando");
});

/// APPLY VIEWS VARIABLES AND FUNCTIONS TO DO ACOMODAR?????
app.locals.user = null;

// MIDDLEWARES
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.urlencoded());
app.use(session({ secret: "un edificio propio" }));
const authenticate = require("./middlewares/auth/authenticate");

app.use(authenticate);

const authRouter = require("./routes/auth-router");

app.get("/", (req, res) => {
    res.render("index")
})

app.use("/auth", authRouter)