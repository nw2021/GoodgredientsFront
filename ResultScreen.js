import React, { useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
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

      const renderItem = ({item: {label, description}}) => {
        return (
          <View style={styles.item}>
            <Text style={styles.title}>:warning:{label}</Text>
            <Text>{description}</Text>
          </View>
        )
      }

    return (
      <View style={styles.container}>
        <Text style={styles.menu}>Result: The Ingredients that might harmful to you</Text>
        <FlatList
          data={item}
          renderItem={renderItem}
          keyExtractor={item => item.label}
        />
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
    item: {
      backgroundColor: '#88d498',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 5,
    },
    title: {
      fontSize: 32,
      fontFamily: 'Montserrat',
    },
    menu: {
      fontSize: 14,
      fontFamily: 'Montserrat',
    },
})

export default ResultScreen;