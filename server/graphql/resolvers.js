import { GraphQLUpload } from "graphql-upload";
import { Op } from "sequelize";
import fs from "fs";
import path from "path";
import { Product } from "../models/models.js";

export const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    getAllProducts: async () => await Product.findAll(),
    async getAllProducts() {
      const products = await Product.findAndCountAll();
      return products.rows;
    },

    getProduct: async (_, arg) => {
      const product = await Product.findByPk(arg.id, {
        include: { all: true },
      });
      return product;
    },

    getSearchProducts: async (_, { name }) => {
      if (!name || !name.trim()) return [];

      const search = name.trim();

      const searchProducts = await Product.findAndCountAll({
        where: { name: { [Op.iLike]: `%${search}%` } },
        limit: 20,
        order: [["name", "ASC"]],
      });

      return searchProducts.rows;
    },
  },

  Mutation: {
    createProduct: async (_, { input }) => {
      try {
        const { name, description, price, imgUrl, year, authorName } = input;
        const product = await Product.create({
          name,
          description,
          price,
          imgUrl: Array.isArray(imgUrl) ? imgUrl : [],
          year,
          authorName,
        });
        return product;
      } catch (error) {
        console.error(error);
        throw new Error("Помилка при створенні продукту");
      }
    },

    uploadImage: async (_, { file }) => {
      const { createReadStream, filename } = await file;

      const uploadDir = path.join(process.cwd(), "uploads");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

      const filePath = path.join(uploadDir, filename);
      const stream = createReadStream();

      await new Promise((resolve, reject) => {
        stream
          .pipe(fs.createWriteStream(filePath))
          .on("finish", resolve)
          .on("error", reject);
      });

      return `http://localhost:5001/uploads/${filename}`;
    },

    updateProduct: async (_, { input }) => {
      try {
        const product = await Product.update(input, {
          where: {
            id: input.id,
          },
        });

        return product;
      } catch (error) {
        console.error(error);
        throw new Error("Помилка при створенні продукту");
      }
    },

    removeProduct: async (_, { id }, { user }) => {
      await Product.destroy({ where: { id } });
      return true;
    },

    uploadMultipleImages: async (_, { files }) => {
      const uploadDir = path.join(process.cwd(), "uploads");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

      const uploadedUrls = [];

      for (const filePromise of files) {
        const { createReadStream, filename } = await filePromise;
        const filePath = path.join(uploadDir, filename);
        const stream = createReadStream();

        await new Promise((resolve, reject) => {
          stream
            .pipe(fs.createWriteStream(filePath))
            .on("finish", resolve)
            .on("error", reject);
        });

        uploadedUrls.push(`http://localhost:5001/uploads/${filename}`);
      }

      return uploadedUrls;
    },
  },
};
