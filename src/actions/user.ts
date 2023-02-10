import { User } from "../type";
import {
	GET_PROFILE_SUCCESS,
	STORE_TOKEN,
	LOGOUT,
} from "./types";

export const getProfileSuccess = (data: { user: User }) => {
	return {
		type: GET_PROFILE_SUCCESS,
		payload: data,
	};
};

export const storeUserToken = (data: { userToken: string }) => {
	return {
		type: STORE_TOKEN,
		payload: data,
	};
};

export const logout = () => {
	localStorage.clear();
	return {
		type: LOGOUT,
		payload: null,
	};
};
