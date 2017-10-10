module.exports = async (app) => {
  app.get('/login/session', (req, res) => 
    res.send(req.isAuthenticated()))
}
