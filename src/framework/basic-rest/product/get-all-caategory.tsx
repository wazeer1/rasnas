import { QueryOptionsType, Product } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useQuery } from "@tanstack/react-query";

const fetchCategory = async () => {
	const { data } = await http.get(API_ENDPOINTS.CATEGORIES);
	return data?.app_data?.data || []; // Ensure data is an array
};

const useFetchCategory = (options: QueryOptionsType) => {
	return useQuery<Product[], Error>({
		queryKey: [API_ENDPOINTS.CATEGORIES, options],
		queryFn: fetchCategory,
	});
};

export { useFetchCategory, fetchCategory };
