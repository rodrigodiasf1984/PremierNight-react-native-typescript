import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: { overflow: "hidden" },
    image: {
        borderRadius: 10,
        height: "100%",
        resizeMode: "cover",
        width: "100%"
    },
    placeholder: {
        backgroundColor: "#eee",
        borderRadius: 10,
        height: 180,
        width: 120
    }
})
