import React from "react"
import { Text, StyleSheet } from 'react-native'

let TextComponents = {
    MyText: ({ children }) => {
        return (
            <Text style={styles.text}>{children}</Text>
        )
    },
    H1: ({ children }) => {
        return (
            <Text style={[ styles.text, styles.h1, styles.center ]}>{children}</Text>
        )
    },
    ModalText: ({ children }) => {
        return (
            <Text style={[ styles.text, styles.h1, styles.dark, styles.center ]}>{children}</Text>
        )
    },
    ButtonText: ({ children }) => {
        return (
            <Text style={[ styles.text, styles.center ]}>{children}</Text>
        )
    },
    TodoText: ({ children }) => {
        return (
            <Text style={[ styles.text, styles.dark ]}>{children}</Text>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Roboto-Medium',
        color: '#fff',
        fontSize: 20
    },
    h1: {
        fontSize: 36
    },
    dark: {
        color: '#111'
    },
    center: {
        textAlign: 'center'
    }
})

export const { MyText, H1, ModalText, TodoText, ButtonText } = TextComponents