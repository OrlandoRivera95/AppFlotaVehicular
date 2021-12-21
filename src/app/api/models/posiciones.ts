/* tslint:disable */
/* eslint-disable */
export interface Posiciones {
  altitud?: string;
  id: string;
  latitud: number;
  longitud: number;

  [key: string]: any;
}

export class PosicionesWithoutID {
  "altitud": number;
  "latitud": string;
  "longitud": string;
}

