import {
	GET_PROFILE_SUCCESS,
	LOGOUT,
	STORE_TOKEN,
} from "../actions/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function postReducer(state: any = null, action: any) {
	switch (action.type) {
		case GET_PROFILE_SUCCESS:
			return { ...state, ...action.payload };
		case STORE_TOKEN:
			return { ...state, userToken: action.payload.userToken };
		case LOGOUT:
			return null;
		default:
			return state;
	}
}
