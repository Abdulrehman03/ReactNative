import React from 'react';
import {Text, View, StyleSheet, Image, ImageBackground} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements';

const Home = ({navigation}) => {
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
            <Button
              buttonStyle={styles.buttonStyle}
              title="Login"
              onPress={() => navigation.navigate('Login')}
            />

            <Button
              buttonStyle={styles.buttonStyle}
              title="Register"
              onPress={() => navigation.navigate('Register')}
            />
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
export default Home;
