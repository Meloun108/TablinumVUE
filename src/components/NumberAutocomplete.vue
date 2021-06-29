<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-combobox
          v-model="select"
          :items="items"
          :forstore="forstore"
          @change="saving=true"
          label="Подписной №"
          multiple
          outlined
          dense
        ></v-combobox>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DocumentDataService from "../services/DocumentDataService";
import UserDataService from "../services/UserDataService";

export default {
  data() {
    return {
      saving: false,
      select: [],
      items: [],
    };
  },

  mounted() {
    this.retrieveDocuments();
  },

  computed: {
    forstore() {
      return !this.saving ? localStorage.setItem("registrynumber", "") : localStorage.setItem("registrynumber", this.select);
    }
  },

  methods: {
    retrieveDocuments() {
      UserDataService.findByUser(localStorage.user, this.$store.state.token)
        .then((response) => {
          let group = response.data.Group;
          DocumentDataService.findByUserGroup(group, this.$store.state.token)
            .then((response) => {
              this.items = response.data.map(this.getNumber);
            })
            .catch((e) => {
              console.log(e);
              this.$store.dispatch("logout").then(() => {
                this.$router.push("/login");
              });
            });
        })
        .catch((e) => {
          console.log(e);
          this.$store.dispatch("logout").then(() => {
            this.$router.push("/login");
          });
        });
    },

    getNumber(item) {
      return item.Number + " (" + item.NumberDepartment + ")";
    },
  },
};
</script>