import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Todo } from '../models/todo.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../todos.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @ViewChild('inputFisico', { static: true }) txtInputFisico: ElementRef;

  chkCompletado: FormControl;
  txtInput: FormControl;

  editando = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    this.chkCompletado = new FormControl( this.todo.completado );
    this.txtInput = new FormControl( this.todo.texto, Validators.required );

    this.chkCompletado.valueChanges.subscribe( valor => {
      this.store.dispatch( actions.toggle({ id: this.todo.id}));
    });
  }

  editar() {

    this.editando = true;

    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 1);
  }

  terminarEdicion() {
    this.editando = false;
  }
}
