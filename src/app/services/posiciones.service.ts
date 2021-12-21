import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Posiciones } from '../api/models';
import { PosicionesWithoutID } from '../api/models/posiciones';

const ENDPOINT = 'posiciones';

@Injectable({
  providedIn: 'root'
})
export class PosicionesService {


  constructor(private http: HttpClient
    ) { }
   //GET
   getAllPosiciones(){
      return this.http.get<Posiciones[]>(`https://appbackendflotavehicular.herokuapp.com/${ENDPOINT}`)
    }
  
    //POST
    postPosiciones(Posiciones:PosicionesWithoutID){
      return this.http.post(`https://appbackendflotavehicular.herokuapp.com/${ENDPOINT}`,Posiciones);
    }
  
    //PUT
    putPosiciones(id:string,Posiciones:PosicionesWithoutID){
      return this.http.put(`https://appbackendflotavehicular.herokuapp.com/${ENDPOINT}/${id}`,Posiciones)
    }
  
    //PATCH
    patchPosiciones(id:string,Posiciones:PosicionesWithoutID){
      return this.http.patch(`https://appbackendflotavehicular.herokuapp.com/${ENDPOINT}/${id}`,Posiciones)
    }
  
    //DELETE
  deletePosiciones(id:string){
      return this.http.delete(`https://appbackendflotavehicular.herokuapp.com/${ENDPOINT}/${id}`)
    }
  }