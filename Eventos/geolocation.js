"use strict";
class Geolocation {
    constructor (){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this));
    }
    getPosicion(posicion){
        this.longitud         = posicion.coords.longitude; 
        this.latitud          = posicion.coords.latitude;  
    }
    getLongitud(){
        return this.longitud;
    }
    getLatitud(){
        return this.latitud;
    }
}
var position = new Geolocation();