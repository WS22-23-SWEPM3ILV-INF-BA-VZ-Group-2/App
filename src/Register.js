import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Btn from './Btn'
import Field from './Field'
import { darkGreen, red } from './Constants'
import Constants from 'expo-constants'

const Register = (props) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userErrorMsg, setUserErrorMsg] = useState('')
  const [emailErrorMsg, setEmailErrorMsg] = useState('')
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('')

  const registerUser = async () => {
    await fetch(`${Constants.manifest?.extra?.API_URL}/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    }).then(function (response) {
      if (response.status === 201) {
        props.navigation.navigate('Login')
        return
      }
      if (response.status === 403) {
        alert('Username or Email already taken, or invalid inputs')
      }
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const strongRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/

    setUserErrorMsg('')
    setEmailErrorMsg('')
    setPasswordErrorMsg('')

    if (!username || username.length < 4 || username.length > 70) {
      setUserErrorMsg('Invalid username.')
    } else if (!strongRegex.test(email) || !email) {
      setEmailErrorMsg('You did not enter a valid email.')
    } else if (password.length < 8) {
      setPasswordErrorMsg('Password is too short.')
    } else {
      await registerUser()
    }
  }

  const handleUsername = async (text) => {
    setUsername(text)
  }
  const handleEmail = async (text) => {
    setEmail(text)
  }

  const handlePassword = async (text) => {
    setPassword(text)
  }

  return (
    <View style={styles.view}>
      <Text style={styles.title}>Register</Text>

      <Field placeholder="Username" onChangeText={handleUsername} />
      <Text style={styles.error}>{userErrorMsg}</Text>
      <Field
        placeholder="Email"
        keyboardType={'email-address'}
        onChangeText={handleEmail}
      />
      <Text style={styles.error}>{emailErrorMsg}</Text>
      <Field
        placeholder="Password"
        onChangeText={handlePassword}
        secureTextEntry={true}
      />
      <Text style={styles.error}>{passwordErrorMsg}</Text>
      <Btn btnLabel="Let's go!" Press={handleSubmit} />

      <View style={styles.form}>
        <Text style={styles.callout}>Already have an account ? </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
          <Text style={styles.login}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    marginVertical: 100,
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    color: darkGreen,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  callout: { fontSize: 16, fontWeight: 'bold' },
  login: { color: darkGreen, fontWeight: 'bold', fontSize: 16 },
  error: { color: red, fontSize: 16 },
})

export default Register
