import { LegendList } from "@legendapp/list"
import React from "react"
import { Text, View } from "react-native"

import { Movie } from "../../../domain/types"
import { styles } from "../styles"

type LegendListSectionProps = {
    title: string
    data: Movie[]
    renderItem: ({ item }: { item: Movie }) => React.JSX.Element
    keyExtractor: (item: Movie) => string
    contentContainerStyle: {
        paddingHorizontal: number
    }
    itemSeparatorComponent: () => React.JSX.Element
}

export function LegendListSection({
    title,
    data,
    renderItem,
    keyExtractor,
    contentContainerStyle,
    itemSeparatorComponent
}: LegendListSectionProps) {
    return (
        <View style={{}}>
            <Text style={styles.header}>{title}</Text>
            <LegendList
                data={data ?? []}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                recycleItems
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={contentContainerStyle}
                ItemSeparatorComponent={itemSeparatorComponent}
                style={{ height: 240 }}
            />
        </View>
    )
}
