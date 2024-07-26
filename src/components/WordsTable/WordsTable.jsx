import { useTable } from "react-table";
// import "react-table/react-table.css";
import css from "./WordsTable.module.css";
import { selectWords } from "../../redux/word/selectors";
import { fetchAllWords } from "../../redux/word/operations";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";

const WordsTable = ({ words, handleActions }) => {
  const dispatch = useDispatch();
  // const words = useSelector(selectWords);

  // useEffect(() => {
  //   dispatch(fetchAllWords({ page: 1, search: "", category: "all", verb: "" }));
  // }, [dispatch]);

  const data = useMemo(() => words, [words]);

  const columns = useMemo(
    () => [
      {
        Header: "English",
        accessor: "en",
      },
      {
        Header: "Ukrainian",
        accessor: "ua",
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Progress",
        accessor: "progress",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <button onClick={() => handleActions(row.original)}>...</button>
        ),
      },
    ],
    [handleActions]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} key={column.id}>
                {column.render("Header")}
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
                <td {...cell.getCellProps()} key={cell.column.id}>
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default WordsTable;
