/* tslint:disable */
/* eslint-disable */

/**
 * (tsType: Omit<Transportistas, 'id'>, schemaOptions: { title: 'NewTransportistas', exclude: [ 'id' ] })
 */
export interface NewTransportistas {
  Identidad: string;
  licencia: string;
  nombre: string;

  [key: string]: any;
}
