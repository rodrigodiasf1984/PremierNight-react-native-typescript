import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import { Movie } from "../domain/types"

type WatchlistState = {
    items: Movie[]
    add: (m: Movie) => void
    remove: (id: number) => void
}

export const useWatchlist = create<WatchlistState>()(
    persist(
        set => ({
            items: [],
            add: (m: Movie) =>
                set(state => ({
                    items: [...state.items, m]
                })),
            remove: (id: number) =>
                set(state => ({ items: state.items.filter(i => i.id !== id) }))
        }),
        {
            name: "premiere-watchlist",
            storage: createJSONStorage(() => AsyncStorage),
            partialize: state => ({ items: state.items })
        }
    )
)
