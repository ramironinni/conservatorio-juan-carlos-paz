const getFromDB = require("./getFromDB");
const fs = require("fs");
const path = require("path");

const deleteFromDB = function (id, filenameDB) {
    const elements = getFromDB(filenameDB);

    const element = elements.find((element) => {
        return element.id == id;
    });

    let infoDelete;

    if (!element) {
        return (infoDelete = {
            successfulDelete: false,
            message:
                "No se encontró el id del producto indicado en la base de datos",
        });
    }

    elements.splice(elements.indexOf(element), 1);

    fs.writeFileSync(
        path.join(__dirname, `../data/${filenameDB}.json`),
        JSON.stringify(elements, null, 4)
    );

    return (infoDelete = {
        successfulDelete: true,
        message: "El producto fue borrado exitosamente de la base de datos",
    });
};

module.exports = deleteFromDB;
