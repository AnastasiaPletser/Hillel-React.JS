import express from "express";
import sequelize from "./db.js";
import cors from "cors";
import fileUpload from "express-fileupload";
import router from "./routes/index.js";
import errorHandler from "./middleware/ErrorHandlingMiddleware.js";
import path from "path";
import { fileURLToPath } from "url";
import "./models/models.js";

import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";
import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";
// import route from "./uploads/upload-multiple.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);
app.use("/uploads", express.static(path.resolve(__dirname, "uploads"))); 

// app.use(route);

app.use(graphqlUploadExpress());

app.get("/", (req, res) => {
  res.status(200).json({ message: "API is working!" });
});

app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const server = new ApolloServer({
      typeDefs,
      resolvers
    });

    await server.start();
    server.applyMiddleware({ app, path: "/graphql" });

    app.listen(PORT, () =>
      console.log(`Server started on http://localhost:${PORT}`)
    );
    console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

start();
