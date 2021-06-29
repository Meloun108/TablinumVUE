<template>
  <v-card>
    <v-tabs
      v-model="tab"
      background-color="deep-grey accent-4"
      centered
      dark
      icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#tab-1">
        Инициаторы
        <v-icon>{{ mdiAccountTie }}</v-icon>
      </v-tab>

      <v-tab href="#tab-2">
        Подразделения
        <v-icon>{{ mdiShieldHome }}</v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        key="1"
        value="tab-1"
      >
        <v-card flat>
          <v-card-text><initio-settings /></v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item
        key="2"
        value="tab-2"
      >
        <v-card flat>
          <v-card-text><group-settings /></v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { mdiAccountTie, mdiShieldHome } from '@mdi/js'
import InitioSettings from './InitioSettings.vue'
import GroupSettings from './GroupSettings.vue'

  export default {
  components: { InitioSettings, GroupSettings },
    data () {
      return {
        mdiAccountTie, mdiShieldHome,
        tab: null,
      }
    },
  }
</script>