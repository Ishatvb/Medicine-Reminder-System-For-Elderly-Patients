import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, ActivityIndicator, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';

export default function UploadScreen() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const selectImage = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setSelectedImage(result[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.log('Error: ', err);
      }
    }
  };

  const uploadImage = async () => {
    if (!selectedImage) {
      Alert.alert('No image selected', 'Please select an image first.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image', {
      uri: selectedImage.uri,
      type: selectedImage.type,
      name: selectedImage.name,
    });

    try {
      const response = await axios.post('http://192.168.94.18:5050/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      if (response.data.status === 'ok') {
        Alert.alert('Upload Successful', 'Your image has been uploaded successfully!');
      } else {
        // Alert.alert('Upload Failed', response.data.message || 'An error occurred during the upload.');
      }
    } catch (error) {
      setLoading(false);
      console.error('Upload Error:', error);
      // Alert.alert('Upload Failed', 'An error occurred while uploading the image.');
    }

  


    // try {
    //     const response = await axios.get('http://192.168.109.18:5050'); // Ensure your server has a root route
    //     console.log('Server response:', response.data);
    //   } catch (error) {
    //     console.error('Error fetching from server:', error);
    //   }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medicine Reminder</Text>
      <Text style={styles.subtitle}>Please upload your prescription</Text>
      
      <Button title="Select Image" onPress={selectImage} color="#EBBB00" />

      {selectedImage && (
        <Image
          source={{ uri: selectedImage.uri }}
          style={styles.imagePreview}
        />
      )}

      <Button
        title={loading ? 'Uploading...' : 'Upload'}
        onPress={uploadImage}
        color="#4CAF50"
        disabled={loading}
      />
      
      
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 36,
    color: '#420475',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginVertical: 20,
  },
});
