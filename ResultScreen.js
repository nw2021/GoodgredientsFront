import React, { useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import 'react-native-gesture-handler';

function ResultScreen({ route, navigation }) {
    useEffect(() => {
        setItem(route.params.result)
        console.log(route.params.result)
    }, [])

    const [item, setItem] = useState([{
        "allergy": "FALSE",
        "chemical": "HEH",
        "description": "Some research suggests that PEG contains dangerous dioxin levels, found as a by-product of the ethoxylation process in its manufacturing process. Dioxins have a direct link to cancer development. In other words, PEG might contribute indirectly to the increase of cancer development.",
        "label": "PEG",
      }])

    return (
      <View style={styles.container}>
        <Text>ResultScreen</Text>
        <Text> {item[0].chemical}</Text>
        <Button
          title="Go Back to home"
          onPress={() =>
            navigation.popToTop()
          }
        />
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
})

export default ResultScreen;