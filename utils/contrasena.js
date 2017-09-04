module.exports.contrasenaValida = (contrasena) => {
  const reglas = require('password-rules')

  let respuesta = reglas(contrasena)
  if(respuesta == false)
    return true
  else if(respuesta.issues)
    return respuesta.issues
}