// import React from "react";
// import {Button, Text, View} from 'react-native'
// function ProfileScreen(){
//     return(
//         <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
//             <Text style={{color:"black",fontSize:22}}>Profile Screen</Text>
//         </View>
//     );
// }

// export default ProfileScreen;
import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation(); // Hook to access the navigation object

  // Sample user information
  const userName = 'John Doe'; // Replace with dynamic data if necessary
  const uploadedPrescriptionName = 'Prescription_April_2024.pdf'; // Replace with actual prescription name

  // Logout function
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => navigation.replace('Onboard') }, // Navigates to OnboardScreen
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>User Name:</Text>
        <Text style={styles.value}>{userName}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Uploaded Prescription:</Text>
        <Text style={styles.value}>{uploadedPrescriptionName}</Text>
      </View>
      <View style={styles.logoutButton}>
        <Button title="Logout" onPress={handleLogout} color="#EBBB00" />
      </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  infoContainer: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  logoutButton: {
    marginTop: 30,
    borderRadius: 5,
    overflow: 'hidden',
  },
});

export default ProfileScreen;

