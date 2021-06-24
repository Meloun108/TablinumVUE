<template>
  <v-card class="mx-auto">
    <v-toolbar flat dark>
      <v-btn icon @click="dischargeItems">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>{{ disch }}</v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <h2 class="text-h6 mb-2">
        Выберите одного или нескольких инициаторов для изменения/удаления
      </h2>

      <v-chip-group v-model="initios" column multiple>
        <v-chip
          v-for="i in from"
          :key="i.id"
          filter
          outlined
          :disabled="!isChipValid"
          @click="choiceInitio"
        >
          {{ i.initio }}
        </v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-text>
      <h2 class="text-h6 mb-2">Действия с инициатором</h2>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="initiotext"
            :rules="[(v) => !!v || 'Поле не заполнено!']"
            label="Инициатор"
            autocomplete="off"
            :disabled="!isNewInitioValid"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-fab-transition>
            <v-btn
              :key="activeFab.icon"
              :color="activeFab.color"
              :disabled="!isFabValid"
              fab
              large
              dark
              bottom
              left
              @click="actionInitio"
            >
              <v-icon>{{ activeFab.icon }}</v-icon>
            </v-btn>
          </v-fab-transition>
          <v-fab-transition>
            <v-btn
              :key="activeFabS.icon"
              :color="activeFabS.color"
              v-if="isFabSValid"
              fab
              large
              dark
              bottom
              left
              @click="saveInitio"
            >
              <v-icon>{{ activeFabS.icon }}</v-icon>
            </v-btn>
          </v-fab-transition>
          <v-fab-transition>
            <v-btn
              :key="activeFabD.icon"
              :color="activeFabD.color"
              v-if="isFabDValid"
              fab
              large
              dark
              bottom
              left
              @click="delInitio"
            >
              <v-icon>{{ activeFabD.icon }}</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import InitioDataService from "../services/InitioDataService";
import { mdiAccountPlus, mdiPencil, mdiContentSave, mdiDelete } from "@mdi/js";

export default {
  data: () => ({
    disch: "",
    initios: [],
    from: [],
    fab: false,
    initiotext: "",
    isNewInitioValid: false,
    isChipValid: true,
    isFabValid: true,
    isFabSValid: false,
    isFabDValid: false,
    mdiAccountPlus,
    mdiPencil,
    mdiContentSave,
    mdiDelete,
  }),

  mounted() {
    this.retrieveInitio();
  },

  computed: {
    activeFab() {
      if (this.initios.length >= 2) {
        return { color: "red", icon: mdiDelete };
      }
      switch (this.initios.length) {
        case 0:
          return { color: "success", icon: mdiAccountPlus };
        case 1:
          return { color: "blue", icon: mdiPencil };
        default:
          return {};
      }
    },

    activeFabS() {
      return { color: "warning", icon: mdiContentSave };
    },

    activeFabD() {
      return { color: "red", icon: mdiDelete };
    },
  },

  methods: {
    dischargeItems() {
      this.initios = [];
      this.disch = "";
      this.isNewInitioValid = false;
      this.isChipValid = true;
      this.isFabValid = true;
      this.initiotext = "";
      this.isFabSValid = false;
      this.isFabDValid = false;
    },

    choiceInitio() {
      this.disch = "Сброс";
    },

    actionInitio() {
      this.isFabValid = false;
      if (this.initios.length === 0) {
        this.isNewInitioValid = true;
        this.isChipValid = false;
        this.isFabSValid = true;
        this.isFabDValid = false;
        this.disch = "Сброс";
      }
      if (this.initios.length === 1) {
        this.isNewInitioValid = true;
        this.isChipValid = false;
        this.isFabSValid = true;
        this.isFabDValid = true;
        this.initiotext = this.from[this.initios[0]].initio;
      }
      if (this.initios.length >= 2) {
        this.isFabSValid = false;
        this.isFabDValid = false;
        for (var i = 0; i < this.initios.length; i++) {
          InitioDataService.delete(
            this.from[this.initios[i]].id,
            this.$store.state.token
          )
            .then(() => {
              this.refreshList();
            })
            .catch((e) => {
              console.log(e);
              this.$store.dispatch("logout").then(() => {
                this.$router.push("/login");
              });
            });
        }
        this.dischargeItems();
      }
    },

    refreshList() {
      this.retrieveInitio();
    },

    saveInitio() {
      var data = {
        initio: this.initiotext,
      };
      if (this.initios.length === 0) {
        InitioDataService.create(data, this.$store.state.token)
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
            this.$store.dispatch("logout").then(() => {
              this.$router.push("/login");
            });
          });
      }
      if (this.initios.length === 1) {
        InitioDataService.update(
          this.from[this.initios[0]].id,
          data,
          this.$store.state.token
        )
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
            this.$store.dispatch("logout").then(() => {
              this.$router.push("/login");
            });
          });
      }
      this.dischargeItems();
    },

    delInitio() {
      InitioDataService.delete(
        this.from[this.initios[0]].id,
        this.$store.state.token
      )
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
          this.$store.dispatch("logout").then(() => {
            this.$router.push("/login");
          });
        });
      this.dischargeItems();
    },

    retrieveInitio() {
      InitioDataService.getAll(this.$store.state.token)
        .then((response) => {
          this.from = response.data.map(this.getSelectInitio);
        })
        .catch((e) => {
          console.log(e);
          this.$store.dispatch("logout").then(() => {
            this.$router.push("/login");
          });
        });
    },

    getSelectInitio(initio) {
      return {
        id: initio.Id,
        initio: initio.Initio,
      };
    },
  },
};
</script>