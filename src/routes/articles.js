/**
 * @swagger
 * components:
 *   schemes:
 *     Article:
 *       type: object
 *       required: [title, content, author, category]
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         author:
 *           type: string
 *         date:
 *           type: string
 *           example: "2026-03-23"
 *         category:
 *           type: string
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *
 * /api/articles:
 *   get:
 *     summary: Get all articles with optional filters
 *     parameters:
 *       - in: query
 *         name: category
 *         schem: { type: string }
 *       - in: query
 *         name: author
 *         schem: { type: string }
 *       - in: query
 *         name: author
 *         schem: { type: string }
 *       - in: query
 *         name: date
 *         schem: { type: string }
 *     responses:
 *       200:
 *         description: Liste of articles
 *   post:
 *     summary: Create a new article
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       201:
 *         description: Article created successfully
 *       400:
 *         description: Missing required fields
 *
 * /api/articles/search:
 *   get:
 *     summary: Search for articles by title or content
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Corresponding Articles
 *
 * /api/articles/{id}:
 *   get:
 *     summary: Get an article by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schem: { type: integer }
 *     responses:
 *       200:
 *         description: Article found
 *       404:
 *         description: Article not found
 *   put:
 *     summary: Update an article
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schem: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemes/Article'
 *     responses:
 *       200:
 *         description: Article updated successfully
 *       404:
 *         description: Article not found
 *   delete:
 *     summary: Delete an article
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schem: { type: integer }
 *     responses:
 *       200:
 *         description: Article deleted successfully
 *       404:
 *         description: Article not found
 */

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