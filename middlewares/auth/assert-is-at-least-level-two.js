function assertIsAtLeastLevelTwo(req, res, next) {
    if (res.locals.user.level > 2) {
        res.redirect("/");
    } else {
        next();
    }
}

module.exports = assertIsAtLeastLevelTwo;
