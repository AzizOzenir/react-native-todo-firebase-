import { Text, View, StyleSheet, Button, TextInput, FlatList, TouchableOpacity } from 'react-native'
import * as React from 'react'
import { addDoc, collection, deleteDoc, onSnapshot, updateDoc, doc, getDocs, getDoc } from 'firebase/firestore'
import { FIREBASE_APP, FIRESTORE_DB } from "../firebaseConfig";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import { signOut } from 'firebase/auth';




export default function HomePage({navigation}) {

    const [todos, settodos] = React.useState([]);
    const [todo, settodo] = React.useState("");


    //little check for start
    const auth = getAuth()
    React.useEffect(() => {
      if (auth.currentUser == null) {
        navigation.navigate('AuthPage')
      }
    
      
    }, [])
    

    const addTodo = async () => {
        const todoRef = collection(FIRESTORE_DB, "todos");
        await addDoc(todoRef, { title: todo, done: false });
        settodo("")
    }

    const logout = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
            navigation.navigate('AuthPage')
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        const todoRef = collection(FIRESTORE_DB, "todos");

        const subscriber = onSnapshot(todoRef, {
            next: (snapshot) => {
                const todos = [];
                snapshot.docs.map((doc) => {
                    todos.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
                settodos(todos)
            }
        })
        return () => subscriber();
    }, [])

    const renderTodo = ({ item }) => {
        const ref = doc(FIRESTORE_DB, `todos/${item.id}`)
        const toggleDone = async () => {
            updateDoc(ref, { done: !item.done })
        }
        const deleteItem = async () => {
            deleteDoc(ref)

        }
        return <View style={styles.listItem}>
            <TouchableOpacity onPress={toggleDone}>
                {item.done ? <Ionicons name='md-checkmark-circle' color="green" size={16} /> : <Entypo name="circle" size={16} color="black" />}
            </TouchableOpacity>
            <Text style={styles.todoText}>{item.title}</Text>
            <Ionicons name='trash-bin-outline' color="red" onPress={deleteItem} size={16} />
        </View>;

    }
    return (
        <View style={styles.container}>
            <Button title='Logout' onPress={logout} />
            <View style={styles.form}>
                <TextInput style={styles.input}
                    placeholder="Add Some Todos"
                    onChangeText={(text) => settodo(text)}
                    value={todo}
                />
                <Button
                    style={
                        styles.button
                    }
                    onPress={addTodo}
                    title="Add the Todo"
                    disabled={todo === ""}
                    color="green" />
            </View>

            {todos.length > 0 ? (
                <View>
                    <FlatList data={todos} renderItem={(todo) => renderTodo(todo)} keyExtractor={(todo) => todo.id} />

                </View>
            ) : (<Text>No todo</Text>)}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 18,

    },
    form: {
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        flex: 1,
        height: 40,
        width: 100,
        borderWidth: 0.2,
        borderRadius: 3,
        paddingLeft: 12,
        margin: 4,


    },
    listItem: {
        flexDirection: "row",

        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        padding: 12,
        paddingHorizontal: 30,
        width: 300,
        borderRadius: 8,

        marginVertical: 4,

    },
    todoText: {
        flex: 1,
        paddingHorizontal: 4,
    },
    todo: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    button: {
        flex: 1,
        color: "black",
        tintColor: "green",

        backgroundColor: "green"


    }
});


