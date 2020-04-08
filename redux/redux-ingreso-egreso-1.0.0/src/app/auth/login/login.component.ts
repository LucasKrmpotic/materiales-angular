import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import * as ui from 'src/app/shared/ui.actions';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  cargando = false;
  uiSubscription: Subscription;


  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private store: Store<AppState>,
               private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.uiSubscription = this.store.select('ui')
        // tslint:disable-next-line: no-shadowed-variable
        .subscribe( ui => this.cargando = ui.isLoading);
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  login() {
    if (this.loginForm.invalid) { return; }
    this.store.dispatch( ui.isLoading());

    // Swal.fire({
    //   title: 'Cargando',
    //   onBeforeOpen: () => {
    //     Swal.showLoading();
    //   }
    // });

    const { correo, password } = this.loginForm.value;
    this.authService.loginUsuario(correo, password)
        .then( credenciales => {
          // Swal.close();
          this.store.dispatch(ui.stopLoading());
          this.router.navigate(['/']);
        })
        .catch(err => {
          this.store.dispatch(ui.stopLoading());
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message,
          });
        });
  }

}
