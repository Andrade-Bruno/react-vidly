import { toast } from "react-toastify";

export function handleBadRequest(ex) {
	if (
		ex.response &&
		(ex.response.status === 400 || ex.response.status === 403)
	) {
		toast.warn(`${ex.response.data}`);
	}
}

export default {
	handleBadRequest,
};
