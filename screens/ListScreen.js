import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { getMovies, searchMovies } from '../services/tmdb';

const ListScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    const data = await getMovies(page);
    setMovies([...movies, ...data]);
    setLoading(false);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
    fetchMovies();
  };

  const handleSearch = async () => {
    if (search.trim()) {
      const data = await searchMovies(search);
      setMovies(data);
    } else {
      setMovies([]);
      fetchMovies();
    }
  };

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity
      style={styles.movieContainer}
      onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
        style={styles.moviePoster}
      />
      <Text style={styles.movieTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search for movies..."
        style={styles.searchInput}
      />
      <Button title="Search" onPress={handleSearch} color="#6200ee" />

      <FlatList
        data={movies}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderMovieItem}
        numColumns={2}
        contentContainerStyle={styles.movieList}
        columnWrapperStyle={styles.row}
        ListFooterComponent={() =>
          loading ? <ActivityIndicator size="large" color="#6200ee" /> : (
            <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
              <Text style={styles.loadMoreText}>Load More</Text>
            </TouchableOpacity>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  movieList: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  movieContainer: {
    flex: 1,
    margin: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  moviePoster: {
    width: 120,
    height: 180,
    borderRadius: 10,
  },
  movieTitle: {
    fontSize: 14,
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'center',
    color: '#333',
    paddingHorizontal: 4,
  },
  loadMoreButton: {
    padding: 10,
    backgroundColor: '#6200ee',
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 16,
  },
  loadMoreText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ListScreen;
