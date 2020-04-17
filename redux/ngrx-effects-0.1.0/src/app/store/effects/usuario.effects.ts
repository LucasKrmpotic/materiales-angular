import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuarioActions from '../actions';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';
import { of } from 'rxjs';

@Injectable()
export class UsuarioEffects {
    
    constructor( private action$: Actions,
                 private usuarioService: UsuarioService) {}

    cargarUsuario$ = createEffect(
        () => this.action$.pipe(
            ofType( usuarioActions.cargarUsuario ),
            mergeMap(
                ( action ) => this.usuarioService
                          .getUserById(action.id)
                          .pipe(
                                map( user => usuarioActions.cargarUsuarioSuccess({usuario: user})),
                                catchError( err => of(usuarioActions.cargarUsuarioError({payload: err})))
                          )
            )

        )
    )
}