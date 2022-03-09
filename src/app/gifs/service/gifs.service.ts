import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey:string= 'PxVBx6hlmgEsK1wQMkC9GHLc6GTtIMyJ';
  private servicioURL:string='https://api.giphy.com/v1/gifs';
  private _historial:string[]=[];
  public resultados:Gif[]=[];

  get historial(){
       return [...this._historial];
  }

  constructor(private http:HttpClient){

      this._historial=JSON.parse (localStorage.getItem('historial')!) || [];
        
  }

buscarGifs(query:string =''){

  query=query.trim().toLowerCase();

  if(query.trim().length ===0){
    return    ;
   }

   if(!this._historial.includes(query)){
    this._historial.unshift(query);
    this._historial=this._historial.splice(0,10);  

    localStorage.setItem('historial',JSON.stringify (this._historial));
   }

    const params=new HttpParams()
    .set('api_key',this.apiKey)
    .set('limit','20')
    .set('q',query);

           this.http.get<SearchGifsResponse>(`${this.servicioURL}/search`, {params})
           .subscribe((resp) => {
            
             this.resultados=resp.data;
      

         })
  }

}
