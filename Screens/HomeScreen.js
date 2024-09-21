import React, { useEffect } from "react";
import { Button, Text, View, StyleSheet, Alert } from 'react-native';
import Tts from 'react-native-tts';

function HomeScreen(){
    useEffect(() => {
        Tts.getInitStatus().then(() => {
          Tts.setDefaultLanguage('en-US'); 
          Tts.setDefaultRate(0.5); 
        }).catch((error) => {
          
          Alert.alert('Error', 'Text-to-Speech initialization failed');
          console.error('TTS Error: ', error);
        });
      }, []);
    
      const handleVoice = ttsText => {
        Tts.speak(ttsText);
      };


    return(
        <View style={styles.container}>
        {/* <Text style={styles.text} onPress={() => handleVoice('namaste, abb aapki dhavaai lenney ka sahmaayy hoooh ghayaa haaee. kripaya paraacetamol khanane ke baad len. dhanyavaad.')}> */}
        <Text style={styles.text} onPress={() => handleVoice('Hello, it is time to take your medicine. Please take paracetamol after meals. Thank you.')}>
          Reminder
        </Text>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 22,
    },
  });

export default HomeScreen;



// import React, { useEffect } from 'react';
// import { View, Text, StyleSheet, Alert } from 'react-native';
// import Tts from 'react-native-tts';

// function Rnvoice() {
//   useEffect(() => {
//     Tts.getInitStatus().then(() => {
//       Tts.setDefaultLanguage('en-US'); 
//       Tts.setDefaultRate(0.5); 
//     }).catch((error) => {
      
//       Alert.alert('Error', 'Text-to-Speech initialization failed');
//       console.error('TTS Error: ', error);
//     });
//   }, []);

//   const handleVoice = ttsText => {
//     Tts.speak(ttsText);
//   };

//   return (
//     <View style={styles.container}>
//       {/* <Text style={styles.text} onPress={() => handleVoice('namaste, abb aapki dhavaai lenney ka sahmaayy hoooh ghayaa haaee. kripaya paraacetamol khanane ke baad len. dhanyavaad.')}> */}
//       <Text style={styles.text} onPress={() => handleVoice('Hello, it is time to take your medicine. Please take paracetamol after meals. Thank you.')}>
//         Reminder
//       </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 22,
//   },
// });

// export default Rnvoice;
