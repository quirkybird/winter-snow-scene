import pLimit from "p-limit";
import type { weatherInfo } from "../types";
// 设置限制最大并发
const limit = pLimit(5);

const queryWeather = (city: { city: string; locationId: number }) => {
  return new Promise((resolve, reject) => {
    try {
      fetch(
        `https://devapi.qweather.com/v7/weather/7d?location=${city.locationId}&key=c7c724d9b984491995fe7b5ea891f877`
      )
        .then((res) => res.json())
        .then((data: weatherInfo) => {
          data.city = city.city;
          resolve(data);
        });
    } catch (error) {
      reject(error);
    }
  });
};

const queryLoactionIds = [
  // 黑龙江
  { city: "哈尔滨市", locationId: 101050101 },
  { city: "齐齐哈尔市", locationId: 101050201 },
  { city: "鸡西市", locationId: 101051101 },
  { city: "鹤岗市", locationId: 101051201 },
  { city: "双鸭山市", locationId: 101051301 },
  { city: "大庆市", locationId: 101050901 },
  { city: "伊春市", locationId: 101050801 },
  { city: "佳木斯市", locationId: 101050401 },
  { city: "七台河市", locationId: 101051002 },
  { city: "牡丹江市", locationId: 101050301 },
  { city: "黑河市", locationId: 101050601 },
  { city: "绥化市", locationId: 101050501 },
  //吉林
  { "city": "长春市", "locationId": 101060101 },
  { "city": "吉林市", "locationId": 101060201 },
  { "city": "四平市", "locationId": 101060401 },
  { "city": "辽源市", "locationId": 101060701 },
  { "city": "通化市", "locationId": 101060501 },
  { "city": "白山市", "locationId": 101060901 },
  { "city": "松原市", "locationId": 101060801 },
  { "city": "白城市", "locationId": 101060601 },
  { "city": "延吉", "locationId": 101060301 },
  { "city": "敦化", "locationId": 101060302 },
  { "city": "安图", "locationId": 101060303 },
  { "city": "汪清", "locationId": 101060304 },
  { "city": "和龙", "locationId": 101060305 },
  { "city": "延边", "locationId": 101060306 },
  { "city": "龙井", "locationId": 101060307 },
  { "city": "珲春", "locationId": 101060308 },
  { "city": "图们", "locationId": 101060309 },
  // 辽宁
  { "city": "沈阳市", "locationId": 101070101 },
  { "city": "大连市", "locationId": 101070201 },
  { "city": "鞍山市", "locationId": 101070301 },
  { "city": "抚顺市", "locationId": 101070401 },
  { "city": "本溪市", "locationId": 101070501 },
  { "city": "丹东市", "locationId": 101070601 },
  { "city": "锦州市", "locationId": 101070701 },
  { "city": "营口市", "locationId": 101070801 },
  { "city": "阜新市", "locationId": 101070901 },
  { "city": "辽阳市", "locationId": 101071001 },
  { "city": "盘锦市", "locationId": 101071301 },
  { "city": "铁岭市", "locationId": 101071101 },
  { "city": "朝阳市", "locationId": 101060110 },
  { "city": "葫芦岛市", "locationId": 101071401 }
];

const queryCities = queryLoactionIds.map((city) => {
  return limit(() => queryWeather(city)) as Promise<weatherInfo>
});

const res = await Promise.all(queryCities);

export default res;
