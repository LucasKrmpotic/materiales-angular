import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { IngresoEgreso } from '../auth/models/ingreso-egreso.model';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import * as ui from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoEgresoForm: FormGroup;
  tipo = 'ingreso';
  cargando = false;
  uiSubscription: Subscription;

  constructor(private fb: FormBuilder,
              private ingresoEgresoService: IngresoEgresoService,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.uiSubscription = this.store.select('ui')
    // tslint:disable-next-line: no-shadowed-variable
      .subscribe( ui => this.cargando = ui.isLoading);

    this.ingresoEgresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  guardar() {

    if (this.ingresoEgresoForm.invalid) { return; }
    this.store.dispatch( ui.isLoading());

    const { descripcion, monto } = this.ingresoEgresoForm.value;
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);

    this.ingresoEgresoService
            .crearIngresoEgreso( ingresoEgreso )
            .then(() => {
              this.store.dispatch(ui.stopLoading());
              this.ingresoEgresoForm.reset();
              Swal.fire('Registro creado', descripcion, 'success');
            })
            .catch( err => {
              this.store.dispatch(ui.stopLoading());
              Swal.fire('Error', err.message, 'error');
            });
  }

}
