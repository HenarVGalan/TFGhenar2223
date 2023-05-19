export interface Tramo {
    ogc_fid?: number;
    //geon: geometry
    entity?: String;
    tipo?: String;
    puntocentro_latitud?: number;
    puntocentro_longitud?: number;
    puntoinicio_latitud?: number;
    puntoinicio_longitud?: number;
    puntofin_latitud?: number;
    puntofin_longitud?: number;
    poligonos?: JSON;
};