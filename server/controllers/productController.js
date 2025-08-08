// import { Product } from "../models/models.js";

// class ProductController {
//   async create(req, res) {
//     try {
//       const { name, price, description, year, authorId } = req.body;
//       const { img } = req.files;

//        if (!name || !price || !description || !authorId) {
//       return res.status(400).json({ message: "Усі поля обов'язкові" });
//     }

//       let fileName = Date.now() + ".jpg";
//       img.mv(process.cwd() + "/static/" + fileName);

//       const product = await Product.create({
//         name,
//         price,
//         description,
//         year,
//         authorId,
//         imgUrl: fileName,
//       });

//       return res.json(product);
//     } catch (error) {
//       console.error('CREATE PRODUCT ERROR:', error); 
//     return res.status(500).json({ message: error.message })
//       // return res.status(500).json({ message: "Помилка при створенні продукту" });
//     }
//   }

//   async getAll(req, res) {
//     const products = await Product.findAll();
//     return res.json(products);
//   }

//   async getOne(req, res) {
//     const { id } = req.params;
//     const product = await Product.findByPk(id);
//     return res.json(product);
//   }
// }

// export default new ProductController();

import fs from 'fs';
import path from 'path';
import { Product } from "../models/models.js";

class ProductController {
  async create(req, res) {
    try {
      const { name, price, description, year, authorId } = req.body;

      // Проверяем обязательные поля
      if (!name || !price || !description || !authorId) {
        return res.status(400).json({ message: "Усі поля обов'язкові" });
      }

      // Проверяем наличие файла
      if (!req.files || !req.files.img) {
        return res.status(400).json({ message: "Файл зображення обов'язковий" });
      }

      const { img } = req.files;

      // Создаём папку static, если её нет
      const staticPath = path.resolve(process.cwd(), 'static');
      if (!fs.existsSync(staticPath)) {
        fs.mkdirSync(staticPath);
      }

      // Генерируем уникальное имя файла
      const fileName = Date.now() + path.extname(img.name);
      const filePath = path.join(staticPath, fileName);

      // Сохраняем файл
      await img.mv(filePath);

      // Создаём продукт в базе
      const product = await Product.create({
        name,
        price,
        description,
        year,
        authorId,
        imgUrl: fileName,
      });

      return res.json(product);
    } catch (error) {
      console.error('CREATE PRODUCT ERROR:', error);
      return res.status(500).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const products = await Product.findAll();
      return res.json(products);
    } catch (error) {
      return res.status(500).json({ message: "Помилка при отриманні продуктів" });
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) return res.status(404).json({ message: "Продукт не знайдено" });
      return res.json(product);
    } catch (error) {
      return res.status(500).json({ message: "Помилка при отриманні продукту" });
    }
  }
}

export default new ProductController();
