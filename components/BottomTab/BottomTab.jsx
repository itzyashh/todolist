import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { s } from './BottomTab.style'

const BottomTab = ({selectedTab,onPress,todoList}) => {

  const selectedTabStyle = (tab) => {
    if (selectedTab === tab) {
      return {
        color: '#2F65E7',
        fontWeight: 'bold',
      }
    }
  }

  const countByStatus = (status) => {
    return todoList.filter((todo) => todo.isCompleted === status).length
  }

  const handleOnPress = (tab) => {
    onPress(tab)
  }


  return (
    <View style={s.root}>
      <TouchableOpacity onPress={() => handleOnPress('All')}>
        <Text style={selectedTabStyle('All')}>All ({todoList.length})</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleOnPress('In Progress')}>
        <Text style={selectedTabStyle('In Progress')}>In Progress ({countByStatus(false)})</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleOnPress('Done')}>
        <Text style={selectedTabStyle('Done')}>Done ({countByStatus(true)})</Text>
      </TouchableOpacity>
    </View>
  )
}

export default BottomTab

const styles = StyleSheet.create({})