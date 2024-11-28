import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailsScreen = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch prescriptions for the user
  const fetchPrescriptions = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('Token not found.');

      const res = await axios.post('http://192.168.94.18:5050/user-prescriptions', { token });
      if (res.data.status === 'ok') {
        setPrescriptions(res.data.data || []); // Set prescriptions or empty array
      } else {
        Alert.alert('Error', res.data.message || 'Failed to fetch prescriptions.');
      }
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
      Alert.alert('Error', 'Could not load prescriptions. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading prescriptions...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Your Prescriptions</Text>
      {prescriptions.length > 0 ? (
        prescriptions.map((prescription, index) => (
          <View key={index} style={styles.prescriptionCard}>
            <Text style={styles.prescriptionTitle}>Prescription {index + 1}</Text>
            <Text style={styles.prescriptionDate}>
              Created On: {new Date(prescription.created_at).toLocaleDateString()}
            </Text>
            {prescription.medicines.map((medicine, idx) => (
              <View key={idx} style={styles.medicineCard}>
                <Text style={styles.medicineName}>{medicine.name || 'Unknown Medicine'}</Text>
                <Text>Composition: {medicine.composition || 'N/A'}</Text>
                <Text>Dosage:</Text>
                <Text> - Breakfast: {medicine.dosage?.breakfast || 0}</Text>
                <Text> - Lunch: {medicine.dosage?.lunch || 0}</Text>
                <Text> - Dinner: {medicine.dosage?.dinner || 0}</Text>
                <Text>Duration: {medicine.duration || 'N/A'} days</Text>
                <Text>Timings: {medicine.timings?.join(', ') || 'N/A'}</Text>
              </View>
            ))}
          </View>
        ))
      ) : (
        <Text style={styles.noPrescriptionsText}>No prescriptions found.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#420475',
    marginBottom: 20,
  },
  prescriptionCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },
  prescriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  prescriptionDate: {
    fontSize: 14,
    marginBottom: 10,
    color: '#555',
  },
  medicineCard: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    elevation: 1,
  },
  medicineName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#420475',
  },
  noPrescriptionsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBBB00',
  },
});

export default DetailsScreen;
