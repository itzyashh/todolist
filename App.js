import { View, Text, ScrollView, Alert } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from './App.style';
import Header from './components/Header/Header';
import TodoCard from './components/TodoCard/TodoCard';
import BottomTab from './components/BottomTab/BottomTab';
import AddButton from './components/AddButton/AddButton';
import Dialog from "react-native-dialog";
import uuid from 'react-native-uuid';

const TODOLIST = [
  // {
  //   id: 1,
  //   title: "Learn React Native",
  //   isCompleted: true,
  // },
  // {
  //   id: 2,
  //   title: "Learn Redux",
  //   isCompleted: false,
  // },
  // {
  //   id: 3,
  //   title: "Learn React Navigation",
  //   isCompleted: false,
  // },
  // {
  //   id: 4,
  //   title: "Learn React Native Paper",
  //   isCompleted: false,
  // },
  // {
  //   id: 5,
  //   title: "Learn React Native Vector Icons",
  //   isCompleted: false,
  // },
  // {
  //   id: 6,
  //   title: "Learn React Native Gesture Handler",
  //   isCompleted: false,
  // },
  // {
  //   id: 7,
  //   title: "Learn React Native Reanimated",
  //   isCompleted: false,
  // },
  // {
  //   id: 8,
  //   title: "Learn React Native Safe Area Context",
  //   isCompleted: false,
  // },
  // {
  //   id: 9,
  //   title: "Learn React Native Tab View",
  //   isCompleted: false,
  // },
  // {
  //   id: 10,
  //   title: "Learn React Native Web View",
  //   isCompleted: false,
  // },
  // {
  //   id: 11,
  //   title: "Learn React Native Modal",
  //   isCompleted: false,
  // },
  // {
  //   id: 12,
  //   title: "Learn React Native Image Picker",
  //   isCompleted: false,
  // },
  // {
  //   id: 13,
  //   title: "Learn React Native Image Crop Picker",
  //   isCompleted: false,
  // },
  // {
  //   id: 14,
  //   title: "Learn React Native Image Editor",
  //   isCompleted: false,
  // },
  // {
  //   id: 15,
  //   title: "Learn React Native Image Filters",
  //   isCompleted: false,
  // },
  // {
  //   id: 16,
  //   title: "Learn React Native Image Marker",
  //   isCompleted: false,
  // },
  // {
  //   id: 17,
  //   title: "Learn React Native Image Resizer",
  //   isCompleted: false,
  // },
  // {
  //   id: 18,
  //   title: "Learn React Native Image Rotate",
  //   isCompleted: false,
  // },
  // {
  //   id: 19,
  //   title: "Learn React Native Image Size",
  //   isCompleted: false,
  // },
]

const App = () => {

  const [todoList, setTodoList] = React.useState(TODOLIST)
  const [selectedTab, setSelectedTab] = React.useState('All')
  const [showDialog, setShowDialog] = React.useState(false)
  const [inputText, setInputText] = React.useState('')

  const renderTodoList = () => {
    return filterTodoList(selectedTab).map((todo) => (
       <View key={todo.id} style={s.todoItem}>
        <TodoCard onLongPress={deleteTodo} todo={todo} onPress={() => updateTodo(todo.id)} />
      </View>
    ))
    }

  const deleteTodo = (todo) => {
    Alert.alert(
      "Delete Todo",
      `Are you sure you want to delete ${todo.title}?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK",
          style: "destructive",
        onPress: () => {
          const newTodoList = todoList.filter(item=>item.id !== todo.id)
    setTodoList(newTodoList)
        } }
      ]
    );
    
  }

  const addTodo = () => {
    const newTodo ={
      id: uuid.v4(),
      title: inputText,
      isCompleted: false
    }
    const newTodoList = [...todoList, newTodo]
    setTodoList(newTodoList)
    setShowDialog(false)
  }

  const renderDailog = () => {
    return (
      <Dialog.Container visible={showDialog} onBackdropPress={()=>setShowDialog(false)}>
      <Dialog.Title>Add todo</Dialog.Title>
      <Dialog.Input 
      onChangeText={(text)=>setInputText(text)}
       placeholder='eg. Learn React Native' />

      <Dialog.Button
        color="grey"
       label="Cancel" onPress={()=>setShowDialog(false)} />
      <Dialog.Button label="Save" onPress={addTodo} />
    </Dialog.Container>
    )
  }

  const filterTodoList = (tab) => {
    switch (tab) {
      case 'All':
        return todoList
      case 'In Progress':
        return todoList.filter((todo) => !todo.isCompleted)
      case 'Done':
        return todoList.filter((todo) => todo.isCompleted)
      default:
        return todoList
    }
  }

  const updateTodo = (id) => {
    console.log(id)
    const newTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        }
      }
      return todo
    })
    setTodoList(newTodoList)
  }


  return (<>
    <SafeAreaProvider>
      <SafeAreaView style={s.app}>
        <View style={s.header}>
          <Header />
        </View>
        <View style={s.body}>
          <ScrollView
            showsVerticalScrollIndicator={false}>
          {renderTodoList()}
          </ScrollView>
          <AddButton onPress={() => setShowDialog(true)} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
    <View style={s.footer}>
      <BottomTab todoList={todoList} selectedTab={selectedTab} onPress={setSelectedTab} />
    </View>
    {renderDailog()}
  </>

  )
}

export default App