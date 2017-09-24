module.exports = async (app) => {
  app.delete('/logeo/sesion', (req, res) => {
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