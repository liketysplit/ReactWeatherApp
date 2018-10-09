import { combineReducers } from "redux";
import WeatherReducer from "./reducer_weather";
import SortWeatherReducer from "./reducer_weather_sort";
const rootReducer = combineReducers({
	weather: WeatherReducer,
	sorting: SortWeatherReducer
});
export default rootReducer;
