import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/Loading'
import { fetchSearch, img342 } from '../api/moviedb'

export default function SearchScreen() {
    const navigation = useNavigation<any>();

    const results = [{
        title: "Zindagi na milegi dobara",
        image: require('../assets/znmd.jpeg')
    },
    {
        title: "Monkey man",
        image: require('../assets/monkey.jpeg')
    },
    {
        title: "ludo",
        image: require('../assets/ludo.jpg')
    },
    {
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

    const { width } = Dimensions.get("screen");
    const { height } = Dimensions.get("screen");
    const [loading, setLoading] = useState(false);
    const [datas, setDatas] = useState<any>(undefined);
    const getSearch = async (val: string) => {
        try {
            const result = await fetchSearch({ query: val });
            console.log(result?.data);
            setDatas(result?.data?.results)
        } catch (error: any) {
            console.log(error.message);
        }
    }


    return (
        <SafeAreaView style={{ backgroundColor: "#000", flex: 1 }}>
            {/* searchbar */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, paddingVertical: 10, borderColor: "#555", borderWidth: 1, borderRadius: 50, margin: 10 }}>

                <TextInput onChangeText={getSearch} placeholder='Search' placeholderTextColor={"white"} style={{ color: "white" }}></TextInput>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="x" color={"#CCC"} size={25}></Feather>
                </TouchableOpacity>
            </View>
            {
                loading ? <Loading /> : datas?.length > 0 ? (<ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 15 }}
                >
                    <Text style={{ color: "white" }}>Results</Text>
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        {
                            datas.map((item: any, index: any) => {
                                return <TouchableOpacity key={index} style={{ marginBottom: 20 }} onPress={()=>navigation.navigate("Movie",item)}>
                                    <View style={{ padding: 6 }}>
                                        <Image source={{uri:img342(item?.poster_path)}} style={{ height: height * 0.30, width: width * 0.42 }}></Image>
                                        <Text style={{ color: "white", marginTop: 10 }}>{item?.title?.length > 22 ? item?.title?.slice(0, 22) + "..." : item?.title}</Text>
                                    </View>
                                </TouchableOpacity>
                            })
                        }
                    </View>
                </ScrollView>) : (
                    <View style={{flex:1,justifyContent:"center",alignItems:"center",gap:10}}>
                          <Feather name="search" color={"#CCC"} size={100}></Feather>
                        <Text style={{ color: "white" }}>Want to search for something else?</Text>
                       
                    </View>
                )
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})