import { db } from "./db";
import { Portfolio, Stock } from "./Portfolio";

jest.mock("./db");
const mockedData = {
  a: {
    0: 10,
    3e11: 15,
  },
  b: {
    0: 4,
    3e11: 1,
  },
  c: {
    0: 1,
    3e11: 20,
  },
};
db.getPrice.mockImplementation((stockId, date) => mockedData[stockId][+date]);

it("should calculate simple profit correctly", () => {
  const portfolio = new Portfolio([
    new Stock("a"),
    new Stock("b"),
    new Stock("c"),
  ]);

  const expectedProfit = 21;
  expect(portfolio.simpleProfit(new Date(0), new Date(3e11))).toEqual(
    expectedProfit
  );
});

it("should calculate profit correctly", () => {
  const portfolio = new Portfolio([
    new Stock("a"),
    new Stock("b"),
    new Stock("c"),
  ]);

  const expectedProfit = 29.828;
  expect(portfolio.profit(new Date(0), new Date(3e11))).toEqual(expectedProfit);
});
