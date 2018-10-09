import { FETCH_WEATHER } from "../actions/index";
import _ from "lodash";

export default function(state = [], action) {
	// console.log("Action received (post middleware):", action);
	switch (action.type) {
		case FETCH_WEATHER:
			//Get Data
			let temp_temperatures = action.payload.data.list.map(
				weather => weather.main.temp
			);

			let temp_pressures = action.payload.data.list.map(
				weather => weather.main.pressure
			);

			let temp_humidites = action.payload.data.list.map(
				weather => weather.main.humidity
			);

			//Get Averages with Lodash
			let avg_temperature = _.round(_.meanBy(temp_temperatures));
			let avg_pressure = _.round(_.meanBy(temp_pressures));
			let avg_humidity = _.round(_.meanBy(temp_humidites));

			//Return State
			return [
				Object.assign(action.payload.data, {
					avg_temperature,
					avg_pressure,
					avg_humidity
				}),
				...state
			];
	}
	return state;
}
