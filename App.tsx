import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { ENV } from './env.js';

const client = new ApolloClient({
  uri: " https://buurgaabo.stepzen.net/api/calico-uakari/__graphql",
  headers:{
    Authorization: `Apikey ${ENV.APIKey}`
  },
  cache: new InMemoryCache(),
})



export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <Navigation colorScheme={colorScheme} />
        </ApolloProvider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}


// TODO: YT Vid Progress: 40min
