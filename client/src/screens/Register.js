import React, {useState} from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
import {register} from '../actions/auth'

import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage
} from 'react-native';
import {Card, Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';



const Register = ({navigation,register}) => {
  const [data, setData] = useState({
    name: '',
    id: '',
    password: '',
  });
  const {name, id, password} = data;

  const onsubmit = async () => {
  register(data);
  
  };

  return (
    <ImageBackground
      source={require('../../images/bg.jpg')}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.home}>
          <Card
            title="JOINNER"
            titleStyle={{fontSize: 30, color: '#2A2C2C'}}
            containerStyle={styles.card}>
            <Input
              placeholder="Enter Name"
              value={name}
              onChangeText={(name) => setData({...data, name})}
              leftIcon={<Icon name="user" size={24} color="#2A2C2C" />}
            />
            <Input
              placeholder="Enter ID"
              name="id"
              value={id}
              onChangeText={(id) => setData({...data, id})}
              leftIcon={<Icon name="user" size={24} color="#2A2C2C" />}
            />
            <Input
              placeholder="Enter Password"
              name="password"
              onChangeText={(password) => setData({...data, password})}
              secureTextEntry={true}
              leftIcon={<Icon name="lock" size={24} color="#2A2C2C" />}
            />

            <Button
              buttonStyle={styles.buttonStyle}
              title="Register"
              onPress={onsubmit}
            />
            <TouchableOpacity
              style={{alignItems: 'flex-end'}}
              onPress={() => navigation.navigate('Login')}>
              <Text style={{color: '#BFD7CF'}}>Already have an Account?</Text>
            </TouchableOpacity>
          </Card>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch',
  },

  home: {
    alignItems: 'center',
  },

  buttonStyle: {
    borderRadius: 150 / 2,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    marginTop: 10,
    backgroundColor: '#2A2C2C',
  },
  card: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderRadius: 100 / 2,
    width: 300,
    fontSize: 40,
  },
});
const mapStateToProps = state => ({
 
})

export default connect(mapStateToProps, { register })(Register)
