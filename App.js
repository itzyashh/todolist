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
import AsyncStorage from '@react-native-async-storage/async-storage';


let firstRender = true
const App = () => {

  const [todoList, setTodoList] = React.useState([])
  const [selectedTab, setSelectedTab] = React.useState('All')
  const [showDialog, setShowDialog] = React.useState(false)
  const [inputText, setInputText] = React.useState('')
  const scrollRef = React.useRef(null)

  React.useEffect(() => {
    getTodoList()
  }, [])
  React.useEffect(() => {
    if (firstRender) {
      firstRender = false
      return
    }
    saveTodo()
  }, [todoList])




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
    setInputText('')
    setShowDialog(false)
    setTimeout(()=>{
      scrollRef.current.scrollToEnd()
    },300)
  }

  const saveTodo = async () => {
    console.log('saveTodo')
    try {
      await AsyncStorage.setItem('@todoList', JSON.stringify(todoList))
    } catch (e) {
      console.log(e)
    }
  }

  const getTodoList = async () => {
    console.log('getTodoList')
    try {
      const todoList = await AsyncStorage.getItem('@todoList')
      if (todoList) {
        setTodoList(JSON.parse(todoList))
      }
    }
    catch (e) {
      console.log(e)
    }
  }




  const renderDailog = () => {
    
    return (
      <Dialog.Container
       visible={showDialog} onBackdropPress={()=>setShowDialog(false)}>
      <Dialog.Title>Add todo</Dialog.Title>
      <Dialog.Input 
      onChangeText={(text)=>setInputText(text)}
      onSubmitEditing={addTodo}
      autoFocus={true}
      autoCapitalize='sentences'
      autoCorrect={false}
       placeholder='eg. Learn React Native' />

      <Dialog.Button
        color="grey"
       label="Cancel" onPress={()=>setShowDialog(false)} />
      <Dialog.Button
        style={{opacity: inputText ? 1 : 0.5}}
        disabled={!inputText}
       label="Save" onPress={addTodo} />
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
          ref={scrollRef}
          contentContainerStyle={s.scrollViewContentContainerStyle}
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