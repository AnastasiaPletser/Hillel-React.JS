import { GraphQLUpload } from "graphql-upload";
import fs from "fs";
import path from "path";
import { Product } from "../models/models.js";

// import sequelize from "../db.js";

export const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    getAllProducts: async () => await Product.findAll(),
    getProduct: async (_, { id }) => await Product.findByPk(id),
    getAuthor: async () => [] // заглушка, если нужно подключим модель Author
  },

  Mutation: {
    createProduct: async (_, { input }) => {
      console.log("****************************", typeof(input.imgUrl), input)
      // const product = await Product.create(input);
      try {
      const { name, description, price, imgUrl, year, authorId } = input;
      const product = await Product.create({
        name,
        description,
        price,
        imgUrl: Array.isArray(imgUrl) ? imgUrl : [],
        year,
        authorId
      });
      console.log("Товар создан", product)
      return product
    } catch (error) {
      console.error(error);
      throw new Error('Ошибка при создании продукта');
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

      return `http://localhost:5000/uploads/${filename}`;
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

        uploadedUrls.push(`http://localhost:5000/uploads/${filename}`);
      }

      return uploadedUrls;
    }
  }
};
