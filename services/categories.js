const response = require('../utils/constants_product').response;
const dbUrl = require('../config/config')[process.env.NODE_ENV].connection_url;
const mongoose = require('mongoose');
const Category = require('../models/category.model');

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:  false});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//db.close();
const getById =  (id) => {
return new Promise((resolve, reject) => {
    Category.findById(id, function (err, res) {
        if(res){
            console.log(res);
            resolve(res);
        }
        else
            reject(response.Errors['NotFound'], err)
    })
})}

const getAll =  _ => {
    return new Promise((resolve, reject) => {
        Category.find(function (err, res) {
        if(res){
            console.log(res);
            resolve(res);
        }
        else
            reject(response.Errors['NotFound'], err)
    })})}


const add =  (p) => {
    return new Promise((resolve, reject) => {
        let cat = new Category({name: p.name, userId: p.userId});
        cat.save(err => reject(response.Errors['AdditionFailed']))
        resolve(cat)
    })}


const update =  (cat) => {
    return new Promise((resolve, reject) => {
        Category.findByIdAndUpdate(cat._id, {$set: cat}, function (err,res) {
            if(res)
            resolve(res);
        else
            reject(response.Errors['NotFound'], err)
        })
        
    })}

    const deleteCategory =  (id) => {
        return new Promise((resolve, reject) => {
        Category.findByIdAndRemove(id, function (err) {
            if(!err)
            resolve("Removed");
        else
            reject(response.Errors['NotFound'], err)
        })
        })}

exports.getById = getById;
exports.add = add;
exports.deleteCategory = deleteCategory;
exports.update = update;
exports.getAll = getAll;
