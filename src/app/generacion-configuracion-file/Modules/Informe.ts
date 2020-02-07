export class Informe
{
  constructor(){
  }

  agregarFuncion(){}

  cargandoCadenasDefecto(){};
  agregandoFuncionesResultado(){};
  agregandoTitColRes(){};
  agregandoIntrosParrafos(){};
  agregandoCriComentario(){};
  agregandoConector(){};

  agregarFuncionesPlantilla()
  {
    this.agregandoTitColRes();
    this.agregandoIntrosParrafos();
    this.agregandoCriComentario();
    this.agregandoConector();
    this.agregandoFuncionesResultado();
  }

  limpiarFuncionesPlantilla(){}

}