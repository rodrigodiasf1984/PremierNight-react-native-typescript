import axios from "axios"
import Config from "react-native-config"

const API_KEY = Config.MOVIES_API_KEY
const baseUrl = "https://api.themoviedb.org/3"

export async function fetchPopular(page = 1) {
    const { data } = await axios.get(`${baseUrl}/movie/popular`, {
        params: { api_key: API_KEY, page }
    })
    return data
}

export async function fetchMovieDetails(movieId: number) {
    const { data } = await axios.get(`${baseUrl}/movie/${movieId}`, {
        params: { api_key: API_KEY, append_to_response: "credits" }
    })
    return data
}

export function posterUrl(path: string | null, size = "w500") {
    return path ? `https://image.tmdb.org/t/p/${size}${path}` : null
}
