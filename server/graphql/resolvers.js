import { GraphQLUpload } from "graphql-upload";
import fs from "fs";
import path from "path";
import { Product } from "../models/models.js";

export const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    getAllProducts: async () => await Product.findAll(),
    async getAllProd() {
      let products = await Product.findAndCountAll({})
      console.log("----Products----", products.rows)
      return products.rows
    },
     
      getProduct: async (_, arg) => { 
        console.log("id", arg.id)
        const product = await Product.findByPk(arg.id, 
          {include: {all: true}}
        )
        return product
      },

      getProductWithAuthor: async (_, arg) => { 
        console.log("id", arg.id)
        const product = await Product.findByPk(arg.id, 
          {include: {all: true}}
        )
        console.log("----Products----", product)
        return product
      },
    },


  Mutation: {
    createProduct: async (_, { input }) => {
      console.log("****************************", typeof(input.imgUrl), input)
     
      try {
      // const { name, description, price, imgUrl, year, authorId } = input;
       const { name, description, price, imgUrl, year, author } = input;
      const product = await Product.create({
        name,
        description,
        price,
        imgUrl: Array.isArray(imgUrl) ? imgUrl : [],
        year,
        author,
        // authorId
      });
      console.log("Товар створено", product)
      return product
    } catch (error) {
      console.error(error);
      throw new Error('Помилка при створенні продукту');
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

 updateProduct: async (_, { id, input }, { models }) => {
    const product = await models.Product.findByPk(id);
    if (!product) throw new Error("Продукт не знайдено");

    await product.update(input);
    return product;
  },

 removeProduct: async (_, { id }, { user }) => {
  if (!user) {
    throw new Error("Not authenticated");
  }

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
    }
  }
};


