const db = require("../db/database");

const parse = (article) => {
  if (!article) return null;
  return { ...article, tags: JSON.parse(article.tags) };
};

const ArticleModel = {
    // get endpoint and get id endpoint with optional filters
  findAll({ category, author, date } = {}) {
    let query = "SELECT * FROM articles WHERE 1=1";
    const params = [];

    if (category) { query += " AND category = ?"; params.push(category); }
    if (author)    { query += " AND author = ?";    params.push(author); }
    if (date)      { query += " AND date = ?";      params.push(date); }

    return db.prepare(query).all(...params).map(parse);
  },

  findById(id) {
    return parse(db.prepare("SELECT * FROM articles WHERE id = ?").get(id));
  },

  // Create an article, post endpoint
  create({ title, content, author, date, category, tags }) {
    const stmt = db.prepare(`
      INSERT INTO articles (title, content, author, date, category, tags)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      title,
      content,
      author,
      date || new Date().toISOString().split("T")[0],
      category,
      JSON.stringify(tags || [])
    );
    return this.findById(result.lastInsertRowid);
  },

  // update enpoint
  update(id, { title, content, category, tags }) {
    const article = this.findById(id);
    if (!article) return null;

    db.prepare(`
      UPDATE articles SET title = ?, content = ?, category = ?, tags = ?
      WHERE id = ?
    `).run(
      title     ?? article.title,
      content   ?? article.content,
      category ?? article.category,
      JSON.stringify(tags ?? article.tags),
      id
    );
    return this.findById(id);
  },

  // delete an article
  delete(id) {
    const result = db.prepare("DELETE FROM articles WHERE id = ?").run(id);
    return result.changes > 0;
  },

  // searches for articles where the title or content contains the query string
  search(query) {
    const like = `%${query}%`;
    return db
      .prepare("SELECT * FROM articles WHERE title LIKE ? OR content LIKE ?")
      .all(like, like)
      .map(parse);
  },
};

module.exports = ArticleModel;