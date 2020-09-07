import React from 'react';

export function File({ id, name, ext, desc, created, size }) {
  return (
    <tr>
      <td className="id">{id}</td>
      <td className="name truncate">{name}</td>
      <td className="ext">{ext}</td>
      <td className="desc truncate">{desc}</td>
      <td className="created">{new Date(created).toLocaleString()}</td>
      <td className="size">{size}</td>
    </tr>
  );
}

export const MemoizedFile = React.memo(File);
