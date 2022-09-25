const mongoose = require('mongoose');
const validator = require('validator')
const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, default: '' },
  email: { type: String, default: '' },
  telefone: { type: String, default: '' },
  criadoEm: { type: Date, default: Date.now() },
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

class Contato {
  constructor(body) {
    this.body = body
    this.contato = null
    this.errors = []

  }
  async register() {
    this.valid()
    if (this.errors.length > 0) return
    this.contato = await ContatoModel.create(this.body)

  }
  valid() {

    this.cleanUp()
    if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
    if (!this.body.nome) this.errors.push('Nome é um campo obrigatório');
    if (!this.body.email && !this.body.telefone) this.errors.push('Pelo menos um contato precisa ser enviado: Telefone ou E-mail');
  }

  cleanUp() {
    for (let key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = ''
      }

    }
    this.body = {
      nome: this.body.nome,
      sobrenome: this.body.sobrenome,
      email: this.body.email,
      telefone: this.body.telefone

    }
  }
  async edit(id) {
    if (typeof id != 'string') return
    this.valid()
    if (this.errors.length > 0) return
    let a = await ContatoModel.findOneAndUpdate({ _id: id }, {
      nome: this.body.nome,
      sobrenome: this.body.sobrenome,
      telefone: this.body.telefone,
      email: this.body.email
    },
      { new: true })
    this.contato = a


  }
  static async byId(id) {
    if (typeof id !== 'string') return null
    return await ContatoModel.findById(id)

  }
  static async getContact(id) {
    return ContatoModel.find().sort({ criadoEm: -1 })

  }
  static async delete(id) {
    return  ContatoModel.deleteOne({ _id: id })
  }
}

module.exports = Contato;