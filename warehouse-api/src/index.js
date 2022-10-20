const express = require("express");
// const cors = require("cors");
const productsRouter = require("./routes/productRoutes");
const articleRouter = require("./routes/articleRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // parse requests of content-type - application/json
app.use(express.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded
app.use("/api/articles", articleRouter);
app.use("/api/products", productsRouter);

const db = require("./database/models");
db.sequelize.sync()
    .then(() => {
        console.log("📡 Database sync successful");
    })
    .catch((err) => {
        console.log(`❌ Failed to sync database: ${err.message}`);
    });

app.listen(PORT, () => {
    console.log(`🚀 Warehouse API server listening on port ${PORT}`);
});