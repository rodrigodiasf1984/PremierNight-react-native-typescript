import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: { backgroundColor: "#fff", flex: 1, paddingTop: 12 },
    header: {
        color: "#666",
        fontSize: 22,
        fontWeight: "800",
        marginBottom: 8,
        textAlign: "center"
    },
    loading: { color: "#666", marginTop: 12, textAlign: "center" },
    search: {
        borderColor: "#ddd",
        borderRadius: 8,
        borderWidth: 1,
        height: 40,
        marginBottom: 12,
        marginHorizontal: 16,
        paddingHorizontal: 12
    }
})
