import { render, waitFor } from "@testing-library/react-native"

import { movieRepository } from "../../repositories/moviesRepository"
import { Home } from ".."

jest.mock("../../repositories/moviesRepository", () => ({
    fetchPopular: jest.fn(),
    posterUrl: jest.fn(path =>
        path ? `https://image.tmdb.org/t/p/w500${path}` : null
    )
}))

describe("Home", () => {
    beforeEach(() => {
        jest.clearAllMocks()
        ;(movieRepository?.fetchPopular as jest.Mock)?.mockResolvedValue({
            results: []
        })
    })

    it("renders correctly", async () => {
        const { getByTestId } = render(<Home />)
        await waitFor(() =>
            expect(getByTestId("safe-area-view-home")).toBeTruthy()
        )
    })
})
