const mongoose = require('mongoose');
const validator = require('validator');

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: {type:String, require: true}
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor(body) {
    this.body = body
    this.errors = []
    this.user = null
  }

  async register() {
    this.valida()
    if (this.errors.length > 0) return
    try {
      this.user = await LoginModel.create(this.body)

    } catch (error) {
      console.log(error);

    }
  }

  valida() {

    this.cleanUp()
    if (this.body.password.length < 3 || this.body.password > 50) this.errors.push('A senha precisa ter entre 3 e 50 caracteres')
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
