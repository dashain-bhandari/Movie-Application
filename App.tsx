import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/components/Home';
import AppNavigation from './src/navigation/AppNavigation';

const Tab = createBottomTabNavigator();
export default function App() {
  return (
   <AppNavigation/>

  )
}

const styles = StyleSheet.create({})