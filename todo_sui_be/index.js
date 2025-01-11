const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server-express');
const { PubSub } = require('graphql-subscriptions');
const http = require('http');
const cors = require('cors');

const app = express();
app.use(cors());
const pubsub = new PubSub();
const server = http.createServer(app);

// MongoDB Models
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  role: { type: String, required: true },
});

const productSchema = new mongoose.Schema({
  productName: String,
  price: String,
  imageUrl: String,
  description: String,
  description: String,
  createdBy: String,
});

const BidSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  price:String,
  priceBid:String,
  productId: { type: mongoose.Schema.Types.ObjectId, required: true },
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
  }

  type Mutation {
    register(email: String!, password: String!, username: String!, role: String!): User
    login(email: String!, password: String!): LoginResponse
    addProduct(productName: String!, price: String!, imageUrl: String!, description: String!, createdBy: String!): Product
    submitBid(productName: String!,price: String!,priceBid: String!,productId: ID!,description: String!,imageUrl: String!,createdBy: String!): Bid!
  }

`;

// Authentication Middleware
const authenticate = (token) => {
  if (!token) throw new Error('Access Denied');
  try {
    return jwt.verify(token, 'secret');
  } catch (err) {
    throw new Error('Invalid Token');
  }
};

// Resolvers
const resolvers = {
  Query: {
    getProducts: async () => {
      try {
        const products = await Product.find();
        return products;
      } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Failed to fetch products');
      }
    },
    getBids:async () => {
      try {
        const bids = await Bid.find();
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
    addProduct: async (_, { productName, price, imageUrl, description, createdBy }) => {
      const product = new Product({
        productName,
        price,
        imageUrl,
        description,
        createdBy,
      });
      await product.save();
      return product;
    },
    submitBid: async (_, { productName,price, priceBid, productId, description, imageUrl, createdBy }) => {
      try {
        const newBid = new Bid({
          productName,
          price,
          priceBid,
          productId,
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
  // context: ({ req }) => {
  //   const token = req.headers['authorization'];
  //   const user = token ? authenticate(token) : null;
  //   return { user };
  // },
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
