import axios from "axios";
import { API_KEY } from "../constants";

//endpoint
const trending = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
const upcoming = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`
const top = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`

const movieDetails =(id:any)=> `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
const creditsDetails =(id:any)=> `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
const similarDetails =(id:any)=> `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`


const personDetails =(id:any)=> `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}`
const personMovies =(id:any)=> `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${API_KEY}`
const search =()=> `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`



export const img500 = (path: any) => path ? `https://image.tmdb.org/t/p/w500${path}` : fallback
export const img342 = (path: any) => path ? `https://image.tmdb.org/t/p/w342${path}` : fallback
export const img185 = (path: any) => path ? `https://image.tmdb.org/t/p/w185${path}` : fallback
//api call

export const fallback = require("../assets/download.jpeg")
const apicall = async (endpoint: string, params: any) => {
    const options = {
        method: "GET",
        url: endpoint,
        params: params ? params : {}
    }
    try {
        const response:any = await axios.request(options)
    
        return response
    } catch (error: any) {
        console.log(error.message)
        return {}
    }
}

export const fetchTrending = () => {
    return apicall(trending, {});
}
export const fetchUpcoming = () => {
    return apicall(upcoming, {})
};
export const fetchTop = () => {
    return apicall(top, {});
}

export const fetchMovieDetails = (id: any) => {
    return apicall(movieDetails(id), {});
}
export const fetchCreditsDetails = (id: any) => {
    return apicall(creditsDetails(id), {});
}
export const fetchSimilarDetails = (id: any) => {
    return apicall(similarDetails(id), {});
}

export const fetchPersonDetails = (id: any) => {
    return apicall(personDetails(id), {});
}
export const fetchPersonMoviesDetails = (id: any) => {
    return apicall(personMovies(id), {});
}

export const fetchSearch = (id: any) => {
    return apicall(search(), id);
}