const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, require: true }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor(body) {
    this.body = body
    this.errors = []
    this.user = null
  }
  async login() {
    if (!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
    this.user = await this.userExist()
    if (!this.user) {
      this.errors.push("Usuário inválido!")
      this.user= null
      return
    }
    if (!bcrypt.compareSync(this.body.password, this.user.password)) {
      this.errors.push('Senha inválida!')
      return
    }

  }
  async register() {
    this.valid()
    if (this.errors.length > 0) return

    let user = await this.userExist()
    if (user) this.errors.push("Este usuario já existe!")
    if (this.errors.length > 0) return


    const salt = bcrypt.genSaltSync()

    this.body.password = bcrypt.hashSync(this.body.password, salt)
    this.user = await LoginModel.create(this.body)

  }
  async userExist() {
    return LoginModel.findOne({ email: this.body.email })
  }

  valid() {

    this.cleanUp()
    if (this.body.password.length < 5 || this.body.password.length > 20) this.errors.push('A senha precisa ter entre 5 e 20 caracteres')
    if (!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');

  }

  cleanUp() {
    for (let key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = ''
      }

    }
    this.body = {
      email: this.body.email,
      password: this.body.password
    }
  }

}

module.exports = Login;
