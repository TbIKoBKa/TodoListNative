import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { StyleSheet, PanResponder, Animated, TouchableHighlight, View, Image } from 'react-native'
import { TodoText } from './Text'

import trashBacket from '../assets/img/trashBacket.png'

const AnimatedTouchableHighlight = Animated.createAnimatedComponent(TouchableHighlight);

let Todo = ({ id, item, onRemove }) => {
    let [move, changeMove] = useState({ isMoving: false, lastDirMoving: '' })

    const opacity = useRef(new Animated.Value(0)).current
    
    const pan = useRef(new Animated.ValueXY()).current
    const panResponder = useRef(PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            pan.setOffset({
                x: pan.x._value,
                y: pan.y._value
            })
            if(pan.x !== 0) {
                changeMove((lastState) => ({ ...lastState, isMoving: true }))
                opacity.setValue(0)
            }
        },
        onPanResponderMove:  Animated.event([
            null,
            {
                dx: pan.x,
                dy: pan.y,
            },
        ], {useNativeDriver: false}),
        onPanResponderRelease: () => {
            changeMove((lastState) => ({ ...lastState, isMoving: false }))
            let posX = pan.x._value;
            if (posX > 0) {
                changeMove((lastState) => ({ ...lastState, lastDirMoving: 'right' }))
                Animated.timing(opacity, { toValue: 0, duration: 100 , useNativeDriver: false }).start()
            }
            else if (posX < 0) {
                changeMove((lastState) => ({ ...lastState, lastDirMoving: 'left' }))
                Animated.timing(opacity, { toValue: 1, duration: 100 , useNativeDriver: false }).start()
            }
            Animated.spring(
                pan,
                {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: false,
                }
            ).start()
        }
    })).current

    const size = opacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 50]
    })

    const animatedStyles = [
        styles.removeBtn,
        {
          opacity,
          width: size,
          height: size
        }
    ];

    return (
        <View style={styles.todoContainer}>
            <Animated.View style={[styles.todo, {transform: [{ translateX: pan.x }]}, !move.isMoving && move.lastDirMoving === 'left' ? {width: '84%'} : {}]} {...panResponder.panHandlers}>
                <TodoText>{item}</TodoText>
            </Animated.View>
            {
                !move.isMoving && move.lastDirMoving === 'left' &&
                <AnimatedTouchableHighlight style={ animatedStyles } onPress={() => {onRemove(id)}} underlayColor="#ff3333">
                    <Image style={styles.trashIcon} source={trashBacket} />
                </AnimatedTouchableHighlight>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    todoContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    todo: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderColor: '#ddd',
        borderWidth: 3,
        marginBottom: 8,
        borderRadius: 12
    },
    
    removeBtn: {
        width: 50,
        backgroundColor: 'red',
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center"
    },

    trashIcon: {
        width: 30,
        height: 30
    }
})

export default Todo