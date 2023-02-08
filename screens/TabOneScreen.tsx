import {ActivityIndicator, StyleSheet, FlatList, TextInput, Button} from 'react-native';

import { Text, View } from '../components/Themed';

import { gql, useQuery} from "@apollo/client";

import BookItem from "../components/BookItem";

const query = gql`
  query SearchBooks($q: String) {
    googleBooksSearch(q: $q, country: "US") {
      items {
        id
        volumeInfo {
          authors
          averageRating
          description
          imageLinks {
            thumbnail
          }
          title
          subtitle
          industryIdentifiers {
            identifier
            type
          }
        }
      }
    }
    openLibrarySearch(q: $q) {
      docs {
        author_name
        title
        cover_edition_key
        isbn
      }
    }
  }
`;





export default function TabOneScreen() {

  const { data, loading, error } = useQuery(query, {
    variables:{
      q: "React Native"
    }
  });

  console.log(data);
  console.log(loading);
  console.log(error);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput placeholder={"Search..."} style={styles.input}/>
        <Button title={'Search'}/>
      </View>
      {loading && <ActivityIndicator color={"#fff"} />}
      {error && (
          <>
            <Text>Error fetching Books</Text>
            <Text>{error.message}</Text>
          </>
      )}
      <FlatList
          data={data?.googleBooksSearch?.items || []}
          showsVerticalScrollIndicator={false}
          renderItem={({item})=> (
              <BookItem book={{
                image:item.volumeInfo.imageLinks?.thumbnail,
                title: item.volumeInfo.title,
                authors: item.volumeInfo.authors,
                isbn: item.volumeInfo.industryIdentifires,
              }} />
          )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  header:{
    flexDirection: "row",
    alignItems: "center",
  },
  input:{
    flex: 1,
    borderWidth: 1,
    borderColor: "gainsboro",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  }

});
