const response = require('../utils/constants_product').response;
const dbUrl = require('../config/config')[process.env.NODE_ENV].connection_url;
const mongoose = require('mongoose');
const Transaction = require('../models/transaction.model');

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:  false});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//db.close();
const getById =  (id) => {
return new Promise((resolve, reject) => {
    Transaction.findById(id, function (err, res) {
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
        Transaction.find(function (err, res) {
        if(res){
            console.log(res);
            resolve(res);
        }
        else
            reject(response.Errors['NotFound'], err)
    })})}


const add =  (p) => {
    return new Promise((resolve, reject) => {
        let transaction = new Transaction({userId: p.userId, amount: p.amount, dealername: p.dealername, description: p.description});
        transaction.save(err => reject(response.Errors['AdditionFailed']))
        resolve(transaction)
    })}


const update =  (prod) => {
    return new Promise((resolve, reject) => {
        Transaction.findByIdAndUpdate(prod._id, {$set: prod}, function (err,res) {
            if(res)
            resolve(res);
        else
            reject(response.Errors['NotFound'], err)
        })
        
    })}

    const deleteTransaction =  (id) => {
        return new Promise((resolve, reject) => {
            Transaction.findByIdAndRemove(id, function (err) {
            if(!err)
            resolve("Removed");
        else
            reject(response.Errors['NotFound'], err)
        })
        })}

exports.getById = getById;
exports.add = add;
exports.deleteTransaction = deleteTransaction;
exports.update = update;
exports.getAll = getAll;
