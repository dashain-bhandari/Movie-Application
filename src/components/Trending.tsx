import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { img500 } from '../api/moviedb';
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

export default function Trending({ data }: any) {
    const scrollX = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollX.value = event.contentOffset.x
    })


    console.log(data)
    return (
        <View style={styles.colContainer}>
            <Text style={styles.heading}>Trending</Text>
            <Animated.FlatList horizontal={true}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                data={data}
                onScroll={scrollHandler}
                keyExtractor={(item, index) => String(index)}
                renderItem={({ item, index }) => <MovieCard key={index} item={item} index={index} length={data?.length} scrollX={scrollX} ></MovieCard>}></Animated.FlatList>
        </View>
    )
}


const styles = StyleSheet.create({
    heading: {
        color: "white",
        fontSize: 20,
        paddingHorizontal: 10,
        marginBottom: 10
    },
    colContainer: {

        flexDirection: "column",
        gap: 10,
        marginBottom: 20
    },
    rowContainer: {

        alignItems: "center",
        justifyContent: "center",
        width: width,
        gap: 20
    },
    movieTitle: {
        color: "white"
    },
    image: {
        width: width * 0.6, // Adjust size as needed
        height: height * 0.4, // Adjust size as needed
        borderRadius: 8
    },
})
const MovieCard = ({ item, index, length, scrollX }: any) => {

    const restyle = useAnimatedStyle(() => {
        console.log(scrollX.value)
        const translate = interpolate(scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-(width * 0.25), 0, (width * 0.25)]
        )
        const scale = interpolate(scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.8, 1, 0.8]
        )
        return {
            transform: [
                { translateX: translate }, {
                    scaleY: scale
                }
            ],

        }
    })
    const navigation = useNavigation<any>();
    console.log("item", item.poster_path)

    return (<>
        <TouchableWithoutFeedback onPress={() => { navigation.navigate("Movie", item) }}>
            <Animated.View style={[styles.rowContainer,
                restyle

            ]}>
                <Image source={{ uri: img500(item.poster_path) || "" }} style={styles.image}></Image>
            </Animated.View>
        </TouchableWithoutFeedback>
    </>
    )
}