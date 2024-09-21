// import React from "react";
// import {Button, Text, View} from 'react-native'
// function DetailsScreen(){
//     return(
//         <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
//             <Text style={{color:"black",fontSize:22}}>Details Screen</Text>
//         </View>
//     );
// }
// export default DetailsScreen;
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
const DetailsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Medicines</Text>
      <ScrollView contentContainerStyle={styles.medicineContainer}>
        {[1, 2, 3].map((medicine, index) => (
          <View key={index} style={styles.medicineCard}>
            <View style={styles.medicineHeader}>
              <Text style={styles.medicineTitle}>Medicine {medicine}:</Text>
            </View>
            <View style={styles.medicineDetails}>
              <Text style={styles.medicineText}>Name:</Text>
              <Text style={styles.medicineText}>Dose:</Text>
              <Text style={styles.medicineText}>Duration:</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#EBBB00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  medicineContainer: {
    paddingBottom: 20,
  },
  medicineCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
    overflow: 'hidden',
  },
  medicineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#420475',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  medicineTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  medicineDetails: {
    padding: 15,
  },
  medicineText: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default DetailsScreen;