const response = require('../utils/constants_product').response;
const dbUrl = require('../config/config')[process.env.NODE_ENV].connection_url;
const mongoose = require('mongoose');
const Product = require('../models/product.model');

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:  false});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//db.close();
const getById =  (id) => {
return new Promise((resolve, reject) => {
    Product.findById(id, function (err, res) {
        if(res){
            console.log(res);
            resolve(res);
        }
        else
            reject(response.Errors['NotFound'], err)
    }).populate('category')
})}

const getAll =  _ => {
    return new Promise((resolve, reject) => {
        Product.find({$where: {isActive: true}}, function (err, res) {
        if(res){
            console.log(res);
            resolve(res);
        }
        else
            reject(response.Errors['NotFound'], err)
    }).populate('category')})}


const add =  (p) => {
    return new Promise((resolve, reject) => {
        let prod = new Product({name: p.name, price: p.price, quantity: p.quantity, description: p.description, code: p.code, category: p.category});
        prod.save(err => reject(response.Errors['AdditionFailed']))
        resolve(prod)
    })}


const update =  (prod) => {
    return new Promise((resolve, reject) => {
        Product.findByIdAndUpdate(prod._id, {$set: prod}, function (err,res) {
            if(res)
            resolve(res);
        else
            reject(response.Errors['NotFound'], err)
        })
        
    })}

    const deleteProduct =  (id) => {
        return new Promise((resolve, reject) => {
        Product.findByIdAndUpdate(id, {$set: {isActive: false}} , function (err) {
            if(!err)
            resolve("Removed");
        else
            reject(response.Errors['NotFound'], err)
        })
        })}

exports.getById = getById;
exports.add = add;
exports.deleteProduct = deleteProduct;
exports.update = update;
exports.getAll = getAll;
