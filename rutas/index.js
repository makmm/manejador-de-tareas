module.exports = async (app) => {
  const rutas = [
    './tareas/conseguirTareas.js',
    './tareas/eliminarTarea.js',
    './tareas/editarTarea',
    './tareas/crearTarea.js',
    './materias/conseguirMaterias.js',
    './materias/eliminarMateria.js',
    './materias/editarMateria.js',
    './materias/crearMateria.js',
    './logeo/cuenta/crearCuenta.js',
    './logeo/cuenta/conseguirCuenta.js',
    './logeo/sesion/crearSesion.js',
    './logeo/sesion/eliminarSesion.js',
    './logeo/sesion/conseguirSesion.js'
  ]

  for(var i = 0; i < rutas.length; i++){
    require(rutas[i])(app)
  }
}