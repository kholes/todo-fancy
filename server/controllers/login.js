const express = require('express')
const tools = require('../helper/tools')
const model = require('../models/user')
const jwt = require('jsonwebtoken')
class Login {
    static cekToken(req,res) {
		// res.send(req.body.accessToken)
	}
    static login(req,res) {
		model.findOne({'username':req.body.username})
		.then(user => {
			if(req.body.username == user.username && user.password == tools.getCrypt(req.body.password,user.salt)) {
                // res.send(user)
                let dataUser = {
					id:user._id,
					username:user.username,
					role:user.role
				}
                var token = jwt.sign(dataUser, process.env.appSecret)
				let obj = {newToken: token}
				res.send(obj)													
			} else {
				res.send("Login gagal, username dan password tidak sesuai!")
			}
		})
		.catch(err => {
			res.send("Login gagal, anda belum terdaftar!")
		})
    }
    static loginFB(req,res) {
		let username = tools.cekToken(req.body.accessToken, function(id){
			model.findOne({'username':id})
			.then(user => {
				let dataUser = {
					id:user._id,
					username:user.username,
					role:user.role
				}
				var token = jwt.sign(dataUser, process.env.appSecret)
				let obj = {newToken: token}
				console.log(obj)
				res.send(obj)													
			})
			.catch(err => {
				model.create({
					username:id,
					password:'1234567890',
					salt:'',
					role:'user'
				})
				.then(result => {
					let dataUser = {
						username:result.username,
						role:result.role
					}
					var token = jwt.sign(dataUser, process.env.appSecret)
					let obj = {newToken: token}
					res.send(obj)													
				})
			})
		})
    }
}
module.exports = Login