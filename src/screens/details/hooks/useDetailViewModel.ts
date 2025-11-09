import { useCallback, useEffect, useState } from "react"
import { Alert } from "react-native"

import { MovieDetail } from "../../../domain/types"
import { movieRepository } from "../../../repositories/moviesRepository"
import { useWatchlist } from "../../../store/watchlistStore"

export const useDetailViewModel = (movieId: number) => {
    const [movie, setMovie] = useState<MovieDetail | null>(null)
    const [loading, setLoading] = useState(false)
    const addMovie = useWatchlist(m => m.add)
    const removeMovie = useWatchlist(m => m.remove)
    const hasMovie = useWatchlist(m => m.has)

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
        if (hasMovie(movie.id)) {
            removeMovie(movie.id)
        } else {
            const movieToAdd = {
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path
            }
            addMovie(movieToAdd)
        }
    }, [movie, hasMovie, addMovie, removeMovie])
    const isSaved = movie ? hasMovie(movieId) : false

    return {
        movie,
        loading,
        isSaved: isSaved,
        toggleWatchlist
    }
}
