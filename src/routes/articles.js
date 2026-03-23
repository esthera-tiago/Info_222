const express = require("express");
const router = express.Router();
const ArticlesController = require("../controllers/articlesController");
const { serve } = require("swagger-ui-express");

// IMPORTANT : /search should be declared before /:id
// if not, /search will be treated as an id and the search endpoint will never be reached
router.get("/search",  ArticlesController.search);

router.get("/",        ArticlesController.getAll);
router.get("/:id",     ArticlesController.getOne);
router.post("/",       ArticlesController.create);
router.put("/:id",     ArticlesController.update);
router.delete("/:id",  ArticlesController.delete);

module.exports = router;