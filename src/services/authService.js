import http from "./httpService";
import cfg from "../../src/cfg.json";
import jwtDecode from "jwt-decode";

http.setJwt(getJwt());

export async function login(email, password) {
	const { data: jwt } = await http.post(cfg.api + "auth/", {
		email,
		password,
	});
	localStorage.setItem("token", jwt);
}

export function loginWithJWT(jwt) {
	localStorage.setItem("token", jwt);
}

export function logout() {
	localStorage.removeItem("token");
}

export function getUser() {
	try {
		const jwt = localStorage.getItem("token");
		const user = jwtDecode(jwt);
		return user;
	} catch (ex) {
		return null;
	}
}

export function getJwt() {
	return localStorage.getItem("token");
}

export default {
	login,
	logout,
	getUser,
	loginWithJWT,
	getJwt,
};
