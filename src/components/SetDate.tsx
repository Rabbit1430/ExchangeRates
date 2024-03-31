/** @format */

import React, { useRef } from "react";
import "./SetDate.css";
import formatDate from "../func/formatdate";

interface SetdateProps {
  startDate: Date;
  endDate: Date;
  handlestartdate: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleenddate: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SetDate = ({
  startDate,
  endDate,
  handlestartdate,
  handleenddate,
}: SetdateProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="dta">
      <label>Начальная Дата:</label>
      <input
        type="date"
        value={formatDate(startDate)}
        onChange={handlestartdate}
        onFocus={handleClick}
        className="date-input"
      />
      <label>Конечная дата:</label>
      <input
        type="date"
        value={formatDate(endDate)}
        onChange={handleenddate}
        onFocus={handleClick}
        className="date-input"
      />
    </div>
  );
};

export default SetDate;
