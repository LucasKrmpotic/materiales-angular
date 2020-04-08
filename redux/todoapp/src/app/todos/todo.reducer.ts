import { createReducer, on } from '@ngrx/store';
import { crearTodo, toggle } from './todos.actions';
import { Todo } from './models/todo.model';


export const initialState: Todo[] = [
  new Todo('Primera tarea'),
  new Todo('Segunda tarea'),
  new Todo('Tercera tarea'),
  new Todo('Cuarta tarea')
];
// tslint:disable-next-line: variable-name
const _todoReducer = createReducer(initialState,
  on(crearTodo, (state, {texto}) => [...state, new Todo( texto )]),
  on(toggle, (state, {id}) => {
    return state.map(
      todo => ( todo.id === id )
        ? { ...todo, completado: !todo.completado}
        : todo
    );
  }),
);

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}
