import { useQuery } from "@tanstack/react-query";
import { servicesData, ServiceItem } from "@/config/services";

// Cached client-side service query with zero refetch
export function useServices(division?: "electronics" | "digital") {
  return useQuery<ServiceItem[]>({
    queryKey: ["services", division ?? "all"],
    queryFn: async () => {
      // In-memory instant return: zero network penalty
      if (division) {
        return servicesData.filter((s) => s.division === division);
      }
      return servicesData;
    },
    staleTime: Infinity, // Data never goes stale
    gcTime: Infinity, // Data is cached indefinitely
  });
}
