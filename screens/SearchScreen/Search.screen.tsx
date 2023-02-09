import {useState} from "react";
import {ActivityIndicator, FlatList, Button, TextInput} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import { View, Text,  } from '../../components/Themed';

//NOTE: The useLazyQuery can be triggered based on a user input (Button Press)
// where the useQuery is run directly

import { useLazyQuery} from "@apollo/client";

import BookItem from "../../components/BookItem";
import { searchQuery } from "./queries";
import { parseBooks } from "../../services/book.service";
import styles from './styles';

export default function SearchScreen() {

  const [search, setSearch] = useState('');
  const [provider, setProvider ] = useState<BookProvider>("googleBooksSearch")

  const [runQuery ,{ data, loading, error }] = useLazyQuery(searchQuery);


  return (
    <SafeAreaView  edges={['top']} style={styles.container}>
      <View style={styles.header}>

        <TextInput
            placeholder={"Search..."}
            style={styles.input}
            value={search}
            onChangeText={setSearch}
        />
        <Button
            title={'Search'}
            onPress={()=>runQuery({variables: {q: search}})}
        />
      </View>


      <View style={styles.tabs}>
        <Text style={
          provider === "googleBooksSearch" ? {fontWeight: 'bold', color: 'royalblue'} : {}
        }
        onPress={()=>setProvider("googleBooksSearch")}
        >Google Books</Text>
        <Text style={
          provider === "openLibrarySearch" ? {fontWeight: 'bold', color: 'royalblue'} : {}
        }
        onPress={()=> setProvider("openLibrarySearch")}
        >Open Library</Text>
      </View>


      {loading && <ActivityIndicator color={"#fff"} />}
      {error && (
          <>
            <Text>Error fetching Books</Text>
            <Text>{error.message}</Text>
          </>
      )}
      <FlatList
          data={
            (provider === "googleBooksSearch"
                ? data?.googleBooksSearch?.items
                : data?.openLibrarySearch?.docs) || []
          }
          showsVerticalScrollIndicator={false}
          renderItem={({item})=> (
              <BookItem book={parseBooks(item, provider)} />
          )}
      />
    </SafeAreaView>
  );
}

