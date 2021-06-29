<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-combobox
          v-model="select"
          :items="items"
          :forstore="forstore"
          @change="saving=true"
          label="Гриф секретности"
          outlined
          dense
        ></v-combobox>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      saving: false,
      select: [],
      items: [
        'Несекретно',
        'Для служебного пользования',
        'Секретно',
        'Совершенно секретно',
        'Лично'
      ],
    };
  },

  computed: {
    forstore() {
      return !this.saving ? localStorage.setItem("registryclassified", "") : localStorage.setItem("registryclassified", this.select);
    }
  }
};
</script>