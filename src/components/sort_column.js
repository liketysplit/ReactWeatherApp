import React, { Component } from "react";

export default class SortColumn extends Component {
	handleSort = error => {
		error.preventDefault();
		const order = this.props.order === "desc" ? "asc" : "desc";
		this.props.sortByWeather(this.props.name, order);
	};

	render = () => {
		let status = this.props.sort === this.props.name;
		let temp_name = status ? <u>{this.props.text}</u> : this.props.text;
		let btn_dir;

		if (status) {
			btn_dir =
				this.props.order === "asc" ? (
					<span className="oi oi-chevron-top" aria-hidden="true" />
				) : (
					<span className="oi oi-chevron-bottom" aria-hidden="true" />
				);
		}

		return (
			<span onClick={this.handleSort}>
				{temp_name}
				{btn_dir}
			</span>
		);
	};
}
