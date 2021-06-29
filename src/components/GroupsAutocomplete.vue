<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-combobox
          v-model="select"
          :items="items"
          :forstore="forstore"
          @change="saving=true"
          label="Подразделение"
          outlined
          dense
        ></v-combobox>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GroupDataService from "../services/GroupDataService";

export default {
  data() {
    return {
      saving: false,
      select: [],
      items: [],
    };
  },

  mounted() {
    this.retrieveGroups();
  },

  computed: {
    forstore() {
      return !this.saving ? localStorage.setItem("registrygroup", "") : localStorage.setItem("registrygroup", this.select);
    }
  },

  methods: {
    retrieveGroups() {
      GroupDataService.getAll(this.$store.state.token)
        .then((response) => {
          this.items = response.data.map(this.getGroup);
        })
        .catch((e) => {
          console.log(e);
          this.$store.dispatch("logout").then(() => {
            this.$router.push("/login");
          });
        });
    },

    getGroup(item) {
      return item.Dept;
    },
  },
};
</script>