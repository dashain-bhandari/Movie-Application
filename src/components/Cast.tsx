import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Movielist from './Movielist'
import { img185 } from '../api/moviedb'

export default function Cast({ cast }: any) {

    const navigation = useNavigation<any>()
  
    const handleNav = (item: any) => {
        navigation.navigate("Person", item)
    }
   
    return (
        <View style={{ marginBottom: 20, marginHorizontal: 20 }}>
            <Text style={{ color: "white", marginBottom: 10 }}>Cast</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                {
                    cast && cast.map((item: any, index: any) => {

                        return (
                            <TouchableOpacity key={index} style={{ paddingRight: 15 }} onPress={() => handleNav(item)}>

                                <View style={{ width: 100, height: 100, overflow: 'hidden', borderRadius: 50, borderColor: "gray", borderWidth: 1, marginBottom: 10 }}>
                                    <Image source={{uri:img185(item?.profile_path)}} style={{ width: 100, height: 100 }} />

                                </View>
                                <Text style={{ color: "#FFFFFC", marginBottom: 5 }}>{item?.character?.length > 10 ? item?.character?.slice(0, 10) + "..." : item?.character}</Text>
                                <Text style={{ color: "#FFFFFC" }}>{item?.name?.length > 10 ? item?.name?.slice(0, 10) + "..." : item?.name}</Text>
                            </TouchableOpacity>
                        )
                    }
                    )
                }
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({})