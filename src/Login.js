import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Btn from './Btn'
import { darkGreen, gray } from './Constants'
import Field from './Field'

const Login = (props) => {
  const [ email, setEmail] = useState("");
  const [ password, setPassword] = useState("");

  const handleLogin = event => {
    event.preventDefault();
    const uploadData = new FormData();

    const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");

    if (email.length < 4 || email.length > 70) {
      alert("Invalid email or username.");
    } else if (!strongRegex.test(email) || !email) {
      alert("Invalid email.")
    } else if (password.length < 8) {
      alert("Password is too short.");
    } else {
      uploadData.append('email', email);
      uploadData.append('password', password);
      console.log(uploadData);
      alert("Account created!")
    }
  };

  return (
    <View style={styles.view}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Login to your account</Text>
      <Field
        placeholder="Email / Username"
        keyboardType={'email-address'}
        onChange={event => setEmail(event.target.value)}
      />
      <Field
        placeholder="Password"
        onChange={event => setPassword(event.target.value)}
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
})

export default Login
