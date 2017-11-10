const express = require('express')
const cryptorjs = require('cryptorjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
class Tools {
    static getRand() {
        let txt = ''
        let char = 'ABCDEFGHIKLMNOPQRSTUVWXYZ1234567890'
        for(let i = 0;i <= 6;i++) {
            txt += char.charAt(Math.floor(Math.random()*char.length))
        }
        return txt
    }
    static getCrypt(pass,salt) {
        let newPass = salt+pass
	    let Encrypt = new cryptorjs(salt);
	    let encoded = Encrypt.encode(newPass);
	    return encoded;
    }
    static cekToken(fbToken, cb) {
        let options = {accessToken: fbToken, appId: process.env.appId, appSecret: process.env.appSecret}
        var FB = require('fb'),
        fb = new FB.Facebook(options);
            fb.api('/me', (response) => {
            let id = response.id
            cb(id)
        });
    }
	static isLogin(req,res,next) {
        let token = req.body.accessToken
		if(token) {
			jwt.verify(token, process.env.appSecret, (err,decoded) => {
				if(err) {
					res.send('Login failed')
				} else {
                    res.send(decoded)
				}
			})
		} else {
			res.send('Please login!')
		}
	}
    static getErrors(err) {
        let message = ''
        if(err.code == 11000) {
            message = "Username must be unique!"
        } 
        else if(err.errors) {
            if(err.errors.status){
                if(err.errors.status.kind == "enum") {
                    message = "Status not valid!"
                }
            }
            if(err.errors.username) {
                if(err.errors.username.message == "username required") {
                    message = err.errors.username.message
                }
                else if(err.errors.username.kind == "minlength") {
                    message = "Min Length username > 3 "
                }
            }
            else if(err.errors.password) {
                if(err.errors.password.message == "password required") {
                    message = err.errors.password.message
                }
                else if(err.errors.password.kind == "minlength") {
                    message = "Min Length password > 6 "
                }
            }
        }
        else {
            message = err
        }
        return message
    }
}
module.exports = Tools