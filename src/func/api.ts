/** @format */

// api.ts
import axios from "axios";
import { ExchangeRates } from "./type";
import formatDate from "./index";

export const fetchData = async (
  startDate: Date,
  endDate: Date,
  setDatamoney: React.Dispatch<React.SetStateAction<ExchangeRates[]>>,
  setNumRequests: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    const exchangeRates: ExchangeRates[] = [];

    const dateRange: Date[] = [];
    for (
      let mydatenow = new Date(startDate);
      mydatenow <= endDate;
      mydatenow.setDate(mydatenow.getDate() + 1)
    ) {
      dateRange.push(new Date(mydatenow));
    }

    for (const mydate of dateRange) {
      const formattedDate = formatDate(mydate);
      const responses = await Promise.all([
        axios.get(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${formattedDate}/v1/currencies/usd.json`
        ),
        axios.get(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${formattedDate}/v1/currencies/eur.json`
        ),
        axios.get(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${formattedDate}/v1/currencies/cny.json`
        ),
      ]);

      const [responseUSD, responseEUR, responseCNY] = responses;
      const resultUSD = responseUSD.data.usd.rub;
      const resultEUR = responseEUR.data.eur.rub;
      const resultCNY = responseCNY.data.cny.rub;

      const moneyData: ExchangeRates = {
        date: formattedDate,
        euro: resultEUR,
        dollar: resultUSD,
        yuan: resultCNY,
      };
      exchangeRates.push(moneyData);
      setNumRequests((prev) => prev + 1);
    }

    setDatamoney(exchangeRates);
  } catch (error) {
    console.error("Ошибка:", error);
  }
};
