const express = require('express')
const model = require('../models/task')
class Task {
    static findAll(req,res) {
        model.find()
        .then(rows => {
            res.send(rows)
        })
        .catch(err => {
            res.send(err)
        })
    }
    static findOne(req,res) {
        model.findOne({
            _id: req.params.id
        })
        .then(row => {
            res.send(row)
        })
        .catch(err => {
            res.send(err)
        })
    }
    static create(req,res) {
        model.create({
            name: req.body.name
        })
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            res.send(err)
        })
    }
    static edit(req,res) {
        model.updateOne({
            _id: req.params.id
        },{
            name: req.body.name
        })
        .then(response => {
            let result = {
                "_id":req.params.id,
                "name":req.body.name
            }
            res.send(result)
        })
        .catch(err => {
            res.send(err)
        })
    }
    static delete(req,res) {
        model.deleteOne({
            _id: req.params.id
        })
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            res.send(err)
        })
    }
}
module.exports = Task