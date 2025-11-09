import { useCallback, useEffect, useState } from "react"
import { Alert } from "react-native"

import { MovieDetail } from "../../../domain/types"
import { movieRepository } from "../../../repositories/moviesRepository"
import { useWatchlist } from "../../../store/watchlistStore"

export const useDetailViewModel = (movieId: number) => {
    const [movie, setMovie] = useState<MovieDetail | null>(null)
    const [loading, setLoading] = useState(false)
    const { add, has, remove } = useWatchlist()

    useEffect(() => {
        let mounted = true

        const getMovieById = async () => {
            setLoading(true)
            try {
                const response =
                    await movieRepository.fetchMovieDetails(movieId)
                if (mounted) setMovie(response)
            } catch (error) {
                Alert.alert(
                    "Error",
                    "An error occurred while fetching movie data" + error
                )
            }
            setLoading(false)
        }

        getMovieById()
        return () => {
            mounted = false
        }
    }, [movieId])

    const toggleWatchlist = useCallback(() => {
        if (!movie) return
        if (has(movie.id)) {
            remove(movie.id)
        } else {
            const movieToAdd = {
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                homepage: movie.homepage
            }
            add(movieToAdd)
        }
    }, [movie, has, add, remove])
    const isSaved = movie ? has(movieId) : false

    return {
        movie,
        loading,
        isSaved: isSaved,
        toggleWatchlist
    }
}
