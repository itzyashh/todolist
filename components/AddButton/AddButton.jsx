import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { s } from './ButtonAdd.style'

const AddButton = ({onPress}) => {
  return (
    <TouchableOpacity
        onPress={onPress}
     style={s.button}>
        <Text style={s.text}>+ New todo</Text>
    </TouchableOpacity>
  )
}

export default AddButton

const styles = StyleSheet.create({})