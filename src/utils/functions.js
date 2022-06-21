import { toast } from "react-toastify";

export function handleBadRequest(exception) {
	if (exception.response && exception.response.status === 400) {
		toast.warn(`${exception.response.data}`);
	}
}

export default {
	handleBadRequest,
};
