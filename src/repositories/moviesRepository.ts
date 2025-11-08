import { MovieDetail, MovieListResponse } from "../domain/types"
import * as api from "../services/movies"

export const movieRepository = {
    fetchPopular: (page = 1): Promise<MovieListResponse> =>
        api.fetchPopular(page),
    fetchMovieDetails: (id: number): Promise<MovieDetail> =>
        api.fetchMovieDetails(id)
}
