import { Avatar, Table, Tag } from 'antd';
import React from 'react';
import { componentFromStream, createEventHandler } from 'recompose';
import { combineLatest, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map, pluck, startWith } from 'rxjs/operators';

const App = componentFromStream(prop$ => {
  const { handler, stream } = createEventHandler();
  const clickStream$ = stream.pipe(
    map(e => e.target.value),
    startWith('')
  );

  return combineLatest(prop$, clickStream$).pipe(
    map(([props, value]) => (
      <div>
        <TableData />
      </div>
    ))
  );
});

const TableData = componentFromStream(prop$ => {
  const url = `https://www.freelancer.com/api/users/0.1/users/directory?jobs=[1]&&avatar=true&&portfolio_details=true`;

  const columns = [
    {
      title: '',
      dataIndex: 'avatar',
      key: 'avatar',
      render: url => <Avatar src={`https://www.freelancer.in/${url}`} />
    },
    {
      title: 'Name',
      dataIndex: 'username',
      key: 'name',
      render: text => <a href="javascript:;">{text}</a>
    },
    {
      title: 'Hourly Rate',
      dataIndex: 'hourly_rate',
      key: 'hourly_rate',
      render: rate => <p>${rate}/hour</p>
    },
    {
      title: 'Location',
      dataIndex: 'location.country.name',
      key: 'location'
    },
    {
      title: 'Jobs Completed',
      dataIndex: 'portfolio_count',
      key: 'portfolio_count'
    },

    {
      title: 'Categories',
      key: 'tags',
      dataIndex: 'jobs',
      render: jobs => {
        const jobTags = jobs.map(job => job.category.name);
        const uniqueArray = [...new Set(jobTags)];
        return (
          <span>
            {uniqueArray.map(tag => (
              <Tag color="green" key={tag}>
                {tag.toUpperCase()}
              </Tag>
            ))}
          </span>
        );
      }
    },
    {
      title: 'Hire',
      dataIndex: 'username',
      key: 'hire',
      render: username => (
        <a href={`https://www.freelancer.in/u/${username}`}>Hire</a>
      )
    }
  ];

  return ajax(url).pipe(
    pluck('response'),
    map(data => <Table columns={columns} dataSource={data.result.users} />),
    catchError(error => of(<Error {...error} />))
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
