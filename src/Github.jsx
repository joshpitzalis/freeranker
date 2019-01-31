import React from 'react';
import { componentFromStream, createEventHandler } from 'recompose';
import { combineLatest } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  debounceTime,
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
  const formatUrl = user => `https://api.github.com/users/${user}`;
  const getUser$ = prop$.pipe(
    debounceTime(500),
    pluck('user'),
    filter(user => user && user.length),
    map(formatUrl),
    switchMap(url =>
      ajax(url).pipe(
        pluck('response'),
        tap(console.warn),
        map(({ avatar_url, name, email, hireable }) => (
          <ul>
            <img src={avatar_url} height="100" width="100" />
            <li>{name}</li>
            <li>{email}</li>
            <li>{hireable ? `✅ ` : `❌`}</li>
          </ul>
        ))
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

export default App;
