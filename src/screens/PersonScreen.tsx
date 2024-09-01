import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Feather from 'react-native-vector-icons/Feather'
import { Image } from 'react-native'
import Movielist from '../components/Movielist'
import { useNavigation, useRoute } from '@react-navigation/native'
import Loading from '../components/Loading'
import { fetchPersonDetails, fetchPersonMoviesDetails, img185 } from '../api/moviedb'

export default function PersonScreen() {
    const top = [{
        title: "three of us",
        image: require('../assets/threeofus.jpeg')
    },
    {
        title: "everything everywhere all at once",
        image: require('../assets/eeato.jpeg')
    },
    {
        title: "rockstar",
        image: require('../assets/rockstar.jpeg')
    },
    ]

    const navigation=useNavigation()
    const { params: item }: any = useRoute()
    const [loading, setLoading] = useState(false)
    const [person,setPerson]=useState<any>(undefined);
    const [similar, setSimilar] = useState<any>(undefined)

    console.log("item per",item)
    const getDetails = async () => {
        try {
         
            const result = await fetchPersonDetails(item.id)
            result?.data && setPerson(result?.data)
         
            setLoading(false)
        } catch (error: any) {
            console.log(error.message)
        }
    }
    const getSimilar = async () => {
        try {
         
            const result = await fetchPersonMoviesDetails(item.id)
             result?.data?.cast && setSimilar(result?.data?.cast)
            console.log("person",result?.data?.cast)
            setLoading(false)
        } catch (error: any) {
            console.log(error.message)
        }
    }
  
    
    useEffect(()=>{
getDetails()
getSimilar()
    },[])

    return (
        <ScrollView style={{ backgroundColor: "#000", }}>
            <SafeAreaView style={{ zIndex: 100, width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
                <TouchableOpacity style={{ backgroundColor: "#FF7F11", borderRadius: 10, margin: 10 }} onPress={()=>navigation.goBack()}>
                    <Feather name='arrow-left' color={"#FFFFFC"} size={25} style={{ padding: 5 }}></Feather>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: "#FF7F11", borderRadius: 10, margin: 10 }}>
                    <Feather name='heart' color={"#FFFFFC"} size={25} style={{ padding: 5 }}></Feather>

                </TouchableOpacity>
            </SafeAreaView>
          {loading?<Loading/>:(<View>
            <View style={{ flexDirection: "row", justifyContent: "center", shadowColor: "gray", shadowRadius: 40, shadowOffset: { height: 2, width: 0 }, shadowOpacity: 0.7 }}>
                <View style={{ alignItems: "center", overflow: "hidden", borderRadius: 100, height: 200, width: 200, borderWidth: 2, borderColor: "gray" }}>
                    <Image source={{uri:img185(person?.profile_path)}} style={{ height: 200, width: 200 }}></Image>

                </View>
            </View>
            <View>
                <Text style={{ color: "#FFFFFC", textAlign: "center", fontWeight: "bold", marginTop: 10, fontSize: 25 }}>
                   {person?.name}
                </Text>
                <Text style={{ color: "#BBB", textAlign: "center", marginTop: 5, fontSize: 15 }}>{person?.place_of_birth}</Text>
            </View>
            <View style={{ backgroundColor: "#BEB7A4", padding: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", margin: 10, borderRadius: 50 }}>
                <View style={{ flexDirection: "column", alignItems: "center", borderRightWidth: 1, borderRightColor: "#FFFFFC", paddingRight: 10 }}>
                    <Text style={{ color: "#FFFFFC" }}>Gender</Text>
                    <Text style={{ color: "#FFFFFC" }}>{person?.gender==1?"Female":"Male"}</Text>
                </View>
                <View style={{ flexDirection: "column", justifyContent: "center", borderRightWidth: 1, borderRightColor: "#FFFFFC", paddingRight: 10 }}>
                    <Text style={{ color: "#FFFFFC" }}>Birthday</Text>
                    <Text style={{ color: "#FFFFFC" }}>{person?.birthday}</Text>
                </View>
                <View style={{ flexDirection: "column", alignItems: "center", borderRightWidth: 1, borderRightColor: "#FFFFFC", paddingRight: 10 }}>
                    <Text style={{ color: "#FFFFFC", textAlign: "center" }}>Known for</Text>
                    <Text style={{ color: "#FFFFFC" }}>{person?.known_for_department}</Text>
                </View>
                <View style={{ flexDirection: "column", alignItems: "center", borderRightWidth: 1, borderRightColor: "#FFFFFC", paddingRight: 10 }}>
                    <Text style={{ color: "#FFFFFC", textAlign: "center" }}>Popularity</Text>
                    <Text style={{ color: "#FFFFFC" }}>{person?.popularity}</Text>
                </View>

            </View>

            <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                <Text style={{ color: "#FFFFFC", marginBottom: 10, fontSize: 18 }}>Biography</Text>
                <Text style={{ color: "#BBB" }}>

{
    person?.biography
}
                    </Text>
            </View>
           {similar &&  <View style={{ marginVertical: 10 }}>
                <Movielist heading={"Related"} data={similar} />

            </View>}
          </View>)}
        </ScrollView>
    )
}

const styles = StyleSheet.create({})