import axios, { AxiosResponse } from "axios";
import { NameApiService } from "../nameApiService";
import { bubbleSort, fib, getYesOrNo } from "../util/masuyama";

describe("bubbleSort", (): void => {
  it.each([
    {
      argument: [3, 2],
      result: [2, 3]
    },
    {
      argument: [-1, -10],
      result: [-10, -1]
    }
  ])("$argumentを渡した場合、$resultになる", ({ argument, result }): void => {
    expect(bubbleSort(argument)).toStrictEqual(result);
  });
});

//NOTE: 0,1,1,2,3,5,8,13,21,34
describe("fib", (): void => {
  it.each([
    {
      argument: 0,
      result: 0
    },
    {
      argument: 1,
      result: 1
    },
    {
      argument: 4,
      result: 3
    },
    {
      argument: 7,
      result: 13
    }
  ])("$argumentを渡した場合、$resultになる", ({ argument, result }): void => {
    expect(fib(argument)).toStrictEqual(result);
  });
});

describe("getYesOrNo", (): void => {
  const axiosGetSpy = jest.spyOn(axios, 'get');

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("リクエストが成功した場合", (): void => {
    it("データを返す", async (): Promise<void> => {
      const mockData = {
        answer: "yes",
        forced: false,
        image: "https://yesno.wtf/assets/yes/2.gif"
      };
      axiosGetSpy.mockResolvedValue({
        data: mockData
      });

      const result = await getYesOrNo();

      expect(result).toStrictEqual(mockData);
    });
  });

  describe("リクエストが失敗した場合", (): void => {
    it("エラーを返す", async (): Promise<void> => {
      const mockErrorResponse = { error: 'Something went wrong' };
      axiosGetSpy.mockRejectedValue({
        response: { data: mockErrorResponse },
        isAxiosError: true,
      });

      const result = await getYesOrNo();
      
      expect(result).toEqual(mockErrorResponse);
      expect(axiosGetSpy).toHaveBeenCalledWith('https://yesno.wtf/api');
    });
  });
});
