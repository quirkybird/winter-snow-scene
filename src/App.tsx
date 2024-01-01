import weatherInfos from "./utils/fetchData";
const App = () => {
  console.log(weatherInfos)
  return (
    <div>
      {weatherInfos.map((weatherInfo) => {
        return weatherInfo.daily.map((day: { textDay: string; textNight: string }, index: number) => {
          let city = ""
          let weather = ""
          if (day.textDay.includes("雪")) {
            weather = day.textDay
            city = weatherInfo.city + (new Date().getMonth() + 1) + "月" + new Date(Date.now() + index * 24 * 60 * 60 * 1000).getDate()+ "日" + "白天："
          }
          if(day.textNight.includes("雪")){
            weather = day.textNight
            city = weatherInfo.city + (new Date().getMonth() + 1) + "月" + new Date(Date.now() + index * 24 * 60 * 60 * 1000).getDate()+ "日"  + "夜晚："
          }
            return (
              <div key={index}>
                <span>{city}</span>
                <span>{weather}</span>
              </div>
              );
        });
      })}
    </div>
  );
};

export default App;
