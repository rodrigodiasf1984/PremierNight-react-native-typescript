import axios from "axios"
import Config from "react-native-config"

import { MovieDetail, MovieListResponse } from "../domain/types"

const API_KEY = Config.MOVIES_API_KEY
const baseUrl = "https://api.themoviedb.org/3"

type FetchCategoryProps = {
    page: number
    category: "top_rated" | "upcoming" | "popular"
}

export async function fetchCategory({
    category,
    page
}: FetchCategoryProps): Promise<MovieListResponse> {
    const { data } = await axios.get(`${baseUrl}/movie/${category}`, {
        params: { api_key: API_KEY, page }
    })
    return data
}

export async function fetchMovieDetails(movieId: number): Promise<MovieDetail> {
    const { data } = await axios.get(`${baseUrl}/movie/${movieId}`, {
        params: { api_key: API_KEY, append_to_response: "credits" }
    })
    return data
}

export function posterUrl(path: string, size: string) {
    return path ? `https://image.tmdb.org/t/p/${size}${path}` : null
}
