import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { checkSequenceForFibonaci } from "../helpers/checkSequenceForFibonacci";
import Column from "./Column";

const useStyles = makeStyles({
  field: {
    height: "100%",
    width: "100%",
    padding: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default function Field() {
  const columnLength = 50;
  const classes = useStyles();
  const initialColumns: number[][] = Array(columnLength)
    .fill(null)
    .map(_ => Array(columnLength).fill(0));

  const [columns, setColumns] = useState(initialColumns);

  const handleClick = (columnIndex: number, rowIndex: number) => async () => {
    // bump all the values in the row and column by 1
    const updatedColumns = columns.map((col, index) => {
      if (columnIndex === index) {
        return col.map(cell => cell + 1);
      } else {
        col[rowIndex] = col[rowIndex] + 1;
        return col;
      }
    });
    await setColumns(updatedColumns);
    // check if the increase causes any fibonacci sequences to be formed. If so, set these values back to 0
    const fibonacciRemoved = resetFibonacci(updatedColumns, columnIndex, rowIndex);

    setColumns(fibonacciRemoved);
  };

  const resetFibonacci = (columns: number[][], columnIndex: number, rowIndex: number) => {
    // maximum distance a change can have effect is 4 from the index, else the sequence should have been picked up during a previous change
    const maxDistance = 4;

    const rowsCheckedColumns = checkRows(columns, rowIndex, maxDistance);
    rowsCheckedColumns[columnIndex] = checkEntireColumn([...columns[columnIndex]]);

    const columnsCheckedColumns = checkColumns(rowsCheckedColumns, rowIndex, maxDistance);
    const entireRowCheckedColumns = checkEntireRow(columnsCheckedColumns, rowIndex);

    return entireRowCheckedColumns;
  };

  const checkRows = (columns: number[][], rowIndex: number, maxDistance: number) => {
    const updatedColumns = JSON.parse(JSON.stringify(columns));
    const toBeCheckedRows = Array(maxDistance + 1 + maxDistance)
      .fill(-maxDistance)
      .map((curr, index) => curr + index + rowIndex);

    columns.map((checkedCol, checkedIndex) => {
      // determine which rows in the col should be checked
      const toBeChecked = toBeCheckedRows.map(checkRowIndex => {
        if (checkRowIndex < 0 || checkRowIndex > columnLength - 1) return 0;
        return checkedCol[checkRowIndex];
      });

      const [startIndex, length] = checkSequenceForFibonaci(toBeChecked);

      if (startIndex > -1) {
        updatedColumns[checkedIndex] = checkedCol.map((cell, index) => {
          if (index >= rowIndex - maxDistance + startIndex && index <= rowIndex - maxDistance + startIndex + length)
            return 0;
          return cell;
        });
      }
    });
    return updatedColumns;
  };

  const checkEntireColumn = (col: number[]): number[] => {
    const [startIndex, length] = checkSequenceForFibonaci(col);
    if (startIndex > -1) {
      const copyCol = col.map((curr, index) => {
        if (index >= startIndex && index < startIndex + length) {
          return 0;
        }
        return curr;
      });
      return checkEntireColumn(copyCol);
    }
    return col;
  };

  const checkColumns = (columns: number[][], columnIndex: number, maxDistance: number) => {
    const updatedColumns = JSON.parse(JSON.stringify(columns));
    const toBeCheckedColumIndexes = Array(maxDistance + 1 + maxDistance)
      .fill(-maxDistance)
      .map((curr, index) => curr + index + columnIndex);

    // for each row, check these columns
    columns[columnIndex].map((_, checkedIndex) => {
      const toBeChecked = toBeCheckedColumIndexes.map(colIndex => {
        if (colIndex < 0 || colIndex > columnLength - 1) return 0;
        return columns[colIndex][checkedIndex];
      });

      const [startIndex, length] = checkSequenceForFibonaci(toBeChecked);

      if (startIndex > -1) {
        updatedColumns.map((col: number[], updatedColIndex: number) => {
          if (
            updatedColIndex >= columnIndex - maxDistance + startIndex &&
            updatedColIndex < columnIndex - maxDistance + startIndex + length
          ) {
            col[checkedIndex] = 0;
          }
          updatedColumns[updatedColIndex] = col;
        });
      }
    });
    return updatedColumns;
  };

  const checkEntireRow = (columns: number[][], rowIndex: number): number[][] => {
    const toBeChecked = columns.map(col => col[rowIndex]);
    const [startIndex, length] = checkSequenceForFibonaci(toBeChecked);
    if (startIndex > -1) {
      const updatedColumns = columns.map((col, index) => {
        if (index >= startIndex && index < startIndex + length) {
          col[rowIndex] = 0;
        }
        return col;
      });
      return checkEntireRow(updatedColumns, rowIndex);
    }
    return columns;
  };

  return (
    <FieldContext.Provider value={{ handleClick }}>
      <div className={classes.field}>
        {columns.map((col, index) => (
          <Column column={col} columnIndex={index} key={index} />
        ))}
      </div>
    </FieldContext.Provider>
  );
}

// context is not really needed here, but this is the first time I'm using hooks and I wanted to try it out
export const FieldContext = React.createContext({ handleClick: (columnIndex: number, rowIndex: number) => () => {} });
