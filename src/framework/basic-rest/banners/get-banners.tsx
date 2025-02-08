import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useQuery } from "@tanstack/react-query";

// Function to fetch banners
const fetchBanners = async (section) => {
  try {
    const { data } = await http.get(`${API_ENDPOINTS.GET_BANNERS}${section}/`);
    return data?.app_data?.data || [];
  } catch (error) {
    console.error("Error fetching banners:", error);
    throw error; // Re-throw the error so React Query can handle it
  }
};

// Custom React Query hook
const useFetchBanner = ({ section }) => {
  return useQuery({
    queryKey: [API_ENDPOINTS.GET_BANNERS, section], 
    queryFn: () => fetchBanners(section),
  });
};

export { useFetchBanner, fetchBanners };