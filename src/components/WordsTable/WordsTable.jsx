import { useTable } from "react-table";
// import "react-table/react-table.css";
import css from "./WordsTable.module.css";
import { selectWords } from "../../redux/word/selectors";
import { fetchAllWords } from "../../redux/word/operations";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";

const WordsTable = () => {
  const dispatch = useDispatch();
  const words = useSelector(selectWords);

  useEffect(() => {
    dispatch(fetchAllWords({ page: 1, search: "", category: "all", verb: "" }));
  }, [dispatch]);

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
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const handleActions = (word) => {
    // Логіка для обробки дій (редагування, видалення тощо)
  };

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default WordsTable;
