import { QueryOptionsType, Product } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import shuffle from "lodash/shuffle";
import { useInfiniteQuery } from "@tanstack/react-query";
import userStore from "@contexts/userStore";

type PaginatedProduct = {
	data: Product[];
	paginatorInfo: any;
};

// Fetch Products Function
const fetchProducts = async (options: QueryOptionsType, country: string) => {
	try {
		// Make the API request with country and options as query parameters
		const { data } = await http.get(`products/${country}/viewproduct/`, {
			params: options,
		});

		console.log(data.app_data.data, "_____product___data");

		// Return shuffled product data and a dummy paginatorInfo
		return {
			data: shuffle(data.app_data.data),
			paginatorInfo: {
				nextPageUrl: "", // Adjust as per actual API response
			},
		};
	} catch (error) {
		console.error("Error fetching products:", error);
		throw new Error("Failed to fetch products");
	}
};

// Custom Hook for Products Query
const useProductsQuery = (options: QueryOptionsType) => {
	// Get country from userStore (executed at the top level)
	const country = userStore((state) => state.country);

	console.log(options, "_____options____");

	return useInfiniteQuery<PaginatedProduct, Error>({
		queryKey: [API_ENDPOINTS.PRODUCTS, options, country], // Include country and options in the query key
		queryFn: () => fetchProducts(options, country), // Pass options and country to fetchProducts
		initialPageParam: 0,
		getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl, // Dynamically determine the next page
	});
};

export { useProductsQuery, fetchProducts };
