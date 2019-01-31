import React from 'react';
import { componentFromStream, createEventHandler } from 'recompose';
import { combineLatest, merge, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  catchError,
  debounceTime,
  delay,
  filter,
  map,
  pluck,
  startWith,
  switchMap,
  tap
} from 'rxjs/operators';

const App = componentFromStream(prop$ => {
  const { handler, stream } = createEventHandler();
  const clickStream$ = stream.pipe(
    map(e => e.target.value),
    startWith('')
  );

  return combineLatest(prop$, clickStream$).pipe(
    map(([props, value]) => (
      <div>
        <input onChange={handler} placeholder="GitHub username" />
        <User user={value} />
        <Table />
      </div>
    ))
  );
});

const User = componentFromStream(prop$ => {
  const loading$ = of(<h3>Loading...</h3>);
  const formatUrl = user => `https://api.github.com/users/${user}`;
  const getUser$ = prop$.pipe(
    debounceTime(500),
    pluck('user'),
    filter(user => user && user.length),
    map(formatUrl),
    switchMap(url =>
      merge(
        loading$,
        ajax(url).pipe(
          pluck('response'),
          delay(1500),
          map(({ avatar_url, name, email, hireable }) => (
            <ul>
              <img src={avatar_url} height="100" width="100" />
              <li>{name}</li>
              <li>{email}</li>
              <li>{hireable ? `✅ ` : `❌`}</li>
            </ul>
          )),
          catchError(error => of(<Error {...error} />))
        )
      )
    )
  );
  return getUser$;
});

const Table = componentFromStream(prop$ => {
  const url = `https://api.github.com/users?since=135`;

  return ajax(url).pipe(
    pluck('response'),
    tap(console.warn),
    map(users => (
      <ul>
        {users.map(({ avatar_url, name, email, hireable }) => (
          <li>
            <img src={avatar_url} height="100" width="100" />
            <p>{name}</p>
            <p>{email}</p>
            <p>{hireable ? `✅ ` : `❌`}</p>
          </li>
        ))}
      </ul>
    ))
  );
});

const Error = ({ response, status }) => (
  <div className="error">
    <h2>Oops!</h2>
    <b>
      {status}: {response.message}
    </b>
    <p>Please try searching again.</p>
  </div>
);

export default App;
