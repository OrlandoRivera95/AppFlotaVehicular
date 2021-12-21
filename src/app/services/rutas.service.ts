import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rutas } from '../api/models';
import { RutasWithoutID } from '../api/models/rutas';

// Agregue la Funcion Service para realizar el CRUD.
// Utilizando Asi tambien los Models del Openapi.

const ENDPOINT = 'rutas';

@Injectable({
  providedIn: 'root'
})
export class RutasService {

  constructor(private http: HttpClient
    ) { }
   //GET
   getAllRutas(){
      return this.http.get<Rutas[]>(`https://appbackendflotavehicular.herokuapp.com/${ENDPOINT}`)
    }
  
    //POST
    postRutas(Rutas:RutasWithoutID){
      return this.http.post(`https://appbackendflotavehicular.herokuapp.com/${ENDPOINT}`,Rutas);
    }
  
    //PUT
    putRutas(id:string,Rutas:RutasWithoutID){
      return this.http.put(`https://appbackendflotavehicular.herokuapp.com/${ENDPOINT}/${id}`,Rutas)
    }
  
    //PATCH
    patchRutas(id:string,Rutas:RutasWithoutID){
      return this.http.patch(`https://appbackendflotavehicular.herokuapp.com/${ENDPOINT}/${id}`,Rutas)
    }
  
    //DELETE
  deleteRutas(id:string){
      return this.http.delete(`https://appbackendflotavehicular.herokuapp.com/${ENDPOINT}/${id}`)
    }
  }