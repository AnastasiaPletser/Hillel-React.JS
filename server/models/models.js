import sequelize from '../db.js';
import { DataTypes } from 'sequelize';

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: 'USER' }
});

const Cart = sequelize.define('cart', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

const CartProduct = sequelize.define('cart_product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

const Product = sequelize.define('product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: true },
  imgUrl: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true, defaultValue: [], 
    get() {
      const rawValue = this.getDataValue('imgUrl');
      if (typeof rawValue === 'string') {
        try {
          return JSON.parse(rawValue); 
        } catch {
          return []; 
        }
      }
      return rawValue || [];
    },
    set(value) {
      if (Array.isArray(value)) {
        this.setDataValue('imgUrl', value);
      } else if (typeof value === 'string') {
        this.setDataValue('imgUrl', [value]);
      } else {
        this.setDataValue('imgUrl', []);
      }
    }
  },
  description: { type: DataTypes.STRING, allowNull: true },
  year: { type: DataTypes.INTEGER, allowNull: true },
  authorName: { type: DataTypes.STRING, allowNull: true },
  authorId: { type: DataTypes.INTEGER, allowNull: true}
});

const Author = sequelize.define('author', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: true }
});

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.hasMany(CartProduct);
CartProduct.belongsTo(Cart);

Author.hasMany(Product);
Product.belongsTo(Author); 

Product.hasMany(CartProduct);
CartProduct.belongsTo(Product);

export {
  User,
  Cart,
  CartProduct,
  Product,
  Author
};
