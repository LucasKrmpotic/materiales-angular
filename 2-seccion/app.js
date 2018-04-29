function saludar(nombre) {
    console.log(" hola " + nombre.toUpperCase());
}
var alguien = {
    nombre: "Lucas"
};
saludar(alguien.nombre);
// let difiere de var en que la variable es declarada dentro del scope
var mensaje = "hola";
if (true) {
    var mensaje_1 = "chau";
    console.log(mensaje_1);
}
console.log(mensaje);
var nombre = "Pedro";
var hulk = {
    nombre: "Hulk",
    smash: function () {
        var _this = this;
        // así declarado el this apunta al scope global, nombre toma el valor "Pedro"
        /*
            setTimeout(function() {
                console.log(this.nombre + " smash!! ")
            }, 1500);

        */
        // en cambio con la funcion anónima el this apunta al objeto actual
        setTimeout(function () {
            console.log(_this.nombre + " smash!! ");
        }, 1500);
    }
};
hulk.smash();
// desestructuración de objetos
var algo = {
    unaCosa: "piola",
    otraCosa: "piolísima",
    unaCosaMas: "recontra piola"
};
// podemos desestructurar objetos en una sola línea
// let {unaCosa, otraCosa, unaCosaMas} = algo; 
// console.log(unaCosa, otraCosa, unaCosaMas);
// si en la desestructuración agrego ":" puedo definir aliases
var cosa1 = algo.unaCosa, cosa2 = algo.otraCosa, cosa3 = algo.unaCosaMas;
console.log(cosa1, cosa2, cosa3);
// podemos desestructurar arreglos igual pero en lugar de {} usamos []
var varios = ["algo1", "algo2", "algo3"];
var algo1 = varios[0], algo2 = varios[1], algo3 = varios[2];
console.log(algo1, algo2, algo3);
// la diferencia es que en los arreglos la desestructuración es secuencial
// mientras que en los objetos no importa el orden en el que desestructure
// importa el nombre de las propiedades del objeto (si quiero cambiarselo uso alias )
// por lo tanto si quiero desestructurar pero solo quedarme con la 3era pos del arreglo:
var algo3prima = varios[2];
console.log(algo3prima);
// CLASES
// declaracion básica
var Avenger = /** @class */ (function () {
    // El constructor por defecto inicializa las propiedades con valores por defecto o undefined
    // Sólo puede haber un constructor explícito
    function Avenger(nombre, equipo, nombreReal) {
        this.nombre = "Antman";
        this.nombre = nombre;
        this.equipo = equipo;
        this.nombreReal = nombreReal;
    }
    return Avenger;
}());
var klass = new Avenger("uno", "dos", "tres");
var otro = new Avenger("1", "2", "tresPrima");
console.log(klass);
console.log(otro);
