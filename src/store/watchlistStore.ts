import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import { Movie } from "../domain/types"

type WatchlistState = {
    items: Movie[]
    add: (m: Movie) => void
    remove: (id: number) => void
    has: (id: number) => boolean
}

export const useWatchlist = create<WatchlistState>()(
    persist(
        (set, get) => ({
            items: [],
            add: (m: Movie) =>
                set(state => ({
                    items: [...state.items, m]
                })),
            remove: (id: number) =>
                set(state => ({ items: state.items.filter(i => i.id !== id) })),
            has: id => get().items.some(item => item.id === id)
        }),
        {
            name: "premiere-watchlist",
            storage: createJSONStorage(() => AsyncStorage),
            partialize: state => ({ items: state.items })
        }
    )
)
