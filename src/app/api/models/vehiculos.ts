/* tslint:disable */
/* eslint-disable */
export interface Vehiculos {
  color: string;
  id: string;
  marca: string;
  placa: string;
  tipoVehiculo: string;

  [key: string]: any;
}

export class VehiculosWithoutID {
  "color": string;
  "marca": string;
  "placa": string;
  "tipoVehiculo": string;
}