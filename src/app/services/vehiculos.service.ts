import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehiculos } from '../api/models';
import { VehiculosWithoutID } from '../api/models/vehiculos';

const ENDPOINT = 'vehiculos';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {

  constructor(private http: HttpClient
    ) { }
   //GET
   getAllVehiculos(){
      return this.http.get<Vehiculos[]>(`https://appbackendflotavehicular.herokuapp.com/${ENDPOINT}`)
    }
  
    //POST
    postVehiculos(vehiculos:VehiculosWithoutID){
      return this.http.post(`https://appbackendflotavehicular.herokuapp.com/${ENDPOINT}`,vehiculos);
    }
  
    //PUT
    putVehiculos(id:string,vehiculos:VehiculosWithoutID){
      return this.http.put(`https://appbackendflotavehicular.herokuapp.com/${ENDPOINT}/${id}`,vehiculos)
    }
  
    //PATCH
    patchVehiculos(id:string,vehiculos:VehiculosWithoutID){
      return this.http.patch(`https://appbackendflotavehicular.herokuapp.com/${ENDPOINT}/${id}`,vehiculos)
    }
  
    //DELETE
  deleteVehiculos(id:string){
      return this.http.delete(`https://appbackendflotavehicular.herokuapp.com/${ENDPOINT}/${id}`)
    }
  }