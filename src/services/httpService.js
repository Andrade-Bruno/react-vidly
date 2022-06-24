import Axios from "axios";
import { toast } from "react-toastify";
import logService from "./logService";

Axios.defaults.baseURL = process.env.REACT_APP_API_URL;

Axios.interceptors.response.use(null, (error) => {
	const expectedError =
		error.response &&
		error.response.status >= 400 &&
		error.response.status < 500;

	if (!expectedError) {
		let message = "An unexpected error occurred.";
		toast.error(message);
		logService.logError(error);
	}

	return Promise.reject(error);
});

function setJwt(jwt) {
	Axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
	get: Axios.get,
	post: Axios.post,
	put: Axios.put,
	patch: Axios.patch,
	delete: Axios.delete,
	setJwt,
};
