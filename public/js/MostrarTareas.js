var tareas = [
  {
    "nombre": "TP matematica",
    "descripcion": "Pag. 12 a 14"
  },
  {
    "nombre": "TP sociales",
    "descripcion": "Pag. 102 a 106"
  }
];

$(document).ready(function(){
  var template = Handlebars.compile($("#template-tarea").html());
  for(var i in tareas){
    $("#tareas-body").append(template(tareas[i]));
  }
});
