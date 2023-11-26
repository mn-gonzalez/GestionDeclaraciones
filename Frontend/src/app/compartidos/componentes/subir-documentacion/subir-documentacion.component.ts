import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { DeclaracionService } from 'src/app/servicios/declaracion.service';

@Component({
  selector: 'app-subir-documentacion',
  templateUrl: './subir-documentacion.component.html',
  styleUrls: ['./subir-documentacion.component.css']
})
export class SubirDocumentacionComponent {
  @Input() public ocultar: boolean;
  @Input() public rutDeudor:string;
  @Input() public idDeclaracion: string;
  @Input() public detalleDocumento: string;
  @Input() public nombreDocumento: string;
  @Input() public tipoDocumento: string;
  @Input() public documento: File;
  @Input() public soloVista: boolean;
  
  constructor( private declaracionService: DeclaracionService ) { 

  }

  ngOnInit(): void {

  }

  upload(event: any){
    this.documento = event.target.files[0];
    this.subirDocumento();
  }

  subirDocumento(){
    this.declaracionService.subirDocumentacionDeclaracion(this.rutDeudor, this.idDeclaracion, this.nombreDocumento, this.tipoDocumento, this.documento);
  }

  visualizarPDF(){
    var blob = new Blob;
    blob = new Blob([this.documento], {type: 'application/pdf'});
    var blobURL = URL.createObjectURL(blob);
    window.open(blobURL);
  }

  eliminarDocumento(event: any){
    if(this.documento != null){
      event.target.files = null;
      this.documento = event.target.files;
      this.declaracionService.eliminarDocumento(this.idDeclaracion, this.tipoDocumento);
    }
    
  }
}


