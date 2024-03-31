/** @format */

import React from "react";
import "./Checkbox.css";

interface Checkboxprops {
  handleCheck: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ handleCheck }: Checkboxprops) => {
  return (
    <div className="wrapper">
      <label>
        <input type="checkbox" value="euro" onChange={handleCheck} />
        Евро
      </label>
      <label>
        <input type="checkbox" value="dollar" onChange={handleCheck} />
        Доллар
      </label>
      <label>
        <input type="checkbox" value="yuan" onChange={handleCheck} />
        Юань
      </label>
    </div>
  );
};

export default Checkbox;
