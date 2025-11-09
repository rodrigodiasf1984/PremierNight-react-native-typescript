import React from "react"
import { Image, ImageProps, View } from "react-native"

import { posterUrl } from "../../services/movies"
import { styles } from "./styles"

type PosterProps = {
    path?: string | null
    size?: string
    style?: ImageProps["style"]
}

export const Poster: React.FC<PosterProps> = ({
    path,
    size = "w500",
    style
}) => {
    const uri = path ? posterUrl(path, size) : undefined
    if (!uri) {
        return <View style={styles.placeholder} />
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri }} style={[styles.image, style]} />
        </View>
    )
}
