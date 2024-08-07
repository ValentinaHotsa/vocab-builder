import { useTable } from "react-table";
import { useMemo } from "react";
import { nanoid } from "nanoid";
import { useIsMobile } from "../../hooks/useIsMobile";
import WordMenu from "../WordMenu/WordMenu";
import ProgressBar from "../ProgressBar/ProgressBar";
import svg from "../../assets/icon.svg";
import css from "./WordsTable.module.css";
import style from "../ProgressBar/ProgressBar.module.css";

const WordsTable = ({ words, handleActions, actionType }) => {
  const isMobile = useIsMobile();

  const data = useMemo(() => words, [words]);

  const columns = useMemo(() => {
    const baseColumns = [
      {
        Header: () => (
          <span>
            Word{" "}
            <svg className={css.iconCountry}>
              <use href={`${svg}#icon-en`} />
            </svg>
          </span>
        ),
        accessor: "en",
      },
      {
        Header: () => (
          <span>
            Translation{" "}
            <svg className={css.iconCountry}>
              <use href={`${svg}#icon-ukraine`} />
            </svg>
          </span>
        ),
        accessor: "ua",
        className: "columnTranslation",
      },
    ];
    if (!isMobile || actionType === "recommend") {
      baseColumns.push({
        Header: "Category",
        accessor: "category",
      });
    }

    if (actionType === "dictionary") {
      baseColumns.push({
        Header: "Progress",
        accessor: "progress",

        Cell: ({ row }) => {
          return (
            <ProgressBar
              progress={row.original.progress}
              pageType="table"
              classWrap={style.progressWrapTable}
              classBox={style.boxTable}
            />
          );
        },
      });
    }

    baseColumns.push({
      accessor: "actions",

      Cell: ({ row }) => {
        if (actionType === "dictionary") {
          return <WordMenu word={row.original} handleActions={handleActions} />;
        } else if (actionType === "recommend") {
          return (
            <button
              onClick={() => handleActions(row.original, "add")}
              className={css.buttonAdd}
            >
              <span>Add to dictionary</span>
              <svg className={css.iconAdd}>
                <use href={`${svg}#icon-arrow-right`} />
              </svg>
            </button>
          );
        }
        return null;
      },
    });

    return baseColumns;
  }, [handleActions, actionType, isMobile]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className={css.tableContainer}>
      <table {...getTableProps()} className={css.table}>
        <thead className={css.thead}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={nanoid()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  key={column.id}
                  className={css.tableHeader}
                >
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
                  <td
                    {...cell.getCellProps()}
                    key={cell.column.id}
                    className={css.tableItem}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default WordsTable;
