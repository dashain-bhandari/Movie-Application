import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'
import Cast from '../components/Cast';
import Movielist from '../components/Movielist';
import Loading from '../components/Loading';
import { fetchCreditsDetails, fetchMovieDetails, fetchSimilarDetails, img185, img342, img500 } from '../api/moviedb';
import { GestureStateManager } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gestureStateManager';


const { width } = Dimensions.get("screen");
const { height } = Dimensions.get("screen")



export default function MovieScreen() {
    const upcoming = [{
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
    ]
    const { params: item }: any = useRoute()

    const [cast, setCast] = useState([1, 2, 3, 4, 5])
    const navigation = useNavigation()

    const [loading, setLoading] = useState(true)
    const [movieDetails, setMovieDetails] = useState<any>(undefined)
    const [creditsDetails, setCreditsDetails] = useState<any>(undefined)
    const [similar, setSimilar] = useState<any>(undefined)

    const getDetails = async () => {
        try {
         
            const result = await fetchMovieDetails(item.id)
            result?.data && setMovieDetails(result?.data)
            setLoading(false)
        } catch (error: any) {
            console.log(error.message)
        }
    }
    
    const getCastDetails = async () => {
        try {

            const result = await fetchCreditsDetails(item.id)
          
            result?.data?.cast && setCreditsDetails(result?.data?.cast)
            setLoading(false)
        } catch (error: any) {
            console.log(error.message)
        }
    }

    const getSimilar = async () => {
        try {
            console.log("id", item.id)
            const result = await fetchSimilarDetails(item.id)
            console.log("result",result.data)
            result?.data?.results && setSimilar(result?.data?.results)
            setLoading(false)
        } catch (error: any) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getDetails();
        getCastDetails();
        getSimilar();
    }, [])

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#000" }}>

            <SafeAreaView style={{ position: "absolute", zIndex: 100, width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
                <TouchableOpacity style={{ backgroundColor: "#FF7F11", borderRadius: 10, margin: 10 }} onPress={() => navigation.goBack()}>
                    <Feather name='arrow-left' color={"white"} size={25} style={{ padding: 5 }}></Feather>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: "#FF7F11", borderRadius: 10, margin: 10 }}>
                    <Feather name='heart' color={"white"} size={25} style={{ padding: 5 }}></Feather>

                </TouchableOpacity>
            </SafeAreaView>


            {
                loading ? <Loading /> :
                    movieDetails && ((<View>

                        <View style={{ flex: 1 }}>
                            <Image
                                source={{ uri: img500(item?.backdrop_path) }}
                                style={styles.image}
                            />
                            <LinearGradient
                                colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.9)']}
                                style={styles.grad}
                            />
                        </View>


                        <View style={{ marginTop: -(height * 0.09), flexDirection: "column", alignItems: "center", gap: 4 }}>
                            <Text style={{ color: "white", fontSize: 25, fontWeight: "bold" }}>{movieDetails?.title}</Text>
                            <Text style={{ color: "#BEB7A4", fontSize: 18, fontWeight: "medium" }}>
                                {movieDetails.status} . {movieDetails.release_date} . {movieDetails?.runtime} min
                            </Text>

                            <View style={{ flexDirection: "row" }}>
                                {movieDetails?.genres?.map((item: any, idx: any) => {
                                    return (
                                        <Text style={{ color: "#BEB7A4", fontSize: 18, fontWeight: "medium" }} key={idx}>{item?.name} .</Text>
                                    )


                                })}
                            </View>

                        </View>
                        <View style={{ margin: 20 }}>
                            <Text style={{ color: "#BBB", }}>
                                {movieDetails?.overview}
                            </Text>
                        </View>
                        </View>
                    ))
                }
                       {
                        creditsDetails &&  <Cast cast={creditsDetails} />
                       }
                      {
                        similar &&   <View style={{ marginBottom: 10 }}>
                        <Movielist data={similar} heading="Similar movies" />

                    </View>
                      }
                
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    image: {
        width: width,
        height: height * 0.55, // Adjust height as needed
        resizeMode: "cover",
        // Ensure the image covers the area
    },
    grad: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: 500,

        zIndex: 1
    },
});