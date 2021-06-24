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
        <v-icon>{{ mdiExport }}</v-icon>
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
                <v-icon>{{ mdiEmailNewsletter }}</v-icon>
            </v-btn>
            <v-list-item-title @click="$router.push('/documents')">Письма</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-btn icon>
                <v-icon>{{ mdiChartBar }}</v-icon>
            </v-btn>
            <v-list-item-title @click="$router.push('/reports')">Отчеты</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-btn icon>
                <v-icon>{{ mdiCommentText }}</v-icon>
            </v-btn>
            <tech-work-info texxt="Чат" />
          </v-list-item>

          <v-list-item>
            <v-btn icon>
                <v-icon>{{ mdiAndroidStudio }}</v-icon>
            </v-btn>
            <v-list-item-title @click="$router.push('/settings')">Настройки</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mdiExport, mdiEmailNewsletter, mdiChartBar, mdiCommentText, mdiAndroidStudio } from '@mdi/js'
import TechWorkInfo from './TechWorkInfo.vue'

  export default {
    components: { TechWorkInfo },
    data: () => ({
      mdiExport, mdiEmailNewsletter, mdiChartBar, mdiCommentText, mdiAndroidStudio,
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