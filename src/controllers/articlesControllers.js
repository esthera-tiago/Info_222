const ArticleModel = require("../models/articleModel");

const ArticlesController = {

  // GET /api/articles
  getAll(req, res) {
    try {
      const { category, author, date } = req.query;
      const articles = ArticleModel.findAll({ category, author, date });
      res.status(200).json({ articles });
    } catch (err) {
      res.status(500).json({ error: "Error server", details: err.message });
    }
  },

  // GET /api/articles/search?query=...
  search(req, res) {
    try {
      const { query } = req.query;
      if (!query) {
        return res.status(400).json({ error: "The 'query' parameter is required" });
      }
      const articles = ArticleModel.search(query);
      res.status(200).json({ articles });
    } catch (err) {
      res.status(500).json({ error: "Error server", details: err.message });
    }
  },

  // GET /api/articles/:id
  getOne(req, res) {
    try {
      const article = ArticleModel.findById(Number(req.params.id));
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      res.status(200).json({ article });
    } catch (err) {
      res.status(500).json({ error: "Error server", details: err.message });
    }
  },

  // POST /api/articles
  create(req, res) {
    try {
      const { title, content, author, date, category, tags } = req.body;

      // Validation des champs obligatoires
      if (!title || !content || !author || !category) {
        return res.status(400).json({
          error: "The fields title, content, author and category are required",
        });
      }

      const article = ArticleModel.create({ title, content, author, date, category, tags });
      res.status(201).json({ message: "Article created successfully", article });
    } catch (err) {
      res.status(500).json({ error: "Error server", details: err.message });
    }
  },

  // PUT /api/articles/:id
  update(req, res) {
    try {
      const article = ArticleModel.update(Number(req.params.id), req.body);
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      res.status(200).json({ message: "Article updated successfully", article });
    } catch (err) {
      res.status(500).json({ error: "Error server", details: err.message });
    }
  },

  // DELETE /api/articles/:id
  delete(req, res) {
    try {
      const deleted = ArticleModel.delete(Number(req.params.id));
      if (!deleted) {
        return res.status(404).json({ error: "Article not found" });
      }
      res.status(200).json({ message: "Article deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: "Error server", details: err.message });
    }
  },
};

module.exports = ArticlesController;