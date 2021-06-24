class Meteo {
    constructor(latitud, longitud){
        this.apikey = "XeM0R_sjjg5ZmrAccJsioLnGpVF_XqJ_z2Mv2QMgfNc";
        this.latitud = latitud;
        this.longitud = longitud;
        this.url = "https://weather.ls.hereapi.com/weather/1.0/report.xml?product=observation&latitude="+this.latitud+"&longitude="+this.longitud+"&oneobservation=true&apiKey="+this.apikey;
    }
    cargarDatos(idLugar){
        $.ajax({
            dataType: "xml",
            url: this.url,
            method: 'GET',
            success: function(datos){
                    $("pre").text(JSON.stringify(datos, null, 2));
                
                    //Obtencion de datos
                    var ciudad                = $('location',datos).attr("city");
                    var comunidad             = $('location',datos).attr("state");
                    var pais                  = $('location',datos).attr("country");
                    var longitud              = $('location',datos).attr("longitude");
                    var latitud               = $('location',datos).attr("latitude");
                    var temperatura           = $('temperature',datos).text();
                    var temperaturaMin        = $('lowTemperature',datos).text();
                    var temperaturaMax        = $('highTemperature',datos).text();
                    var sensacion             = $('comfort',datos).text();
                    var humedad               = $('humidity',datos).text();
                    var presion               = $('barometerPressure',datos).text();
                    var velocidadViento       = $('windSpeed',datos).text();
                    var direccionViento       = $('windDirection',datos).text();
                    var nombreDireccionViento = $('windDescShort',datos).text();
                    var icon                  = $('iconLink',datos).text();
                
                    //Presentación de los datos contenidos en JSON
                    var stringDatos = "<img class=\"small\" src='" + icon +"'>";
                        stringDatos += "<li><b>Ciudad:</b> " + ciudad + "</li>";
                        stringDatos += "<li><b>Región:</b> " + comunidad + "</li>";
                        stringDatos += "<li><b>País:</b> " + pais + "</li>";
                        stringDatos += "<li><b>Longitud:</b> " + longitud + " grados</li>";
                        stringDatos += "<li><b>Latitud:</b> " + latitud + " grados</li>";
                        stringDatos += "<li><b>Temperatura:</b> " + temperatura + " grados Celsius</li>";
                        stringDatos += "<li><b>Temperatura mínima:</b> " + temperaturaMin + " grados Celsius</li>";
                        stringDatos += "<li><b>Temperatura máxima:</b> " + temperaturaMax + " grados Celsius</li>";
                        stringDatos += "<li><b>Sensación térmica:</b> " + sensacion + " grados Celsius</li>";
                        stringDatos += "<li><b>Humedad:</b> " + humedad + " g/m3</li>";
                        stringDatos += "<li><b>Presión:</b> " + presion + " N/m2</li>";
                        stringDatos += "<li><b>Velocidad del viento:</b> " + velocidadViento + " metros/segundo</li>";
                        stringDatos += "<li><b>Dirección del viento:</b> " + direccionViento + " grados (" + nombreDireccionViento + ")</li>";                        
                    
                    $(idLugar).html(stringDatos);
                },
            error:function(){
                $(idLugar).html("¡Tenemos problemas! No puedo obtener JSON de <a href='https://developer.here.com/'>Weather is Here API</a>"); 
            }
        });
    }
    verJSON(idBoton, idLugar){
        //Muestra el archivo JSON recibido
        this.cargarDatos(idLugar);
        $(idBoton).attr("disabled","disabled");
        $(idBoton).attr("title","La información meteorológica ya se está mostrando");
    }
}
var meteo1;