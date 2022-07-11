import React, { useState } from "react";
import "./styles.scss";

interface Props {
  name: string;
  onChange: Function;
}

const Filter = (props: Props) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const toggleCheck = () => {
    setIsChecked((old) => !old);
    props.onChange();
  };

  return (
    <div
      className={`filter ${isChecked ? "checked" : ""}`}
      onClick={toggleCheck}
    >
      <p>{props.name}</p>
    </div>
  );
};
export default Filter;
