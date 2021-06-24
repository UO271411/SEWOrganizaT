class Map{
    constructor(longitud, latitud){
        this.latitud = latitud;
        this.longitud = longitud;
    }
    getMap(){
        mapboxgl.accessToken = 'pk.eyJ1IjoidW8yNzE0MTEiLCJhIjoiY2tveW5xemE5MDRxbTJubjNkNGV2M2p2ZCJ9.R-pcwQI9lm1TiMVevNU2qA'; 
        return new mapboxgl.Map({ 
            container: 'map', 
            style: 'mapbox://styles/mapbox/streets-v11',  
            center: [this.latitud, this.longitud],  
            zoom: 15
        }); 
    }  
}