import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Btn from './Btn'
import { darkGreen, gray, red } from './Constants'
import Field from './Field'

const Login = (props) => {
  const [ email, setEmail] = useState("");
  const [ password, setPassword] = useState("");
  const[ errorMsg, setErrorMsg] = useState("");

  const loginUser = async () => {
    await fetch(`${Constants.manifest?.extra?.API_URL}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(function (response) {
      if (response.status === 201) {
        setErrorMsg('')
        props.navigation.navigate('Login')
        return
      }
      if (response.status === 403) {
        errorMsg('Email already taken or typed invalid inputs')
      }
    })
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    const uploadData = new FormData();

    const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");

    if (!strongRegex.test(email) || !email) {
      alert("Invalid email.")
    } else if (password.length < 8) {
      alert("Password is too short.");
    } else {
      uploadData.append('email', email);
      uploadData.append('password', password);
      console.log(uploadData);
      await loginUser()
    }
  };

  return (
    <View style={styles.view}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Login to your account</Text>
      <Field
        placeholder="Email"
        keyboardType={'email-address'}
        onChangeText={(text) => setEmail(text)}
      />
      <Field
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <Btn
        textColor="white"
        bgColor={darkGreen}
        btnLabel="Login"
        Press={handleLogin}
      />
      <View style={styles.form}>
        <Text style={styles.callout}>Do not have an account ? </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
          <Text style={styles.register}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    height: 700,
    width: 460,
    borderTopLeftRadius: 150,
    paddingTop: 200,
    paddingRight: 70,
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    color: darkGreen,
    fontWeight: 'bold',
  },
  subtitle: {
    color: gray,
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30,
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  callout: { fontSize: 16, fontWeight: 'bold' },
  register: { color: darkGreen, fontWeight: 'bold', fontSize: 16 },
  error: { color: red, fontSize: 16 },
})

export default Login