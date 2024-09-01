import { createStackNavigator } from '@react-navigation/stack';
import Home from '../components/Home';
import { NavigationContainer } from '@react-navigation/native';
import MovieScreen from '../screens/MovieScreen';
import HomeScreen from '../screens/HomeScreen';
import PersonScreen from '../screens/PersonScreen';
import SearchScreen from '../screens/SearchScreen';

const Stack = createStackNavigator();


export default function AppNavigation() {
  return (
   <NavigationContainer>
     <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
      <Stack.Screen name="Movie" component={MovieScreen} options={{headerShown:false}} />
      <Stack.Screen name="Person" component={PersonScreen} options={{headerShown:false}} />
      <Stack.Screen name="Search" component={SearchScreen} options={{headerShown:false}} />
   
    </Stack.Navigator>
   </NavigationContainer>
  )
}

