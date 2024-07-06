import axios, { AxiosResponse } from "axios";
import { NameApiService } from "../nameApiService";
import { bubbleSort, fib, getYesOrNo } from "../util/masuyama";
import { calculate, fetchMultipleTimes, shoutRandomly } from "../util/yoshino";

describe("shoutRandomly", (): void => {
  const spyMathRandom = jest.spyOn(global.Math, 'random');
  const spyConsoleLog = jest.spyOn(global.console, 'log');

  beforeEach(() => {
    spyMathRandom.mockReset();
    spyConsoleLog.mockReset();
  });

  describe("Math.random()が0.5を超える値を返す場合", (): void => {
    it("引数で渡した文字列を叫ぶ", (): void => {
      spyMathRandom.mockReturnValue(0.6);

      shoutRandomly("プラハ");

      expect(spyConsoleLog).toHaveBeenCalledTimes(1);
      expect(spyConsoleLog).toHaveBeenCalledWith("プラハ!!!!!");
    });
  });

  describe("Math.random()が0.5以下の値を返す場合", (): void => {
    it("引数で渡した文字列を叫ぶ", (): void => {
      spyMathRandom.mockReturnValue(0.5);

      shoutRandomly("プラハ");

      expect(spyConsoleLog).toHaveBeenCalledTimes(1);
      expect(spyConsoleLog).toHaveBeenCalledWith("プラハ.....");
    });
  });
});

describe("fetchMultipleTimes", (): void => {
  const spyAxiosGet = jest.spyOn(axios, 'get');

  it.each(
    [
      {
        argument: 1,
        expected: [{ name: "hoge" }]
      },
      {
        argument: 2,
        expected: [{ name: "hoge" }, { name: "hoge" }]
      }
    ])("$argumentを渡した場合、$expectedが返る", async ({ argument, expected }): Promise<void> => {
      spyAxiosGet.mockResolvedValue({
        data: {
          name: "hoge"
        }
      });

      const result = await fetchMultipleTimes(argument);

      expect(result).toHaveLength(argument);
      expect(result).toEqual(expected);
    });
});

describe("calculate", (): void => {
  it.todo("");
});
