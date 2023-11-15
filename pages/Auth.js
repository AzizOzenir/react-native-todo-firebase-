import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';


const AuthPage = ({navigation}) => {
  const [issignin, setissignin] = useState(true);
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');


    //little check for start
    const auth = getAuth()
    React.useEffect(() => {
      if (auth.currentUser != null) {
        console.log("1") 
        navigation.navigate('HomePage')
      } 
      console.log("useEffect") 
      
    }, [])

  function showToast(error) {
    ToastAndroid.show(`an error occured ${error}`, ToastAndroid.SHORT);
  }


  const signin = async () => {
    try {
     await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('HomePage')
      
    } catch (error) {
      showToast(error)
    }

  };
  const signup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate('HomePage')
    } catch (error) {
      showToast(error)
    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Auth</Text>
      <TextInput
        style={styles.input}
        placeholder="email"
        onChangeText={(text) => setemail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity style={styles.button} onPress={() => {
        issignin ? signin() : signup()
      }}>
        <Text style={styles.buttonText}>{issignin ? "Signin" : "Signup"}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.issignin} onPress={() => {
        setissignin(!issignin)
      }}>
        <Text style={styles.issignin}>you {issignin ? "don't " : " "} have an account. Let's {issignin ? "signup" : "signin"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 0.5,
    marginBottom: 12,
    borderRadius: 5,
    paddingLeft: 8,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  issignin: {
    marginTop: 10,
    backgroundColor: "transparent",
    fontSize: 10
  }
});

export default AuthPage; 