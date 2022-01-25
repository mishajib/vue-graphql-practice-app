<template>
  <div>
    <h1>Hello Vue Graphql APP</h1>
    <hr>
    <p>
      <input type="text" v-model="searchTerm" placeholder="Search from here"/>
    </p>
    <p v-if="loading">Loading....</p>
    <p v-else-if="error">Something went wrong, please try again!</p>
    <template v-else>
      <p v-for="book in books" :key="book.id">
        {{ book.title }}
      </p>
    </template>
  </div>
</template>

<script>
import {ref} from "vue";
import {useQuery, useResult} from '@vue/apollo-composable';
import ALL_BOOKS_QUERY from './graphql/allBooks.query.gql';


export default {
  name: 'App',
  setup() {
    const searchTerm = ref('');
    const {result, loading, error} = useQuery(
        ALL_BOOKS_QUERY,
        () => ({
          search: searchTerm.value
        }),
        () => ({
          debounce: 500,
          enabled: searchTerm.value.length > 2,
        })
    );

    const books = useResult(result, [], data => data.allBooks);


    return {books, searchTerm, loading, error};
  },
}
</script>

<style scoped>
h1, p {
  text-align: center;
}
</style>
