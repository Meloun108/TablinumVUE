<template>
  <v-app>
    <Toolbar/>
    <v-main>
      <v-img 
        src="@/assets/logo_transparent.png"
        max-height="150px" 
        max-width="400px"
        class="mx-auto"/>
      <router-view />
      <!--<documents-table/>-->
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Toolbar from './components/Toolbar.vue';
//import DocumentsTable from './components/DocumentsTable.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',

  components: {
    Toolbar,
    //DocumentsTable,
    Footer
  },

  data: () => ({
    //
  }),

  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function () {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("logout")
        }
        throw err;
      });
    });
  }
};
</script>
