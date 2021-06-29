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
        Реестры
        <v-icon>{{ mdiClipboardTextMultiple }}</v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        key="1"
        value="tab-1"
      >
        <v-card flat>
          <v-card-text><registry-report /></v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { mdiClipboardTextMultiple } from '@mdi/js'
import RegistryReport from './RegistryReport.vue'

  export default {
  components: { RegistryReport },
    data () {
      return {
        mdiClipboardTextMultiple,
        tab: null,
      }
    },
  }
</script>