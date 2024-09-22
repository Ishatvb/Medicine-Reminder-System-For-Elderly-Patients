import * as React from 'react';
import UploadScreen from './Screens/UploadScreen';
import HomeScreen from './Screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import DetailsScreen from './Screens/DetailsScreen';
import ProfileScreen from './Screens/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SplashScreen from 'react-native-splash-screen';
import { useEffect } from 'react';
import LoginPage from './Screens/Login&Register/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterPage from './Screens/Login&Register/Register';
import { Drawer } from 'react-native-paper';

// Main App Component
export default function App(){
    const TabNav = createBottomTabNavigator();
    const Stack = createNativeStackNavigator();

    useEffect(() => {
        setTimeout(()=>{
            SplashScreen.hide(); // Hide the splash screen after the app has loaded
        }, 500)
    });

    const tabConfig = [
        {
          name: "Home",
          component: HomeScreen, 
          focusedIcon: "home",
          unfocusedIcon: "home-outline",
          iconComponent: Ionicons
        },
        {
            name: "Upload",
            component: UploadScreen,
            focusedIcon: "file-upload",
            unfocusedIcon: "file-upload-outline",
            iconComponent: MaterialCommunityIcons
        },
        {
            name: "Details",
            component: DetailsScreen,
            focusedIcon: "file-text",
            unfocusedIcon: "file-text-o",
            iconComponent: FontAwesome // Use FontAwesome for Details icons
        },
        {
            name: "Profile",
            component: ProfileScreen,
            focusedIcon: "user",
            unfocusedIcon: "user-o",
            iconComponent: FontAwesome
        }
    ];

    const screenOptions = ({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
            const routeConfig = tabConfig.find(config => config.name === route.name);
            const iconName = focused
                ? routeConfig.focusedIcon
                : routeConfig.unfocusedIcon;
            const IconComponent = routeConfig.iconComponent;

            return <IconComponent name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#420475',
        tabBarInactiveTintColor: 'black',
        tabBarLabelStyle: {
            fontSize: 14,
            paddingBottom: 5,
            fontWeight: '600'
        },
        tabBarStyle: {
            height: 60,
            paddingTop: 0
        }
    });


    const TabNavigator = () => (
    <TabNav.Navigator screenOptions={screenOptions}>
      {tabConfig.map(routeConfig => (
        <TabNav.Screen
          key ={routeConfig.name}
          name={routeConfig.name}
          component={routeConfig.component}
        />
        ))}
    </TabNav.Navigator>
    );

    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="Login" component={LoginPage}></Stack.Screen>
                <Stack.Screen name="Register" component={RegisterPage}></Stack.Screen>
                <Stack.Screen name="MainTabs" component={TabNavigator}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
        // Comment...
        // <NavigationContainer>
            // <TabNav.Navigator screenOptions={screenOptions}>
            //     {tabConfig.map(routeConfig => (
            //         <TabNav.Screen
            //             key ={routeConfig.name}
            //             name={routeConfig.name}
            //             component={routeConfig.component}
            //         />
            //     ))}
            // </TabNav.Navigator>
        // </NavigationContainer>
        // <LoginPage></LoginPage>

    );
}