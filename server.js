const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const articlesRouter = require("./src/routes/articles");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON bodies
app.use(express.json());

// ─── Swagger Configuration ───────────────────────────────────────────────────
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog API",
      version: "1.0.0",
      description: "API backend to manage articles for a blog application",
    },
    servers: [
      { url: `http://localhost:${PORT}`, description: "Local server" },
    ],
  },
  // Swagger will look for JSDoc comments in these files to generate the documentation
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use("/api/articles", articlesRouter);

// Route racine — check if API is working
app.get("/", (req, res) => {
  res.json({
    message: "Blog API opérationnelle",
    documentation: `http://localhost:${PORT}/api-docs`,
  });
});

// ─── Middleware for handling 404 errors ───────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ─── Starting the server ─────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
  console.log(`Documentation Swagger : http://localhost:${PORT}/api-docs`);
});