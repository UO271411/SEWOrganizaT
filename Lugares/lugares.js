class Meteo {
    constructor(){
        this.apikey = "XeM0R_sjjg5ZmrAccJsioLnGpVF_XqJ_z2Mv2QMgfNc";
        
        $.ajax({
            dataType: "xml",
            url: "lugares.xml",
            method: 'GET',
            success: function(datos){        
                // Obtenemos los elementos a utilizar
                var ciudades = $('nombre',datos);
                var descripciones = $('descripcion',datos);
                var fotos = $('imagen',datos);
                
                // A partir del xml cargamos los elementos del html de forma dinámica
                $("#titulo1").text(ciudades.get(0).textContent);
                $("#titulo2").text(ciudades.get(1).textContent);
                $("#titulo3").text(ciudades.get(2).textContent);
                $("#texto1").text(descripciones.get(0).textContent);
                $("#texto2").text(descripciones.get(1).textContent);
                $("#texto3").text(descripciones.get(2).textContent);
                $("#imagen1").attr("src", fotos.get(0).textContent);
                $("#imagen2").attr("src", fotos.get(3).textContent);
                $("#imagen3").attr("src", fotos.get(4).textContent);
                $("#imagen1").attr("alt", "Imagen de Covadonga");
                $("#imagen1").attr("alt", "Imagen de Llanes");
                $("#imagen3").attr("alt", "Imagen de Gijon");
                
                // Y obtenemos las coordenadas de los lugares para utilizarlas en la url
                
            },
            error:function(){
                $("#titulo1").html("Lo sentimos, no se ha podido cargar el archivo XML correctamente");
                $("#titulo2").remove();
                $("#titulo3").remove();
                $("img").remove();
                $("button").remove();
            }
        });
    }
    cargarDatos(latitud, longitud, idLugar){        
        this.url = "https://weather.ls.hereapi.com/weather/1.0/report.xml?product=observation&latitude="+latitud+"&longitude="+longitud+"&oneobservation=true&apiKey="+this.apikey;
        $.ajax({
            dataType: "xml",
            url: this.url,
            method: 'GET',
            success: function(datos){
                    $("pre").text(JSON.stringify(datos, null, 2));
                
                    //Obtencion de datos
                    var totalNodos            = $('*',datos).length; // cuenta los elementos de XML: son los nodos del árbol DOM de XML
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
    verJSON(latitud, longitud, idBoton, idLugar){
        //Muestra el archivo JSON recibido
        this.cargarDatos(latitud, longitud, idLugar);
        $(idBoton).attr("disabled","disabled");
        $(idBoton).attr("title","La información meteorológica ya se está mostrando");
    }
}
var meteo = new Meteo();