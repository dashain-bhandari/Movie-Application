import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Loading() {
  return (
    <View style={{flex:1,justifyContent:"center"}}>
   <ActivityIndicator size="large" color="#FF7F11" />
    </View>
  )
}

const styles = StyleSheet.create({})