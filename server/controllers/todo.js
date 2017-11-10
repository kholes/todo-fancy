const express = require('express')
const model = require('../models/todo')
const tools = require('../helper/tools')
class Todo {
    static findAll(req,res) {
        model.find().populate('user')
        .then(rows => {
            res.send(rows)
        })
        .catch(err => {
            res.send(tools.getErrors(err))
        })
    }
    static findBy(req,res) {
        model.find({user:req.params.id}).populate('user')
        .then(rows => {
            res.send(rows)
        })
        .catch(err => {
            res.send(tools.getErrors(err))
        })
    }
    static findOne(req,res) {
        model.findOne({_id:req.params.id}).populate('user')
        .exec((err,rows) => {
            res.send(rows)
        })
        .catch(err => {
            res.send(tools.getErrors(err))
        })
    }
    static create(req,res) {
        model.create(req.body)
        .then(response => {
            req.body['_id'] = response._id
            res.send(req.body)
        })
        .catch(err => {
            res.send(tools.getErrors(err))
        })       
    }
    static update(req,res) {
        model.update({
            _id:req.params.id
        }, 
        {
            $set: req.body
        })
        .then(response => {
            req.body['_id'] = req.params.id 
            res.send(req.body)
        })
        .catch(err => {
            res.send(tools.getErrors(err))
        })
    }
    static setStatus(req,res) {
        model.updateOne({
            _id: req.params.id
        },
        {
            $set: {
                "status": req.params.value
            }
        })
        .then(result => {
            res.send(req.params.value)
        })
        .catch(err => {
            res.send(tools.getErrors(err))
        })
    }
    static delete(req,res) {
        model.deleteOne({
            _id:req.params.id
        })
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            res.send(tools.getErrors(err))
        })
    }
}
module.exports = Todo