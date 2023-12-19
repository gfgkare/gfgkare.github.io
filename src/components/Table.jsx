import { useState } from "react";
import { useFilters, useSortBy, useTable, useGlobalFilter } from "react-table";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

import { MdOutlineStars } from "react-icons/md";
import { useMemo } from 'react';

import "../styles/Table.scss"

// export default function Table({ columns, data }) {
//   // Use the useTable Hook to send the columns and data to build the table
//   const {
//     getTableProps, // table props from react-table
//     getTableBodyProps, // table body props from react-table
//     headerGroups, // headerGroups, if your table has groupings
//     rows, // rows for the table based on the data passed
//     prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
//     setFilter
//   } = useTable({
//     columns,
//     data
//   },
//     useFilters,
//     useSortBy
//   );

//   const [filterInput, setFilterInput] = useState("");

//     // Update the state when input changes
//     const handleFilterChange = e => {
//         const value = e.target.value || undefined;
//         setFilter("show.name", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
//         setFilterInput(value);
//     };

//   /* 
//     Render the UI for your table
//     - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
//   */
//   return (
//     <>
//         <input
//         className="leaderboardSearch"
//         value={filterInput}
//         onChange={handleFilterChange}
//         placeholder={"Search name"}
//         />
    
//         <table {...getTableProps()}>
//         <thead>
//             {headerGroups.map(headerGroup => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map(column => (
//                 <th
//                 {...column.getHeaderProps(column.getSortByToggleProps())}
//                 className={
//                   "rowHeaders " + 
//                   (column.isSorted
//                     ? column.isSortedDesc
//                       ? "sort-desc"
//                       : "sort-asc"
//                     : "")
//                 }
//                 >
//                     <span>
//                       {column.render("Header")}
//                     </span>
//                     {
//                       (column.isSorted
//                         ? column.isSortedDesc
//                           ? <FaSortDown />
//                           : <FaSortUp />
//                         : <FaSort />)
//                     }
//                 </th>
//                 ))}
//             </tr>
//             ))}
//         </thead>
//         <tbody className="tbody" {...getTableBodyProps()}>
//             {rows.map((row, i) => {
//             prepareRow(row);
//             return (
//                 <tr className="tr" {...row.getRowProps()}>
//                 {row.cells.map(cell => {
//                     return <td className="td" {...cell.getCellProps()}>{cell.render("Cell")}</td>;
//                 })}
//                 </tr>
//             );
//             })}
//         </tbody>
//         </table>
//     </>
//   );
// }


// Import necessary libraries

// Your data
const data = [
  {
    icon: <MdOutlineStars />,
    name: "Sabari",
    totalMarks: 99,
    positiveMarks: "+32",
    negativeMarks: "-12",
    accuracy: "98%",
    rank: 1
  },
  {
    icon: <MdOutlineStars />,
    name: "Smith",
    totalMarks: 85,
    positiveMarks: "+28",
    negativeMarks: "-6",
    accuracy: "90%",
    rank: 2
  }
];

// Define the table columns
const columns = [
  { Header: 'Icon', accessor: 'icon' },
  { Header: 'Name', accessor: 'name' },
  { Header: 'Total Marks', accessor: 'totalMarks' },
  { Header: 'Positive Marks', accessor: 'positiveMarks' },
  { Header: 'Negative Marks', accessor: 'negativeMarks' },
  { Header: 'Accuracy', accessor: 'accuracy' },
  { Header: 'Rank', accessor: 'rank' }
];

// Create your table component
const Table = () => {
  // Use the useMemo hook to memoize the table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data
    },
    useGlobalFilter,
    useSortBy
  );

  // Extract the global filter value and setGlobalFilter function
  const { globalFilter } = state;

  return (
    <>
      {/* Search bar */}
      <input
        className="leaderboardSearch"
        type="text"
        placeholder="Search..."
        value={globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />

      {/* Table */}
      <table {...getTableProps()}>
        {/* Table headers */}
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th className="rowHeaders" {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Sorting indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                      ? <FaSortDown />
                        : <FaSortUp />
                      : <FaSort />
                    }
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {/* Table body */}
        <tbody className="tbody" {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
