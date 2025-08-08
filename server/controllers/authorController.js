import { Author } from "../models/models.js";
import ApiError from "../error/ApiError.js";

class AuthorController {
  async create(req, res) {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ message: "Ім'я автора обов'язкове" });
      }

      const author = await Author.create({ name });
      return res.json(author);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Помилка під час створення автор" });
    }
  }

  async getAll(req, res) {
    try {
      const authors = await Author.findAll();
      return res.json(authors);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Помилка при отриманні авторів" });
    }
  }
}

export default new AuthorController();
