import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  codigoPreparandoDatos=`public class DatosIndicadores
    {
        public string detalle { get; set; }
        public DateTime periodo { get; set; }
        public double valor { get; set; }

        public static List<DatosIndicadores> getDatos()
        {
            List<DatosIndicadores> listDatos =new List<DatosIndicadores>();

            listDatos.Add(new DatosIndicadores() { detalle = "Caja", periodo = new DateTime(2017, 12, 31), valor = 3500 }); 
            listDatos.Add(new DatosIndicadores() { detalle = "Caja", periodo = new DateTime(2018, 2, 28), valor = 2500 }); 
            listDatos.Add(new DatosIndicadores() { detalle = "Caja", periodo = new DateTime(2018, 12, 31), valor = 3000 }); 
            listDatos.Add(new DatosIndicadores() { detalle = "Caja", periodo = new DateTime(2019, 2, 28), valor = 4000 });

            listDatos.Add(new DatosIndicadores() { detalle = "Cuentas por Cobrar", periodo = new DateTime(2017, 12, 31), valor = 5000 }); 
            listDatos.Add(new DatosIndicadores() { detalle = "Cuentas por Cobrar", periodo = new DateTime(2018, 2, 28), valor = 5400 }); 
            listDatos.Add(new DatosIndicadores() { detalle = "Cuentas por Cobrar", periodo = new DateTime(2018, 12, 31), valor = 5300 }); 
            listDatos.Add(new DatosIndicadores() { detalle = "Cuentas por Cobrar", periodo = new DateTime(2019, 2, 28), valor = 6000 });

            listDatos.Add(new DatosIndicadores() { detalle = "Cuentas por Pagar", periodo = new DateTime(2017, 12, 31), valor = 6000 }); 
            listDatos.Add(new DatosIndicadores() { detalle = "Cuentas por Pagar", periodo = new DateTime(2018, 2, 28), valor = 5500 }); 
            listDatos.Add(new DatosIndicadores() { detalle = "Cuentas por Pagar", periodo = new DateTime(2018, 12, 31), valor = 5000 }); 
            listDatos.Add(new DatosIndicadores() { detalle = "Cuentas por Pagar", periodo = new DateTime(2019, 2, 28), valor = 7000 });

            return listDatos;
        }
    }`;
  
  codigoNameSpace=
  `  using Newtonsoft.Json;
  using FancyReporting;`; 
  codigoGenerandoReporte=`//obteniendo datos
  string datosReporte = JsonConvert.SerializeObject(DatosIndicadores.getDatos());//Preparación de Datos
  string configuracionJson = System.IO.File.ReadAllText(@"C:\\modulosGeneradorInforme\\PruebaBasica\\configuracion.json");//Generación del Archivo de Configuración

  //generando reporte
  GeneracionInforme informeParte = new GeneracionInforme();
  MemoryStream file = new MemoryStream();
  file = informeParte.generarReporte(TipoReporte.InformeIVPeriodos, datosReporte, configuracionJson);

  //guardando el reporte
  file.Seek(0, SeekOrigin.Begin);
  SaveFileDialog SaveFileDialog = new SaveFileDialog();
  SaveFileDialog.OverwritePrompt = true;
  SaveFileDialog.FileName = "ReporteEjemplo";
  SaveFileDialog.DefaultExt = "docx";
  SaveFileDialog.Filter ="Word documents (*.docx)|*.docx|All files (*.*)|*.*";
  SaveFileDialog.InitialDirectory = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
  DialogResult result = SaveFileDialog.ShowDialog();
  Stream fileStream;
  if (result == DialogResult.OK)
  {
      fileStream = SaveFileDialog.OpenFile();

      file.WriteTo(fileStream);
      fileStream.Close();
  }`;
  

}
