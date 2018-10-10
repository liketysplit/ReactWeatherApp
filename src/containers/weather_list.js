import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Chart from "../components/chart";
import GoogleMaps from "../components/google_maps";
import SortColumn from "../components/sort_column";
import { sortWeather } from "../actions/index";
import _ from "lodash";

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
							avg={cityData.avg_temperature}
						/>
					</td>
					<td>
						<Chart
							data={pressureList}
							color="blue"
							units="hPa"
							avg={cityData.avg_pressure}
						/>
					</td>
					<td>
						<Chart
							data={humidityList}
							color="green"
							units="%"
							avg={cityData.avg_humidity}
						/>
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
						<th className="sortable">
							<SortColumn
								name="city"
								text="City "
								sortByWeather={this.sortByWeather}
								sort={this.props.sort}
								order={this.props.order}
							/>
						</th>
						<th className="sortable">
							<SortColumn
								name="avg_temperature"
								text="Temperature(Kelvin) "
								sortByWeather={this.sortByWeather}
								sort={this.props.sort}
								order={this.props.order}
							/>
						</th>
						<th className="sortable">
							<SortColumn
								name="avg_pressure"
								text="Pressure(hPa) "
								sort={this.props.sort}
								order={this.props.order}
								sortByWeather={this.sortByWeather}
								sort={this.props.sort}
								order={this.props.order}
							/>
						</th>
						<th className="sortable">
							<SortColumn
								name="avg_humidity"
								text="Humidity( % ) "
								sort={this.props.sort}
								order={this.props.order}
								sortByWeather={this.sortByWeather}
								sort={this.props.sort}
								order={this.props.order}
							/>
						</th>
					</tr>
				</thead>
				<tbody>{this.props.weather.map(this.renderWeather)}</tbody>
			</table>
		);
	}

	sortByWeather = (sort, order) => {
		console.log(sort + ", " + this.props.sort);
		if (this.props.sort !== sort) {
			order = "asc";
		}

		this.props.sortWeather(sort, order);
	};
}
function mapStateToProps({ weather, sorting }) {
	let sortedWeather = weather;
	if (sorting.sort === "city") {
		sortedWeather = _.orderBy(
			weather,
			[`${sorting.sort}.name`],
			sorting.order
		);
	} else {
		sortedWeather = _.orderBy(weather, [`${sorting.sort}`], sorting.order);
	}

	return {
		weather: sortedWeather,
		sort: sorting.sort,
		order: sorting.order
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ sortWeather: sortWeather }, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WeatherList);
