import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Alert, Button } from 'react-native';
import { Avatar } from 'react-native-paper';
import Mobile from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const [userData, setUserData] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  // Function to fetch user data
  async function getData() {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.post('http://192.168.43.121:5050/userdata', { token });
      setUserData(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error.message || error);
      Alert.alert('Error', 'Failed to fetch user data. Please check your connection.');
      setLoading(false);
    }
  }

  // Logout function
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => navigation.replace('Onboard') }, 
    ]);
  };

  // Fetch user data on component mount
  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.profileContainer}>
        {/* Avatar and Name */}
        <Avatar.Image
          size={150}
          style={styles.avatar}
          source={{
            uri: userData?.image || 'default_avatar_url', // Provide a default image URL here
          }}
        />
        <Text style={styles.nameText}>{userData.name || 'Name not available'}</Text>
      </View>

      {/* User Information Section */}
      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Mobile name="mobile" size={24} style={styles.icon} />
          <View style={styles.infoText}>
            <Text style={styles.label}>Mobile</Text>
            <Text style={styles.value}>{userData?.mobile || 'Not available'}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Uploaded Prescription:</Text>
          {/* <Text style={styles.value}>{userData?.prescription || 'No prescription uploaded'}</Text> */}
        </View>
        <Text style={styles.value}>{userData?.prescription || 'No prescription uploaded'}</Text>

      </View>

      {/* Logout Button */}
      <View style={styles.buttonContainer}>
        <Button title="Logout" onPress={handleLogout} color="#420475" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBBB00',
    paddingHorizontal: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  avatar: {
    borderRadius: 75,
    backgroundColor: 'white',
    elevation: 4,
  },
  nameText: {
    color: '#333',
    fontSize: 24,
    fontWeight: '600',
    marginTop: 15,
  },
  infoSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 2,
    marginBottom: 30,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginRight: 15,
    color: '#420475',
  },
  infoText: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    color: '#555',
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    marginVertical: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBBB00',
  },
});

export default ProfileScreen;
