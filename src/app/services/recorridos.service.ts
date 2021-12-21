import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recorridos } from '../api/models';
import { RecorridosWithoutID } from '../api/models/recorridos';


const ENDPOINT = 'recorridos';
@Injectable({
  providedIn: 'root'
})
export class RecorridosService {

  constructor(private http: HttpClient
    ) { }
   //GET
   getAllRecorridos(){
      return this.http.get<Recorridos[]>(`https://appbackendflotavehicular.herokuapp.com/${ENDPOINT}`)
    }
  
    //POST
    postRecorridos(Recorridos:RecorridosWithoutID){
      return this.http.post(`https://appbackendflotavehicular.herokuapp.com/${ENDPOINT}`,Recorridos);
    }
  
    //PUT
    putRecorridos(id:string,Recorridos:RecorridosWithoutID){
      return this.http.put(`https://appbackendflotavehicular.herokuapp.com/${ENDPOINT}/${id}`,Recorridos)
    }
  
    //PATCH
    patchRecorridos(id:string,Recorridos:RecorridosWithoutID){
      return this.http.patch(`https://appbackendflotavehicular.herokuapp.com/${ENDPOINT}/${id}`,Recorridos)
    }
  
    //DELETE
  deleteRecorridos(id:string){
      return this.http.delete(`https://appbackendflotavehicular.herokuapp.com/${ENDPOINT}/${id}`)
    }
  }