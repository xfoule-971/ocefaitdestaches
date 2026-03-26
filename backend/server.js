const app = require("./app");

const PORT = process.env.PORT || 5000;

/**
 * Lancement serveur
 */
app.listen(PORT, () => {
    console.log(`API lancée sur http://localhost:${PORT}`);
});