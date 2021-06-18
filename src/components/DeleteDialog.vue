<template>
  <v-dialog v-model="dialogDelete" max-width="600px">
    <v-card>
      <v-card-title class="headline"
        >Вы уверены, что хотите удалить документ?</v-card-title
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDelete">Отменить</v-btn>
        <v-btn color="blue darken-1" text @click="deleteItemConfirm"
          >Подтвердить</v-btn
        >
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import DocumentDataService from "../services/DocumentDataService";
export default {
  data: () => ({
    dialogDelete: false,
  }),

  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    deleteItemConfirm() {
      this.documents.splice(this.editedIndex, 1);
      DocumentDataService.delete(this.deleteId, this.$store.state.token)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
          this.$store.dispatch("logout").then(() => {
            this.$router.push("/login");
          });
        });
      this.closeDelete();
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.document = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>
