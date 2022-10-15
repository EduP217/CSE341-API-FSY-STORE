
const mongoconfig = require('../config/database');
const ObjectId = require('mongoose').ObjectId;

const getProductAll= async (req, res, next) => {
  const result = await mongoconfig.connectDB().db('').collection('').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingleProduct = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongoconfig
    .connectDB()
    .db('')
    .collection('')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};



const newProducts = async (req, res) => {
  const newProducts = {
    
      productName: req.body.productName,
      price: req.body.price,
      color: req.body.color,
      description:req.body.description,
      productStock:req.body.productStock,
      productImage:req.body.productImage,
      thumbnail:req.body.thumbnail,
      brand:req.body.brand,
     model:req.body.model

  };
  const sendProducts = await mongoconfig.connectDB().db('').collection('').insertOne(newProducts);

//   try {
    
//       res.status(201).json(sendProducts)
//   }
//   catch (error) {
//       res.status(500).json({message: error.message})
//   };
// }
if (sendProducts.acknowledged) {
  res.status(201).json(sendProducts);
} else {
  res.status(500).json(sendProducts.error || 'Some error occurred while creating the newProducts.');
}
};

const updateProducts = async (req, res) => {
const userId = new ObjectId(req.params.id);
const newProducts= {
  
     productName: req.body.productName,
      price: req.body.price,
      email: req.body.email,
      productStock: req.body.productStock,
      
     description: req.body.birthday
  
};

// try {
//   const dataToSave = await data.save();
//   res.status(200).json(dataToSave)
// }
// catch (error) {
//   res.status(400).json({message: error.message})
// }
// });
const sendProducts = await mongoconfig
.connectDB()
.db('')
.collection('')
.replaceOne({ _id: userId }, newProducts);
console.log(sendProducts);
if ( sendProducts.modifiedCount > 0) {
res.status(204).send();
} else {
res.status(500).json(sendProducts.error || 'Some error occurred while updating the newProducts.');
}
};

const deleteProducts = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const del = await mongoconfig.connectDB().db('').collection('').deleteOne({ _id: userId }, true);
  console.log(del);
  if (del.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(del.error || 'Some error occurred while deleting the newProducts.');
  }
};


  module.exports = { getProductAll, getSingleProduct,updateProducts,deleteProducts,newProducts };
