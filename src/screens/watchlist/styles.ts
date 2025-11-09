import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    empty: { alignItems: "center", flex: 1, justifyContent: "center" },
    header: {
        fontSize: 22,
        fontWeight: "800",
        marginVertical: 12,
        textAlign: "center"
    },
    left: { marginRight: 12 },
    remove: { color: "#c00", marginTop: 6 },
    right: { flex: 1 },
    row: { alignItems: "center", flexDirection: "row", marginBottom: 12 },
    title: { fontSize: 16, fontWeight: "700" }
})
