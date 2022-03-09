import { Component } from '@angular/core';
import { GifsService } from '../../gifs/service/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',

})
export class SidebarComponent  {
  
  textDragon:string= "dragon ball"
  

  get historial(){
    return this.GifsService.historial;
  }

  constructor(private GifsService: GifsService){
    
    this.buscar( this.textDragon)
  }


  buscar(termino:string){
   this.GifsService.buscarGifs(termino);
    
  }
  

 

}
