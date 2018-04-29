function saludar( nombre:string) {

    console.log(" hola " + nombre.toUpperCase());
}

var alguien = {

    nombre: "Lucas"

};

saludar(alguien.nombre);


// let difiere de var en que la variable es declarada dentro del scope
let mensaje = "hola"; 

if ( true ) {
    let mensaje = "chau";
    console.log(mensaje)
}

console.log( mensaje );

let nombre = "Pedro"

let hulk = {
    nombre:"Hulk",
    smash(){
        // así declarado el this apunta al scope global, nombre toma el valor "Pedro"
        /*
            setTimeout(function() {
                console.log(this.nombre + " smash!! ")
            }, 1500);

        */
        // en cambio con la funcion anónima el this apunta al objeto actual
        setTimeout( () => {
            console.log(this.nombre + " smash!! ")
        }, 1500);
    }
}

hulk.smash();


// desestructuración de objetos

let algo = {
    unaCosa: "piola",
    otraCosa: "piolísima",
    unaCosaMas: "recontra piola"
}

// podemos desestructurar objetos en una sola línea
// let {unaCosa, otraCosa, unaCosaMas} = algo; 

// console.log(unaCosa, otraCosa, unaCosaMas);

// si en la desestructuración agrego ":" puedo definir aliases
let {unaCosa:cosa1, otraCosa:cosa2, unaCosaMas:cosa3} = algo; 

console.log(cosa1, cosa2, cosa3);

// podemos desestructurar arreglos igual pero en lugar de {} usamos []

let varios:string[] = ["algo1", "algo2", "algo3"]; 

let [ algo1, algo2, algo3 ] = varios; 

console.log(algo1, algo2, algo3);

// la diferencia es que en los arreglos la desestructuración es secuencial
// mientras que en los objetos no importa el orden en el que desestructure
// importa el nombre de las propiedades del objeto (si quiero cambiarselo uso alias )

// por lo tanto si quiero desestructurar pero solo quedarme con la 3era pos del arreglo:

let [ , , algo3prima] = varios;

console.log(algo3prima);

// CLASES

// declaracion básica
class Avenger {
    nombre:string = "Antman"; 
    equipo:string; 
    nombreReal:string;

    puedePelear:boolean;
    peleasGanadas:number;

    // El constructor por defecto inicializa las propiedades con valores por defecto o undefined

    // Sólo puede haber un constructor explícito
    constructor( nombre:string, equipo:string, nombreReal:string){
        this.nombre =  nombre;
        this.equipo = equipo;
        this.nombreReal = nombreReal;
    }



}

let klass = new Avenger("uno", "dos", "tres");

let otro = new Avenger("1", "2", "tresPrima");

console.log(klass);
console.log(otro);