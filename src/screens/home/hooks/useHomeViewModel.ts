import { useCallback, useEffect, useState } from "react"
import { Alert } from "react-native"

import { Movie } from "../../../domain/types"
import { movieRepository } from "../../../repositories/moviesRepository"

export function useHomeViewModel() {
    const [popular, setPopular] = useState<Movie[]>([])
    const [topRated, setTopRated] = useState<Movie[]>([])
    const [upcoming, setUpcoming] = useState<Movie[]>([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")

    useEffect(() => {
        let mounted = true
        const getMovies = async () => {
            setLoading(true)
            try {
                const [pop, top, up] = await Promise.all([
                    movieRepository.fetchPopular(),
                    movieRepository.fetchTopRated(),
                    movieRepository.fetchUpcoming()
                ])
                if (mounted) {
                    setPopular(pop.results ?? [])
                    setTopRated(top.results ?? [])
                    setUpcoming(up.results ?? [])
                }
            } catch (error) {
                Alert.alert("Error", "Failed to load movies: " + error)
            } finally {
                if (mounted) setLoading(false)
            }
        }
        getMovies()
        return () => {
            mounted = false
        }
    }, [])

    const filteredMovies = useCallback(
        (movieList: Movie[]) => {
            if (!search) return movieList
            const normalized = search.toLowerCase()
            return movieList.filter(({ title }) =>
                title.toLowerCase().includes(normalized)
            )
        },
        [search]
    )

    const onSearchChange = useCallback((text: string) => setSearch(text), [])

    return {
        popular: filteredMovies(popular),
        topRated: filteredMovies(topRated),
        upcoming: filteredMovies(upcoming),
        loading,
        search,
        onSearchChange
    }
}
