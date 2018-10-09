import React, { Component } from "react";
import { connect } from "react-redux";
import Chart from "../components/chart";
import GoogleMaps from "../components/google_maps";

class WeatherList extends Component {
	renderWeather(cityData) {
		if (cityData) {
			const name = cityData.city.name;
			const temperatureList = cityData.list.map(
				weather => weather.main.temp
			);
			const pressureList = cityData.list.map(
				weather => weather.main.pressure
			);
			const humidityList = cityData.list.map(
				weather => weather.main.humidity
			);
			const { lon, lat } = cityData.city.coord;
			return (
				<tr key={name}>
					<td>
						<GoogleMaps lon={lon} lat={lat} />
					</td>
					<td>
						<Chart
							data={temperatureList}
							color="red"
							units="Kelvin"
						/>
					</td>
					<td>
						<Chart data={pressureList} color="blue" units="hPa" />
					</td>
					<td>
						<Chart data={humidityList} color="green" units="%" />
					</td>
				</tr>
			);
		}
	}
	render() {
		return (
			<table className="table table-hover">
				<thead>
					<tr>
						<th> City </th>
						<th> Temperature(Kelvin) </th>
						<th> Pressure(hPa) </th>
						<th> Humidity( % ) </th>
					</tr>
				</thead>
				<tbody>{this.props.weather.map(this.renderWeather)}</tbody>
			</table>
		);
	}
}
function mapStateToProps({ weather }) {
	return {
		weather
	};
}
export default connect(mapStateToProps)(WeatherList);
