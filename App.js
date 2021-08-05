import React, { useState } from 'react'

import {
    View,
    FlatList,
    TextInput,
    StyleSheet,
    TouchableHighlight,
    Alert
} from 'react-native'

import { H1, ButtonText } from './components/Text'
import Todo from './components/Todo'

let App = () => {
    let [todos, setTodos] = useState([])
    let [input, setInput] = useState('')
    
    const onPress = () => {
        setInput('')
        if(input.length)
            setTodos((prev) => [...prev, { id: new Date().getTime(), title: input }])
        else
            errorHandle()
    }

    const onRemove = (id) => {
        setTodos((prev) => prev.filter(item => item.id !== id))
    }

    const errorHandle = () => {
        Alert.alert(
            "Error",
            "Invalid todo`s name",
            [
                {
                    text: 'OK'
                }
            ]
        )
    }

    return (
        <>
            <View style={styles.header}>
                <H1>Todo List</H1>
            </View>
            <View style={styles.container}>
                <View style={styles.addForm}>
                        <TextInput style={styles.input} placeholder="Input new todo" onChangeText={setInput} value={input}></TextInput>
                        <TouchableHighlight style={{ borderTopEndRadius: 12, borderBottomEndRadius: 12 }} onPress={onPress}>
                            <View style={styles.button}>
                                <ButtonText>Add</ButtonText>
                            </View>
                        </TouchableHighlight>
                </View>
                <FlatList 
                    data={todos}
                    renderItem={({ item }) => <Todo id={item.id} item={item.title} onRemove={onRemove}></Todo>}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#00b33c',
        paddingVertical: 10
    },
    container: {
        paddingTop: 10,
        paddingHorizontal: 8,
    },
    addForm: {
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center"
    },
    input: {
        width: '75%',
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#00b33c'
        
    },
    button: {
        height: 50,
        width: 100,
        backgroundColor: '#009933',
        justifyContent: "center",
        borderTopEndRadius: 12,
        borderBottomEndRadius: 12
    },
})

export default App