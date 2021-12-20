/* tslint:disable */
/* eslint-disable */

/**
 * (tsType: Omit<Rutas, 'id'>, schemaOptions: { title: 'NewRutas', exclude: [ 'id' ] })
 */
export interface NewRutas {
  distancia: number;
  lugar_final?: string;
  lugar_inicio?: string;

  [key: string]: any;
}
