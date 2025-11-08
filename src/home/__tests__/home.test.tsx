import { render, waitFor } from "@testing-library/react-native"

import { fetchPopular } from "../../api/movies"
import { Home } from ".."

jest.mock("../../api/movies", () => ({
    fetchPopular: jest.fn(),
    posterUrl: jest.fn(path =>
        path ? `https://image.tmdb.org/t/p/w500${path}` : null
    )
}))

describe("Home", () => {
    beforeEach(() => {
        jest.clearAllMocks()
        ;(fetchPopular as jest.Mock).mockResolvedValue({ results: [] })
    })

    it("renders correctly", async () => {
        const { getByTestId } = render(<Home />)
        await waitFor(() =>
            expect(getByTestId("safe-area-view-home")).toBeTruthy()
        )
    })
})
