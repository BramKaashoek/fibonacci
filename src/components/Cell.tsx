import React, { useContext, useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import { FieldContext } from "./Field";

interface IProps {
  value: number;
  columnIndex: number;
  rowIndex: number;
}

const useStyles = makeStyles({
  cell: {
    height: "2%",
    width: "100%",
    border: "1px solid #666666",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "background-color 150ms ease-out"
  },
  yellow: {
    backgroundColor: "#f7d82a"
  },
  green: {
    backgroundColor: "#58a049"
  }
});

// I implement React.memo here, but it's not working for some reason.
const Cell = React.memo((props: IProps) => {
  const classes = useStyles();
  const context = useContext(FieldContext);
  const { value, columnIndex, rowIndex } = props;
  const [isIncreased, setIsIncreased] = useState(false);
  const [isCleared, setIsCleared] = useState(false);

  const prevValueRef = useRef(0);
  useEffect(() => {
    if (prevValueRef.current < value) {
      setIsIncreased(true);
      setTimeout(() => {
        setIsIncreased(false);
      }, 500);

      prevValueRef.current = value;
    }
    if (prevValueRef.current > value) {
      setIsCleared(true);
      setTimeout(() => {
        setIsCleared(false);
      }, 500);
      prevValueRef.current = value;
    }
  });

  return (
    <div
      className={classNames(classes.cell, isIncreased ? classes.yellow : null, isCleared ? classes.green : null)}
      onClick={context.handleClick(columnIndex, rowIndex)}
    >
      {value > 0 ? value : undefined}
    </div>
  );
});

export default Cell;
