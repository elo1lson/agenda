"use strict"

const Login = require('../models/loginModel')
exports.index = (req, res) => {
    if(req.session.user) return res.render('logado')
    res.render('login')
}

exports.register = async (req, res) => {
    try {

        let login = new Login(req.body)
        await login.register()
        if (login.errors.length > 0) {
            req.flash('errors', login.errors)
            req.session.save(() => {
                return res.redirect('/login')
            })
            return
        }
        req.flash('success', 'Usuário criado com sucesso!')
        req.session.save(() => {
            return res.redirect('/login')
        })
        return
    } catch (error) {
        res.render('404')

    }
    //res.send('login')
}
exports.login = async (req, res) => {
    try {

        let login = new Login(req.body)
        await login.login()
        if (login.errors.length > 0) {
            req.flash('errors', login.errors)
            req.session.save(() => {
                return res.redirect('/login')
            })
            return
        }
        req.flash('success', 'Logado com sucesso!')
        req.session.user = login.user
        req.session.save(() => {
            return res.redirect('/login')
        })
        return
    } catch (error) {
        res.render('404')

    }
}

exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect('/')

}