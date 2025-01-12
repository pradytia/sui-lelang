const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server-express');
const { PubSub } = require('graphql-subscriptions');
const http = require('http');
const cors = require('cors');

const generateCustomId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const app = express();
app.use(cors());
const pubsub = new PubSub();
const server = http.createServer(app);

// MongoDB Models
const userSchema = new mongoose.Schema({
  _id: { type: String, default: generateCustomId },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  role: { type: String, required: true },
});

const productSchema = new mongoose.Schema({
  _id: { type: String, default: generateCustomId },
  productName: String,
  price: String,
  imageUrl: String,
  description: String,
  createdBy: String,
  sellerId: { type: String, required: true }
});

const BidSchema = new mongoose.Schema({
  _id: { type: String, default: generateCustomId },
  productName: { type: String, required: true },
  price:String,
  priceBid:String,
  productId:{ type: String, required: true },
  sellerId: { type: String, required: true },
  buyerId:{ type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  createdBy: { type: String, required: true },
});

const Bid =  mongoose.model('Bid', BidSchema);
const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);

// GraphQL Type Definitions
const typeDefs = gql`
  type LoginResponse {
    token: String!
    user: User!
  }
  type User {
    id: ID!
    email: String!
    username: String!
    role: String!
  }
  type Bid {
    id: ID!
    productName: String!
    price: String!
    priceBid:  String!
    productId: ID!
    sellerId: ID!
    buyerId: ID!
    description: String!
    imageUrl: String!
    createdBy: String!
  }
  type Query {
    getProducts: [Product!]!
    getBids: [Bid]!
  }
  type Product {
    id: ID!
    productName: String!
    price: String!
    imageUrl: String!
    description: String!
    createdBy: String!
    sellerId: ID!
  }

  type Mutation {
    register(email: String!, password: String!, username: String!, role: String!): User
    login(email: String!, password: String!): LoginResponse
    addProduct(productName: String!, price: String!, imageUrl: String!, description: String!, createdBy: String!,sellerId: ID!): Product!
    editProduct(id: ID!, productName: String, price: String, imageUrl: String, description: String): Product!
    deleteProduct(id: ID!): Boolean!
    submitBid(productName: String!,price: String!,priceBid: String!,productId: ID!, sellerId: ID!, buyerId: ID!,description: String!,imageUrl: String!,createdBy: String!): Bid!
  }

`;

// Authentication Middleware
const authenticate = (token) => {
  if (!token) throw new Error('Access Denied');
  try {
    token = token.replace(/"/g, '');
    return jwt.verify(token, 'secret');
  } catch (err) {
    throw new Error('Invalid Token');
  }
};

// Resolvers
const resolvers = {
  Query: {
    getProducts: async (_, __, { user }) => {
      if (!user) throw new Error('Access Denied');
      try {
        let filter = {};
        if (user.role === 'Seller') {
          filter = { sellerId:user._id };
        }
        const products = await Product.find(filter);
        return products;
      } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Failed to fetch products');
      }
    },
    getBids: async (_,__, { user }) => {
      if (!user) throw new Error('Access Denied');
      let filter = {};
      try {

        if (user.role === 'Seller') {
          filter = { sellerId: user._id };
        } else if (user.role === 'Buyer') {
          filter = { buyerId: user._id};
        } else {
          throw new Error('Invalid role');
        }
        const bids = await Bid.find(filter);
        return bids;
      } catch (error) {
        console.error('Error fetching bids:', error);
        throw new Error('Failed to fetch bids');
      }
    },
  },
  Mutation: {
    register: async (_, { email, password, username, role }) => {

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User already exists');
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const user = new User({
        email,
        password: hashedPassword,
        username,
        role,
      });
  
      await user.save();
  
      return {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error('Email not found');
    
      const validPass = await bcrypt.compare(password, user.password);
      if (!validPass) throw new Error('Invalid password');
    
      const token = jwt.sign({ _id: user._id, role: user.role }, 'secret', { expiresIn: '1h' });
    
      return {
        token,
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          role: user.role,
        },
      };
    },
    addProduct: async (_, { productName, price, imageUrl, description, createdBy,sellerId }, { user }) => {
      if (!user) throw new Error('Access Denied');
      try {
      const product = new Product({
        productName,
        price,
        imageUrl,
        description,
        createdBy,
        sellerId
      });
      await product.save();
      return product;
      }
      catch (error) {
        console.error('Error submitting product :', error);
        throw new Error('Failed to submit product ');
      }
    },
    editProduct: async (_, { id, productName, price, imageUrl, description }, { user }) => {
      if (!user) throw new Error('Access Denied');
      try {
        const product = await Product.findById(id);
        if (!product) throw new Error('Product not found');

        if (productName) product.productName = productName;
        if (price) product.price = price;
        if (imageUrl) product.imageUrl = imageUrl;
        if (description) product.description = description;

        await product.save();
        return product;
      } catch (error) {
        console.error('Error editing product:', error);
        throw new Error('Failed to edit product');
      }
    },
    deleteProduct: async (_, { id }, { user }) => {
      if (!user) throw new Error('Access Denied');
      try {
        const product = await Product.findById(id);
        if (!product) throw new Error('Product not found');
        
        await Product.findByIdAndDelete(id);
        return true;
      } catch (error) {
        console.error('Error deleting product:', error);
        throw new Error('Failed to delete product');
      }
    },
    submitBid: async (_, { productName, price, priceBid, productId,sellerId, buyerId, description, imageUrl, createdBy }, { user }) => {
      if (!user) throw new Error('Access Denied');
      try {
        const newBid = new Bid({
          productName,
          price,
          priceBid,
          productId,
          sellerId,
          buyerId,
          description,
          imageUrl,
          createdBy,
        });

        const savedBid = await newBid.save();
        return savedBid;
      } catch (error) {
        console.error('Error submitting bid:', error);
        throw new Error('Failed to submit bid');
      }
    },
  },
};

// Apollo Server Setup
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (err) => {
    console.error(err); 
    return err;
  },
  debug: true,
  context: ({ req }) => {
    const token = req.headers['authorization'];
    const user = token ? authenticate(token) : null;
    return { user };
  },
});

const startServer = async () => {
  try {
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    await mongoose.connect('mongodb://localhost:27017/test');
    console.log('Connected to MongoDB');

    server.listen(3000, () => {
      console.log(`Server running on http://localhost:3000${apolloServer.graphqlPath}`);
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();
