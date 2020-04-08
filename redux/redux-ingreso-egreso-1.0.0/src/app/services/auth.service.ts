import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Usuario } from '../auth/models/usuario.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';

import * as authActions from '../auth/auth.actions';
import { Subscription } from 'rxjs';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;
  private _user: Usuario = null;

  constructor(public auth: AngularFireAuth,
              private firestore: AngularFirestore,
              private store: Store<AppState>) { }

  get user() {
    return {...this._user};
  }

  initAuthListener() {
    this.auth.authState.subscribe( fuser => {
      // console.log(fuser);
      if ( fuser ) {
        this.userSubscription = this.firestore.doc(`${fuser.uid}/usuario`)
            .valueChanges()
            .subscribe( (firestoreUser: any) => {
              const user = Usuario.fromFirebase(firestoreUser);
              this._user = user;
              this.store.dispatch( authActions.setUser({ user }));
            });
      } else {
        this._user = null;
        this.userSubscription.unsubscribe();
        this.store.dispatch( authActions.unSetUser() );
        this.store.dispatch( ingresoEgresoActions.unsetItems() );
      }
    });
  }

  crearUsuario(username: string, correo: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(correo, password)
        .then(({ user }) => {

          const newUser = new Usuario(user.uid, username, user.email);

          return this.firestore.doc(`${ user.uid }/usuario`).set({...newUser});
        });
  }

  loginUsuario(correo: string, password: string) {
    return this.auth.signInWithEmailAndPassword(correo, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(map( fuser => fuser != null ));
  }
}
