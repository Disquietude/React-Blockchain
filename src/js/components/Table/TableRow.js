import React from 'react';

const TableRow = (props) => (
  <tr>
    <th>{props.rank}</th>
    <td>{props.symbol}</td>
    <td>{props.name}</td>
    <td>{props.price}</td>
    <td>
      <button className='button' onClick={(e) => props.remove(props.id, e)}>
        Remove
      </button>
    </td>
  </tr>
);

export default TableRow;