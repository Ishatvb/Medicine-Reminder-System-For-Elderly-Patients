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

// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TextInput, Button, TouchableOpacity } from 'react-native';
// import axios from 'axios';

// const DetailsScreen = () => {
//   const [medicines, setMedicines] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingIndex, setEditingIndex] = useState(null); // Track which medicine is being edited
//   const [tempMedicine, setTempMedicine] = useState(null); // Store temporary changes

//   useEffect(() => {
//     const fetchMedicines = async () => {
//       try {
//         const response = await axios.get('http://192.168.103.18:5050/medicines');
//         setMedicines(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching medicines:', error);
//         setLoading(false);
//       }
//     };

//     fetchMedicines();
//   }, []);

//   const handleEdit = (index) => {
//     setEditingIndex(index);
//     setTempMedicine({ ...medicines[index] }); // Create a copy of the medicine object for editing
//   };

//   const handleSave = async () => {
//     try {
//       // Send updated data to the backend
//       // The request is sent to your backend API endpoint to update the details for that specific medicine.
//       await axios.put('http://192.168.232.18:5050/medicines/${tempMedicine._id}', tempMedicine);

//       // Update the medicines list locally
//       const updatedMedicines = [...medicines];
//       updatedMedicines[editingIndex] = tempMedicine;
//       setMedicines(updatedMedicines);
//       setEditingIndex(null); // Exit edit mode
//     } catch (error) {
//       console.error('Error saving medicine details:', error);
//     }
//   };

//   const handleChange = (field, value) => {
//     setTempMedicine((prev) => ({
//       ...prev,
//       [field]: isNaN(value) ? value : parseFloat(value) || value, // Convert numeric values where applicable
//     }));
//   };

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />;
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Your Medicines</Text>
//       <ScrollView contentContainerStyle={styles.medicineContainer}>
//         {medicines.map((medicine, index) => (
//           <View key={index} style={styles.medicineCard}>
//             <View style={styles.medicineHeader}>
//               <Text style={styles.medicineTitle}>Medicine {index + 1}:</Text>
//               <TouchableOpacity onPress={() => handleEdit(index)}>
//                 <Text style={styles.editButton}>Edit</Text>
//               </TouchableOpacity>
//             </View>
//             <View style={styles.medicineDetails}>
//               {Object.keys(medicine).map((field) => (
//                 editingIndex === index ? (
//                   <View key={field} style={styles.inputContainer}>
//                     <Text style={styles.label}>{field}:</Text>
//                     <TextInput
//                       style={styles.input}
//                       value={String(tempMedicine[field])}
//                       onChangeText={(value) => handleChange(field, value)}
//                       placeholder={'Enter ${field}'}
//                       keyboardType={typeof medicine[field] === 'number' ? 'numeric' : 'default'}
//                     />
//                   </View>
//                 ) : (
//                   <Text key={field} style={styles.medicineText}>
//                     {'${field.charAt(0).toUpperCase() + field.slice(1)}: ${medicine[field]}'}
//                   </Text>
//                 )
//               ))}
//               {editingIndex === index && (
//                 <Button title="Save" onPress={handleSave} />
//               )}
//             </View>
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   header: {
//     backgroundColor: '#EBBB00',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   medicineContainer: {
//     paddingBottom: 20,
//   },
//   medicineCard: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 5,
//     marginBottom: 10,
//     overflow: 'hidden',
//   },
//   medicineHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#420475',
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//   },
//   medicineTitle: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   editButton: {
//     color: '#00f',
//     textDecorationLine: 'underline',
//   },
//   medicineDetails: {
//     padding: 15,
//   },
//   medicineText: {
//     fontSize: 14,
//     marginBottom: 5,
//   },
//   inputContainer: {
//     marginBottom: 10,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//   },
//   loadingIndicator: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default DetailsScreen;