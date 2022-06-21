import http from "./httpService";
import cfg from "../../src/cfg.json";

export function register(user) {
	return http.post(cfg.api + "users/", {
		name: user.name,
		email: user.email,
		password: user.password,
	});
}

export default {
	register,
};
