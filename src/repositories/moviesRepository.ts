import { MovieDetail, MovieListResponse } from "../domain/types"
import * as api from "../services/movies"

export const movieRepository = {
    fetchPopular: (page = 1): Promise<MovieListResponse> =>
        api.fetchCategory({
            category: "popular",
            page
        }),
    fetchTopRated: (page = 1): Promise<MovieListResponse> =>
        api.fetchCategory({
            category: "top_rated",
            page
        }),
    fetchUpcoming: (page = 1): Promise<MovieListResponse> =>
        api.fetchCategory({
            category: "upcoming",
            page
        }),

    fetchMovieDetails: (id: number): Promise<MovieDetail> =>
        api.fetchMovieDetails(id)
}
