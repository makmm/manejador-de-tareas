module.exports = async (app) => {
  app.delete('/login/session', (req, res) => {
    if(req.user){
      req.logout()
      res.status(200).json({
        status: "Sesión cerrada."
      })
    } else {
      res.status(400).json({
        error: "No estas logeado."
      })
    }
  })
}
