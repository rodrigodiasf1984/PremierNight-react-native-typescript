import { useCallback, useEffect, useMemo, useState } from "react"
import { Alert } from "react-native"

import { Movie } from "../../domain/types"
import { movieRepository } from "../../repositories/moviesRepository"

export function useHomeViewModel() {
    const [movies, setMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")

    useEffect(() => {
        let mounted = true
        const getMovies = async () => {
            setLoading(true)
            try {
                const response = await movieRepository.fetchPopular()
                if (mounted && response.results) {
                    setMovies(response.results)
                }
            } catch (error) {
                Alert.alert("Error", "Failed to load popular movies" + error)
            } finally {
                if (mounted) setLoading(false)
            }
        }
        getMovies()
        return () => {
            mounted = false
        }
    }, [])

    const filteredMovies = useMemo(() => {
        if (!search) return movies
        return movies.filter(movie =>
            (movie.title.toLocaleLowerCase() || "").includes(
                search.toLocaleLowerCase()
            )
        )
    }, [movies, search])

    const onSearchChange = useCallback(
        (searchText: string) => setSearch(searchText),
        []
    )

    return { movies: filteredMovies, loading, search, onSearchChange }
}
