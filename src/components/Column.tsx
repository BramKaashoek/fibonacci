import React from "react";
import { makeStyles } from "@material-ui/styles";
import Cell from "./Cell";

interface IProps {
  column: number[];
  columnIndex: number;
}

const useStyles = makeStyles({
  column: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "2%"
  }
});

const Column = (props: IProps) => {
  const classes = useStyles();
  const { column, columnIndex } = props;

  return (
    <div className={classes.column}>
      {column.map((cell, index) => (
        <Cell value={cell} columnIndex={columnIndex} rowIndex={index} key={`${columnIndex}-${index}`} />
      ))}
    </div>
  );
};

export default Column;
