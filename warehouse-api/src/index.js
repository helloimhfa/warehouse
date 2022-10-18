const express = require("express");
const productsRouter = require("./routes/productRoutes");
const articleRouter = require("./routes/articleRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // bodyParser middleware
app.use("/api/products", productsRouter);
app.use("/api/supplies", articleRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
});