import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image, ScrollView } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { img185, img342 } from '../api/moviedb'

export default function Movielist({ data, heading,seeAll }: any) {

    const { width } = Dimensions.get("screen");
    const { height } = Dimensions.get("screen");
    const navigation = useNavigation<any>();

    return (

        <View style={styles.container}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <Text style={styles.heading}>{heading}</Text>
              {seeAll && 
              <TouchableOpacity><Text style={{ color: "#F2D398" }}>See all</Text></TouchableOpacity>
              
              }  
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}  >

                {
                    data?.map((item: any, idx: any) => {
                        return (
                        
                          <TouchableWithoutFeedback key={idx} style={{ flexDirection: "column", marginRight: 10, gap: 15 }} onPress={
                                ()=>{
                                    navigation.push("Movie",item)
                                }
                            }>
                                <View >
                                    <Image source={{uri:img185(item?.poster_path)}} style={{
                                        width: width * 0.33, height: height * 0.22, borderRadius: 10
                                    }} />
                                </View>
                                <Text style={{ color: "#F4FAFF", textTransform: "capitalize", fontSize: 16 }}>{item?.title?.length > 14 ? item.title.slice(0, 14) + "..." : item.title}</Text>
                            </TouchableWithoutFeedback>
                      
                        )
                    })
                }

            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 20
    },
    heading: {
        color: "#F4FAFF",
        fontSize: 18,

        marginBottom: 10
    }
})