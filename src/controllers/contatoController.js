const Contato = require('../models/contatoModel')

exports.index = (req, res) => {
  res.render('contato', {
    contato: {}
  })

}

exports.register = async (req, res) => {
  try {

    const contato = new Contato(req.body)
    await contato.register()

    if (contato.errors.length > 0) {
      req.flash('errors', contato.errors)
      req.session.save(() => {
        res.redirect('/contatos')
        return

      })
    }
    req.flash('success', 'Contato salvo com sucesso!')
    req.session.save(() => res.redirect(`/contatos/${contato.contato._id}`))

  } catch (e) {

    return res.render('404')
  }
}
exports.edit = async (req, res) => {
  try {

    let contato = await Contato.byId(req.params.id)
    if (!contato) return res.render('404')
    return res.render('contato', {
      contato
    })
  } catch (e) {
    res.render('404')
    return
  }

}
exports.update = async (req, res) => {
  try {

    let contato = await new Contato(req.body)
    await contato.edit(req.params.id)

    console.log(contato.contato);

    if (contato.errors.length > 0) {
      req.flash('errors', contato.errors)
      req.session.save(() => {
        res.redirect('/contatos')
        return

      })
    }
    req.flash('success', 'Contato editado com sucesso!')
    req.session.save(() => res.redirect(`/contatos/${contato.contato._id}`))

  } catch (e) {
    res.render('404')
    console.log(e);
    return
  }

}
exports.delete = async (req, res) => {
  await Contato.delete(req.params.id)
  req.flash('success', 'Contato deletado com sucesso!')
  req.session.save(() => res.redirect('/'))

}