module.exports.validPassword = (password) => {
  const rules = require('password-rules')

  let response = reglas(password)
  if(response == false)
    return true
  else if(response.issues)
    return response.issues
}
