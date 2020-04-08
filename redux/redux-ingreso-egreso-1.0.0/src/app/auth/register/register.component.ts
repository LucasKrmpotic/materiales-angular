import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { AppState } from '../../app.reducers';
import * as ui from 'src/app/shared/ui.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm: FormGroup;
  cargando = false;
  uiSubscription: Subscription;

  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private store: Store<AppState>,
               private router: Router) { }

  ngOnInit() {

    this.registroForm = this.fb.group({
      username: ['', Validators.required],
      correo: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.uiSubscription = this.store.select('ui')
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe( ui => this.cargando = ui.isLoading);
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }


  crearUsuario() {

    if (this.registroForm.invalid) { return; }
    this.store.dispatch( ui.isLoading());

    const { username, correo, password } = this.registroForm.value;
    this.authService.crearUsuario(username, correo, password)
        .then( credenciales => {
          this.store.dispatch( ui.stopLoading());
          this.router.navigate(['/']);
        })
        .catch(err => {
          this.store.dispatch( ui.stopLoading());
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message,
          });
        });
  }
}
