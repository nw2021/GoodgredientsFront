import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from  'expo-permissions';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
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

    } else {
      Alert.alert("You need to give us permissionto first :(")
    }
  }

  const submitImg = async(img) => {
    // TODO: fetch api 
    console.log("submitting image to backend")
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
      <Image source={{ uri: '/Users/soyoung/Desktop/nw2021/GoodgredientsFront/GoodgredientsApp/img/gglogo.png' }} style={styles.logo} />
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

      <Ionicons.Button onlyicon name="ios-camera-outline" size={60} backgroundColor="#FAFAFA"  color="black" onPress={pickFromCamera}>
      </Ionicons.Button>
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
