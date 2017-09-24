module.exports = async (app) => {
  app.get('/logeo/sesion', (req, res) => 
    res.send(req.isAuthenticated()))
}