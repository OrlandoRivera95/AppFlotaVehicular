/* tslint:disable */
/* eslint-disable */
export interface Rutas {
  distancia: number;
  id: string;
  lugar_final: string;
  lugar_inicio: string;

  [key: string]: any;
}

export class RutasWithoutID {
  "distancia": number;
  "lugar_final": string;
  "lugar_inicio": string;
}