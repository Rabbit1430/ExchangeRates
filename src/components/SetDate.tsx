/** @format */

import React, { useRef } from "react";
import "./SetDate.css";

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
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

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
