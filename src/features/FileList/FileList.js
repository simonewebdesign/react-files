import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import escapeRegExp from 'lodash.escaperegexp';
import { selectFiles, fetchFiles } from './fileListSlice';
import { MemoizedFile as File } from '../File/File';
import { Loading } from '../Loading/Loading';
import { nextOrder, orderIcon, sortBy } from '../../lib/sorting';
import { table } from './FileList.module.css';

export function FileList() {
  const files = useSelector(selectFiles);
  const dispatch = useDispatch();
  const [order, setOrder] = useState(null); // either 'field', '-field' or null
  const [query, setQuery] = useState('');

  if (!files.isFetching && !files.didFetchSuccessfully) {
    dispatch(fetchFiles());
  }

  if (files.isFetching) {
    return [<Loading key="loading" />, <h1 key="title">Loading files...</h1>];
  }

  const sort = (fieldName) => (_e) => {
    setOrder(nextOrder(order, fieldName));
  };

  const iconFor = orderIcon(order);

  let list = Object.values(files.byId);

  if (order && order.startsWith('-')) {
    list = list.sort(sortBy(order.substring(1), true));
  } else {
    list = list.sort(sortBy(order));
  }

  const regex = new RegExp(escapeRegExp(query), 'i');

  return (
    <table className={table}>
      <caption>
        Listing Files
        <input
          type="search"
          placeholder="Search by name..."
          onChange={e => setQuery(e.target.value.trim())}
        />
      </caption>
      <thead>
        <tr>
          <th>
            <button type="button" onClick={sort('id')}>
              {iconFor('id')} ID
            </button>
          </th>
          <th>
            <button type="button" onClick={sort('name')}>
              {iconFor('name')} Name
            </button>
          </th>
          <th>
            <button type="button" onClick={sort('ext')}>
              {iconFor('ext')} Ext
            </button>
          </th>
          <th>
            <button type="button" onClick={sort('desc')}>
              {iconFor('desc')} Description
            </button>
          </th>
          <th>
            <button type="button" onClick={sort('created')}>
              {iconFor('created')} Created
            </button>
          </th>
          <th>
            <button type="button" onClick={sort('size')}>
              {iconFor('size')} Size
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {list.map((file) => {
          if (!regex.test(file.name)) {
            return null;
          }
          return <File key={`file-${file.id}`} {...file} />;
        })}
      </tbody>
    </table>
  );
}
