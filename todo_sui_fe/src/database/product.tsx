export const ProductSchema = {
    name: 'Product',
    properties: {
      id: 'int',
      productName: 'string',
      price: 'string',
      imageUrl: 'string',
      description: 'string',
      createdBy: 'string',
      sellerId: 'string',
    },
    primaryKey: 'id',
  };