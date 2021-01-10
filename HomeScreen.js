import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Alert, ImageBackground, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from  'expo-permissions';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const image = { uri: 'https://images.unsplash.com/photo-1503435980610-a51f3ddfee50?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80' };

function HomeScreen({ navigation }) {

  const [selectedImage, setSelectedImage] = React.useState(null);

  const pickFromGallery = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  }


  const pickFromCamera = async () => {
    const {granted} = await Permissions.askAsync(Permissions.CAMERA)
    if(granted) {
      let pickerResult = await ImagePicker.launchCameraAsync();
      console.log(pickerResult);
      if(pickerResult.cancelled === true) {
        return;
      }
      setSelectedImage({ localUri: pickerResult.uri });
      navigation.navigate('SubmitScreen', {uri: pickerResult.uri })

    } else {
      Alert.alert("You need to give us permissionto first :(")
    }
  }

  const submitImg = async() => {
    // console.log(selectedImage.localUri)
    console.log("submitting image to backend")

    const response = fetch('https://goodgredients-backend.herokuapp.com/api/ingredients', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ location: 'https://i.stack.imgur.com/tWJ66.jpg' })
    })
    .then(res => res.json())
    .then(res => navigation.navigate('ResultScreen', {result: res })
    )

  return response
  } 

  if (selectedImage !== null) {
    return (
     <ImageBackground source={image} style={styles.image}>
        <View style={styles.container}>
          <Image
            source={{ uri: selectedImage.localUri }}
            style={styles.thumbnail}
          />
        </View>
        <View style={styles.container}>
          <Button
            style={styles.alternativeLayoutButtonContainer}
            onPress={submitImg}
            title="Submit!"
          />
        </View>
        </ImageBackground>
        
      );
    }

  return (
      <ImageBackground source={image} style={styles.image}>
        <View>
        {/* <Image source={{ uri: 'https://github.com/nw2021/Goodgredients/blob/main/img/gglogo.png?raw=true' }} style={styles.logo} /> */}
      <Text style={styles.title}>
        Welcome to Goodgredients
      </Text>
      <Text style={styles.instructions}>
      Submit a photo of the ingredients to do a quick check!
      </Text>
      
      <View style={styles.alternativeLayoutButtonContainer}>
      <TouchableOpacity
        title="Gallery"
        onPress={pickFromGallery}
        style={styles.button}>
        <Text style={{ fontSize: 20, color: '#fff' }}>Gallery</Text>
      </TouchableOpacity>

      <TouchableOpacity
        title="Camera"
        onPress={pickFromCamera}
        style={styles.button}
      >
      <Text style={{ fontSize: 20, color: '#fff' }}>Camera</Text>
      </TouchableOpacity>
      </View>
      </View>
      </ImageBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    color: '#4FADA6',
    fontSize: 45,
    marginHorizontal: 15,
    marginBottom: 30,
    fontWeight: "bold"
  },
  logo: {
    width: 330,
    height: 510,
    marginBottom: 20,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  instructions: {
    color: '#888',
    fontSize: 22,
    marginHorizontal: 15,
    marginBottom: 10,
    fontFamily: 'Montserrat',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'blue'
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  thumbnail: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});


export default HomeScreen;