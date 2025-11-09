export type Genre = { id: number; name: string }

export type Movie = {
    id: number
    title: string
    poster_path: string | null
    overview?: string
    release_date?: string
    genre_ids?: number[]
    homepage: string
}

export type MovieListResponse = {
    page?: number
    results: Movie[]
    total_pages?: number
    total_results?: number
}

export type MovieDetail = {
    id: number
    title: string
    poster_path: string | null
    overview: string
    release_date: string
    genres: Genre[]
    homepage: string
}
