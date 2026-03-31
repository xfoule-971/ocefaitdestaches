// Middleware 404
const notFound = (req, res) => {

    res.status(404).json ({

        success: false,
        message: "Route non trouvée"

    });

};

module.exports = notFound;