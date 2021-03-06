import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubscription: Subscription;
  ingresosEgresosSubscription: Subscription;

  constructor(private store: Store<AppState>,
              private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {

    this.userSubscription = this.store.select('user')
        .pipe(
          filter( auth => auth.user != null )
        )
        .subscribe( ({user}) => {
          console.log(user);
          this.ingresosEgresosSubscription = this.ingresoEgresoService.initIgresosegresosListener( user.uid )
              .subscribe( ingresosEgresosFB => {
                this.store.dispatch( ingresoEgresoActions.setItems({ items: ingresosEgresosFB}))
              });
        });

  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.ingresosEgresosSubscription.unsubscribe();
  }

}
