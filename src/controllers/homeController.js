const Contato = require('../models/contatoModel')

exports.index = async (req, res) => {

  let contatos = await Contato.getContact();
  res.render('index',{
    contatos
  });
  return;
};
