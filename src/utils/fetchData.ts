import pLimit from "p-limit";

// 设置限制最大并发
const limit = pLimit(5);

const queryWeather = (locationId: number) => {
  return new Promise((resolve, reject) => {
    try {
      fetch(
        `https://devapi.qweather.com/v7/weather/7d?location=${locationId}&key=c7c724d9b984491995fe7b5ea891f877`
      )
        .then((res) => res.json())
        .then((data) => resolve(data));
    } catch (error) {
      reject(error);
    }
  });
};

const queryLoactionIds = [
  101050101, 101050201, 101051101, 101051201, 101051301, 101050901, 101050801,
  101050401, 101051002, 101050301, 101050601, 101050501,
];

const queryCities = queryLoactionIds.map((locationId) => {
  return [limit(() => queryWeather(locationId))];
});

const res = await Promise.all(queryCities)

export default res;
