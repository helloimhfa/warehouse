const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Metadata info about Warehouse API
const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Warehouse API", version: "1.0.0" },
  },
  apis: ["src/routes/articleRoutes.js", "src/routes/productRoutes.js"],
};

// JSON formatted docs
const swaggerSpec = swaggerJSDoc(options);

// Documentation setup
const swaggerDocs = (app, port) => {
  app.use("/warehouse/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/warehouse/api/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(`📖 Warehouse API documentation is available at http://localhost:${port}/warehouse/api/docs`);
};

module.exports = { swaggerDocs };