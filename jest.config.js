module.exports = {
    preset: "react-native",
    testMatch: ["<rootDir>/src/**/*.test.ts?(x)", "<rootDir>/src/**/*.test.ts"],
    transformIgnorePatterns: [
        "node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-native/js-polyfills|react-native-config))"
    ]
}
