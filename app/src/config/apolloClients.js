import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import * as SecureStore from 'expo-secure-store';

const httpLink = createHttpLink({
    uri: `http://iptwgc01.iptw-portofolio.tech`,
})

const authLink = setContext(async (_, {headers}) => {
    
    const token  = await SecureStore.getItemAsync(`access_token`);
    
    console.log(token);
    return {
        headers: {
            authorization: token ? token : ""
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

export default client