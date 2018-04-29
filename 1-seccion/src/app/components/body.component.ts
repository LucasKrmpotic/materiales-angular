import { Component } from '@angular/core';

@Component({
    selector: 'app-body',
    templateUrl: 'body.component.html'
  })
export class BodyComponent {

  mostrar = false;

  frase = {
    mensaje: 'un mensaje',
    autor: 'un autor'
  };

  personajes: string[] = ['uno', 'dos', 'tres'];
}
