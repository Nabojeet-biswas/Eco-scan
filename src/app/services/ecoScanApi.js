import { baseApi } from "../baseApi";

export const ecoScanApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /api/status
    getStatus: builder.query({
      query: () => "/api/status",
      providesTags: ["Status"],
    }),

    // GET /api/demo
    getDemoList: builder.query({
      query: () => "/api/demo",
      providesTags: ["Demo"],
    }),

    // GET /api/demo/{id}
    getDemoResult: builder.query({
      query: (id) => `/api/demo/${id}`,
      providesTags: (_result, _error, id) => [{ type: "WasteResult", id }],
    }),

    // GET /api/demo/multi (Combo envelope of multiple detected waste items)
    getMultiDemo: builder.query({
      query: () => "/api/demo/multi",
      providesTags: ["Demo"],
    }),

    // POST /api/scan
    scanImage: builder.mutation({
      query: (formData) => ({
        url: "/api/scan",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["WasteResult"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetStatusQuery,
  useGetDemoListQuery,
  useGetDemoResultQuery,
  useLazyGetDemoResultQuery,
  useGetMultiDemoQuery,
  useLazyGetMultiDemoQuery,
  useScanImageMutation,
} = ecoScanApi;
