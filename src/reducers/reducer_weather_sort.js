import { SORT_WEATHER } from "../actions/index";

const initialState = {
	sort: "city",
	order: "ascending"
};

export default function(state = initialState, action) {
	// console.log("Action received (post middleware):", action);
	switch (action.type) {
		case SORT_WEATHER:
			return {
				sort: action.payload.sort,
				order: action.payload.order
			};
	}
	return state;
}
