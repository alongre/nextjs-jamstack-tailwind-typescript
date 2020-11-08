const httpRequest = async <T>(request: RequestInfo): Promise<T> => {
	const response = await fetch(request);
	return await response.json();
};

const http = async <T>(url: string, requestInit?: RequestInit): Promise<T> => {
	const response = await fetch(url, requestInit);
	return await response.json();
};

export { httpRequest, http };
