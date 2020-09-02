import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Card, Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = ({navigation}) => {
  const [data, setData] = useState({
    id: '',
    password: '',
  });
  const { id, password} = data;
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
              placeholder="Enter ID"
              onChangeText={(id) => setData({...data,id})}
              leftIcon={<Icon name="user" size={24} color="#2A2C2C" />}
            />
            <Input
              placeholder="Enter Password"
              onChangeText={(password) => setData({...data,password})}
              secureTextEntry={true}
              leftIcon={<Icon name="lock" size={24} color="#2A2C2C" />}
            />

            <Button
              buttonStyle={styles.buttonStyle}
              title="Login"
                onPress={() => console.log(data)}
            />
            <TouchableOpacity
              style={{alignItems: 'flex-end'}}
              onPress={() => navigation.navigate('Register')}>
              <Text style={{color: '#BFD7CF'}}>Dont Have an Account?</Text>
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
export default Login;
