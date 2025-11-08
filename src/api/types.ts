export type MovieResultItem = {
    id: number
    title: string
    original_title: string
    release_date: string
    overview: string
    poster_path: string | null
    backdrop_path: string | null
    vote_average: number
    vote_count: number
    popularity: number
    genre_ids: number[]
    original_language: string
    adult: boolean
    video: boolean
}

export type PaginatedResponse<T> = {
    page: number
    total_pages: number
    total_results: number
    results: T[]
}
