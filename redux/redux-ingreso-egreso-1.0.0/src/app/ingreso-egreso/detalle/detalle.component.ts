import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { IngresoEgreso } from 'src/app/auth/models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgreso[];
  ingresosEgresosSubs: Subscription;
  constructor(private store: Store<AppState>,
              private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.ingresosEgresosSubs = this.store
        .select('ingresosEgresos')
        .subscribe( ({ items }) => this.ingresosEgresos = items);
  }

  ngOnDestroy() {
    this.ingresosEgresosSubs.unsubscribe();
  }

  borrar( uid: string ) {
    this.ingresoEgresoService
        .borrarIngresoEgreso(uid)
        .then(() => Swal.fire('Borrado', 'Item borrado', 'success'))
        .catch((err) => Swal.fire('Error', err.message, 'error'));
  }
}
