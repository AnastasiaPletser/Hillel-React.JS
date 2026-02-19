import fs from "fs";
import path from "path";
import { Product } from "../models/models.js";

class ProductController {
  async create(req, res) {
    try {
      const { name, price, description, year, author } = req.body;

      if (!name || !price || !description || !author) {
        return res.status(400).json({ message: "Усі поля обов'язкові" });
      }

      if (!req.files || !req.files.img) {
        return res
          .status(400)
          .json({ message: "Файл зображення обов'язковий" });
      }

      const { img } = req.files;

      const staticPath = path.resolve(process.cwd(), "static");
      if (!fs.existsSync(staticPath)) {
        fs.mkdirSync(staticPath);
      }

      const fileName = Date.now() + path.extname(img.name);
      const filePath = path.join(staticPath, fileName);

      await img.mv(filePath);

      const product = await Product.create({
        name,
        price,
        description,
        year,
        author,
        imgUrl: fileName,
      });

      return res.json(product);
    } catch (error) {
      console.error("CREATE PRODUCT ERROR:", error);
      return res.status(500).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const products = await Product.findAll();
      return res.json(products);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Помилка при отриманні продуктів" });
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product)
        return res.status(404).json({ message: "Продукт не знайдено" });
      return res.json(product);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Помилка при отриманні продукту" });
    }
  }
}

export default new ProductController();
