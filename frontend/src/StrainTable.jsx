import React from 'react';
import { useTable } from 'react-table';
import PropTypes from 'prop-types';
import _ from 'lodash';
/*
{
      "Name": "White Widow",
      "Type": "Hybrid",
      "Alias": "NA",
      "Rating": "4.3",
      "Num_Reviews": "4402",
      "THC%": "THC 15%",
      "Other_Cannabinoids": "CBG 1%",
      "Main_Effect": "Energetic",
      "Terpene": "Myrcene"
    },
*/

// Utility function to process THC values
const getPercent = (text) => {
  if (!text) return 0; // Handle null or undefined values
  const extractedNumber = text.split(' ')[1].replace('%', '');
  return extractedNumber ? parseFloat(extractedNumber) : 0;
};

const getFields = (data) => {
  const fields = ['Name', 'Type', 'THC', 'Rating'];
  return data.map(obj => _.pick(obj, fields));
}

const StrainTable = ({ data }) => {
  // const filteredData = React.useMemo(() => getFields(data), [data])
  // // If no data is available, return early
  // if (!filteredData || filteredData.length === 0) {
  //   return <p>No strains found</p>;
  // }

  // const extractedData = getFields(data);
  console.log("Data received by StrainTable:", data)
  const columns = React.useMemo(
    () => [
      { Header: 'Name', accessor: 'Name' },
      { Header: 'Type', accessor: 'Type' },
      {
        Header: 'THC',
        accessor: 'THC%',
        Cell: ({ value }) => getPercent(value),
      },
      { Header: 'Rating', accessor: 'Rating' },
    ],
    [] // Static dependency array since columns won't change
  );

  // Use react-table hooks
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <table
      {...getTableProps()}
      style={{ borderCollapse: 'collapse', width: '100%' }}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                key={column.id || column.accessor}
                style={{
                  border: '1px solid #ddd',
                  padding: '8px',
                  background: '#f4f4f4',
                  textAlign: 'left',
                }}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={row.id}>
              {row.cells.map((cell) => (
                <td
                  {...cell.getCellProps()}
                  key={cell.column.id}
                  style={{ border: '1px solid #ddd', padding: '8px' }}
                >
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

// Add PropTypes validation for props
StrainTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      Name: PropTypes.string.isRequired, // Name is required
      Type: PropTypes.string.isRequired, // Type is required
      'THC%': PropTypes.string, // THC% is optional but must be a string
      Rating: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
    })
  ).isRequired, // The `data` prop itself is required
};

export default StrainTable;
