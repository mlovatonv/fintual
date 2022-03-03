import { db } from "./db";

export class Stock {
  id;

  constructor(id) {
    this.id = id;
  }

  getPrice = (date) => {
    return db.getPrice(this.id, date);
  };
}

export class Portfolio {
  stocks = [];

  constructor(stocks = []) {
    this.stocks = stocks;
  }

  simpleProfit(startDate, endDate) {
    // Simple profit
    // Final value - Initial value
    const profit = this.stocks.reduce((acc, stock) => {
      const stockProfit = stock.getPrice(endDate) - stock.getPrice(startDate);
      return acc + stockProfit;
    }, 0);
    return +profit.toFixed(3);
  }

  profit(startDate, endDate) {
    // Annualized Return
    // https://corporatefinanceinstitute.com/resources/knowledge/trading-investing/annual-return/
    // Option 2: When are given a dollar value of returns instead of an annual rate of returns
    const numberOfYears = new Date(endDate - startDate).getFullYear() - 1970;
    const profit = this.stocks.reduce((acc, stock) => {
      const stockProfit =
        (Math.pow(
          stock.getPrice(endDate) / stock.getPrice(startDate),
          1 / numberOfYears
        ) -
          1) *
        100;
      return acc + stockProfit;
    }, 0);
    return +profit.toFixed(3);
  }
}
