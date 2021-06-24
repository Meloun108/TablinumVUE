<template>
  <div class="text-center">
    <v-bottom-sheet
      v-model="sheet"
      persistent
    >
      <template v-slot:activator="{ on, attrs }">
        <v-list-item-title
            v-bind="attrs"
            v-on="on"
        >{{ texxt }}</v-list-item-title>
      </template>
      <v-sheet
        class="text-center"
        height="200px"
      >
        <v-btn
          class="mt-6"
          text
          color="error"
          @click="sheet = !sheet"
        >
          Закрыть
        </v-btn>
        <div class="py-3">
          Данный функционал недоступен на текущий момент
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
  export default {
    props: ['texxt'],
    data: () => ({
      sheet: false,
    }),
  }
</script>