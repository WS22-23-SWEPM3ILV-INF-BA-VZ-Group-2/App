import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Btn from './Btn'
import Field from './Field'
import { darkGreen } from './Constants'

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [ email, setEmail] = useState("");
  const [ password, setPassword] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    const uploadData = new FormData();

    const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");

    if (!username || username.length < 4 || username.length > 70) {
      alert("Invalid username.");
    } else if (!strongRegex.test(email) || !email) {
      alert("You did not enter a valid email.")
    } else if (password.length < 8) {
      alert("Password is too short.");
    } else {
      uploadData.append('username', username);
      uploadData.append('email', email);
      uploadData.append('password', password);
      console.log(uploadData);
      alert("Account created!")
    }
  };

  return (
    <View style={styles.view}>
      <Text style={styles.title}>Register</Text>

      <Field 
        placeholder="Username"
        onChange={event => setUsername(event.target.value)}
      />
      <Field
        placeholder="Email"
        keyboardType={'email-address'}
        onChange={event => setEmail(event.target.value)}
      />
      <Field
        placeholder="Password"
        onChange={event => setPassword(event.target.value)}
        secureTextEntry={true}
      />

      <Btn
        btnLabel="Let's go!"
        Press={handleSubmit}
      />
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
    marginBottom: 40,
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  callout: { fontSize: 16, fontWeight: 'bold' },
  login: { color: darkGreen, fontWeight: 'bold', fontSize: 16 },
})

export default Register