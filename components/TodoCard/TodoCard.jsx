import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Check from "../../assets/check.png";
import { s } from './Todo.style';

const TodoCard = ({ todo, onPress, onLongPress }) => {
  const strikeThrough = !!todo.isCompleted && { textDecorationLine: "line-through" }
  return (
    <TouchableOpacity
      delayLongPress={200}
      onLongPress={() => onLongPress(todo)}
      onPress={onPress} style={s.card}>
      <Text style={[s.title, strikeThrough]} >{todo.title}</Text>
      {todo.isCompleted && <Image source={Check} style={s.image} />}
    </TouchableOpacity>
  )
}

export default TodoCard

const styles = StyleSheet.create({})