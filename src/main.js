import { createApp,h, provide } from 'vue'
import App from './App.vue'
import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client/core";
import gpl from 'graphql-tag';
import { DefaultApolloClient } from "@vue/apollo-composable";

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
});

const cache = new InMemoryCache();

const apolloClient  = new ApolloClient({
    link: httpLink,
    cache,
});



/*apolloClient
    .query({
        query: ALL_BOOKS_QUERY,
    })
    .then(result => console.log(result));*/

const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient);
    },
    render: () => h(App),
});

app.mount('#app')
