import http from "./httpService";

export function register(user) {
	return http.post("users/", {
		name: user.name,
		email: user.email,
		password: user.password,
	});
}

export default {
	register,
};
