/** @format */
import "./App.css";
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import Checkbox from "./components/Checkbox";
import SetDate from "./components/SetDate";

import { fetchData } from "./func/api";

interface ExchangeRates {
  date: string;
  euro: number;
  dollar: number;
  yuan: number;
}

const App = () => {
  const initialEndDate = new Date();
  const initialStartDate = new Date(initialEndDate);
  initialStartDate.setDate(initialStartDate.getDate() - 7);

  const [datamoney, setDatamoney] = useState<ExchangeRates[]>([]);
  const [startDate, setStartDate] = useState<Date>(initialStartDate);
  const [endDate, setEndDate] = useState<Date>(initialEndDate);
  const [selected, setSelected] = useState<string[]>([]);
  const [numRequests, setNumRequests] = useState<number>(0);
  const [lineColors, setLineColors] = useState<{ [key: string]: string }>({
    euro: "#0000FF",
    dollar: "#FF0000",
    yuan: "#FFA500",
  });

  useEffect(() => {
    fetchData(startDate, endDate, setDatamoney, setNumRequests);
  }, [startDate, endDate]);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelected((el) => {
      if (el.includes(value)) {
        return el.filter((item) => item !== value);
      } else {
        return [...el, value];
      }
    });
  };

  const handlestartdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value);
    setStartDate(date);
  };

  const handleenddate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value);
    setEndDate(date);
  };

  const filteredData = datamoney.filter((entry) => {
    const currentDate = new Date(entry.date);
    return currentDate >= startDate && currentDate <= endDate;
  });

  return (
    <div className="App">
      <h1 style={{ fontSize: "68px", color: "#fff" }}>График курса валют</h1>
      <div className="datasect">
        <div className="checkdatamoney">
          <Checkbox handleCheck={handleCheck} />
          <SetDate
            startDate={startDate}
            endDate={endDate}
            handlestartdate={handlestartdate}
            handleenddate={handleenddate}
          />
          <div>Число запроссов API: {numRequests}</div>
        </div>
        <div>
          <LineChart
            width={800}
            height={400}
            data={filteredData}
            style={{
              backgroundColor: "#f0f0f0",
              borderRadius: "8px",
              padding: "20px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <text
              x={30}
              y={50}
              textAnchor="middle"
              style={{ fontSize: "14px", fontWeight: "bold", fill: "#333" }}
            >
              Рубль
            </text>
            <text
              x={70}
              y={399}
              textAnchor="middle"
              style={{ fontSize: "14px", fontWeight: "bold", fill: "#333" }}
            >
              Дата
            </text>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#666", fontSize: 12 }}
              tickLine={false}
            />
            <YAxis
              domain={[0, 110]}
              tick={{ fill: "#666", fontSize: 12 }}
              tickLine={false}
            />
            <Tooltip
              labelStyle={{ fontWeight: "bold", color: "#555" }}
              contentStyle={{ fontSize: "12px", color: "#333" }}
              wrapperStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "5px 10px",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "20px", color: "#333" }} />
            {selected.map((item) => (
              <Line
                type="monotone"
                dataKey={item}
                key={item}
                stroke={lineColors[item]}
                strokeWidth={2}
                dot={{ stroke: lineColors[item], strokeWidth: 2, r: 5 }}
              />
            ))}
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default App;
