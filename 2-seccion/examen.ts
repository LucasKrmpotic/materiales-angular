
// Uso de Let y Const
let nombres = "Ricardo Tapia";
let edad = 23;

let PERSONAJE = {
  nombre: nombres,
  edad: edad
};


// Cree una interfaz que sirva para validar el siguiente objeto
var batman:SuperHeroe = {
  nombre: "Bruno Díaz",
  artesMarciales: ["Karate","Aikido","Wing Chun","Jiu-Jitsu"]
}

interface SuperHeroe {
  nombre:string;
  artesMarciales:string[]
}


let a:number = 1;
let b:number = 2; 
// Convertir esta funcion a una funcion de flecha
function resultadoDoble( a:number, b:number ){
  return (a + b) * 2
}

let resultadoDobleF = (a:number, b:number) =>  (a + b) * 2   

// Función con parametros obligatorios, opcionales y por defecto
// donde NOMBRE = obligatorio
//       PODER  = opcional
//       ARMA   = por defecto = "arco"
function getAvenger( nombre:string, poder?:string, arma:string = "arco" ){
  var mensaje;
  if( poder ){
     mensaje = nombre + " tiene el poder de: " + poder + " y un arma: " + arma;
  }else{
     mensaje = nombre + " tiene un " + poder
  }
};

// Cree una clase que permita manejar la siguiente estructura
// La clase se debe de llamar rectangulo,
// debe de tener dos propiedades:
//   * base
//   * altura
// También un método que calcule el área  =  base * altura,
// ese método debe de retornar un numero.
class Rectangulo {

  base:number; 
  altura:number;

  calcular_area():number{
    return this.base * this.altura
  };

}