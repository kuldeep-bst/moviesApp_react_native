import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';

const API_KEY = '2afea52f7abecdf34e61aa2d60458181';

const MovieDetailScreen = ({ route }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
      setMovie(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#6200ee" style={styles.loading} />;

  if (!movie) return <Text>Movie details not found</Text>;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.overview}>{movie.overview}</Text>
      <Text style={styles.details}>Release Date: {movie.release_date}</Text>
      <Text style={styles.details}>Rating: {movie.vote_average}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  poster: {
    width: '100%',
    height: 450,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  overview: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    lineHeight: 24,
  },
  details: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
});

export default MovieDetailScreen;
