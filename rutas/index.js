module.exports = (app) => {
  const rutas = [
    './tareas/conseguirTareas.js',
    './tareas/eliminarTarea.js',
    './tareas/editarTarea',
    './tareas/crearTarea.js',
    './materias/conseguirMaterias.js',
    './materias/eliminarMateria.js',
    './materias/editarMateria.js',
    './materias/crearMateria.js'
  ]

  for(var i = 0; i < rutas.length; i++)
    require(rutas[i])(app)
}