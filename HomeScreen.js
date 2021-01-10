import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Alert, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from  'expo-permissions';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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
        <View style={styles.container}>
          <Image
            source={{ uri: selectedImage.localUri }}
            style={styles.thumbnail}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={submitImg}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      );
    }

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://github.com/nw2021/Goodgredients/blob/main/img/gglogo.png?raw=true' }} style={styles.logo} />
      <Text style={styles.instructions}>
        Just take a photo of your ingredient list! We'll take care the rest 
      </Text>

      <TouchableOpacity
        onPress={pickFromGallery}
        style={styles.button}>
        <Text style={styles.buttonText}>Pick from gallery</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={pickFromCamera}
        style={styles.button}>
        <Text style={styles.buttonText}>Pick from camera</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 330,
    height: 510,
    marginBottom: 20,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});


export default HomeScreen;