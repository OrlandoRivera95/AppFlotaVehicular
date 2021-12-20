/* tslint:disable */
/* eslint-disable */
export interface Transportistas {
  Identidad: string;
  id: string;
  licencia: string;
  nombre: string;

  [key: string]: any;
}

/*export class TransportistasS {
  "id": string;
  "Identidad": string;
  "nombre": string;
  "licencia": string;
}*/

export class TransportistasWithoutID {
  "Idenditad": string;
  "licencia": string;
  "nombre": string;
}