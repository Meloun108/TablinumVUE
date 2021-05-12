<template>
  <div>
    <v-toolbar
      dark
      color="blue-grey"
      v-if="isLoggedIn"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title @click="$router.push('/documents')" style="font-family: 'tablinum'; font-weight: normal; font-style: normal; font-size: 24px;">Tablinum</v-toolbar-title>

      <!--<v-btn to="/documents" text>
        Корреспонденция
      </v-btn>-->

      <v-spacer></v-spacer>

      <!--<v-btn to="/add" icon>
        <v-icon>mdi-email-plus-outline</v-icon>
      </v-btn>-->

      <v-btn icon @click="logout">
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      temporary
    >
      <v-toolbar>
        <v-img 
          src="@/assets/logo.png"
          max-height="50px" 
          max-width="50px"/>
          <v-toolbar-title style="text-align: center; font-family: 'tablinum'; font-weight: normal; font-style: normal; font-size: 24px;">Tablinum</v-toolbar-title>
      </v-toolbar>
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="blue-grey--text text--accent-4"
        >
          <v-list-item>
            <v-btn icon>
                <v-icon>mdi-email-newsletter</v-icon>
            </v-btn>
            <v-list-item-title @click="$router.push('/documents')">Письма</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-btn icon>
                <v-icon>mdi-chart-bar</v-icon>
            </v-btn>
            <v-list-item-title>Отчеты</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-btn icon>
                <v-icon>mdi-comment-text</v-icon>
            </v-btn>
            <v-list-item-title>Чат</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-btn icon>
                <v-icon>mdi-android-studio</v-icon>
            </v-btn>
            <v-list-item-title>Настройки</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
  export default {
    data: () => ({
      drawer: false,
      group: null,
    }),

    watch: {
      group () {
        this.drawer = false
      },
    },
    computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn }
    },
    methods: {
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
      }
    },
  }
</script>