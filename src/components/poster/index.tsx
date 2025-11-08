import React from "react"
import { Image, View } from "react-native"

import { posterUrl } from "../../services/movies"
import { styles } from "./styles"

type PosterProps = {
    path?: string | null
    size?: string
}

export const Poster: React.FC<PosterProps> = ({ path, size = "w500" }) => {
    const uri = path ? posterUrl(path, size) : undefined
    if (!uri) {
        return <View style={styles.placeholder} />
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri }} style={styles.image} />
        </View>
    )
}
