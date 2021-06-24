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
        Выберите одно или несколько подразделений для изменения/удаления
      </h2>

      <v-chip-group v-model="groups" column multiple>
        <v-chip
          v-for="i in where"
          :key="i.id"
          filter
          outlined
          :disabled="!isChipValid"
          @click="choiceGroup"
        >
          {{ i.dept }}
        </v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-text>
      <h2 class="text-h6 mb-2">Действия с подразделением</h2>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="grouptext"
            :rules="[(v) => !!v || 'Поле не заполнено!']"
            label="Подразделение"
            autocomplete="off"
            :disabled="!isNewGroupValid"
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
              @click="actionGroup"
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
              @click="saveGroup"
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
              @click="delGroup"
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
import GroupDataService from "../services/GroupDataService";
import { mdiShieldPlus, mdiPencil, mdiContentSave, mdiDelete } from "@mdi/js";

export default {
  data: () => ({
    disch: "",
    groups: [],
    where: [],
    fab: false,
    grouptext: "",
    isNewGroupValid: false,
    isChipValid: true,
    isFabValid: true,
    isFabSValid: false,
    isFabDValid: false,
    mdiShieldPlus,
    mdiPencil,
    mdiContentSave,
    mdiDelete,
  }),

  mounted() {
    this.retrieveGroup();
  },

  computed: {
    activeFab() {
      if (this.groups.length >= 2) {
        return { color: "red", icon: mdiDelete };
      }
      switch (this.groups.length) {
        case 0:
          return { color: "success", icon: mdiShieldPlus };
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
      this.groups = [];
      this.disch = "";
      this.isNewGroupValid = false;
      this.isChipValid = true;
      this.isFabValid = true;
      this.grouptext = "";
      this.isFabSValid = false;
      this.isFabDValid = false;
    },

    choiceGroup() {
      this.disch = "Сброс";
    },

    actionGroup() {
      this.isFabValid = false;
      if (this.groups.length === 0) {
        this.isNewGroupValid = true;
        this.isChipValid = false;
        this.isFabSValid = true;
        this.isFabDValid = false;
        this.disch = "Сброс";
      }
      if (this.groups.length === 1) {
        this.isNewGroupValid = true;
        this.isChipValid = false;
        this.isFabSValid = true;
        this.isFabDValid = true;
        this.grouptext = this.where[this.groups[0]].dept;
      }
      if (this.groups.length >= 2) {
        this.isFabSValid = false;
        this.isFabDValid = false;
        for (var i = 0; i < this.groups.length; i++) {
          GroupDataService.delete(
            this.where[this.groups[i]].id,
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
      this.retrieveGroup();
    },

    saveGroup() {
      var data = {
        dept: this.grouptext,
      };
      if (this.groups.length === 0) {
        GroupDataService.create(data, this.$store.state.token)
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
      if (this.groups.length === 1) {
        GroupDataService.update(
          this.where[this.groups[0]].id,
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

    delGroup() {
      GroupDataService.delete(
        this.where[this.groups[0]].id,
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

    retrieveGroup() {
      GroupDataService.getAll(this.$store.state.token)
        .then((response) => {
          this.where = response.data.map(this.getSelectGroup);
        })
        .catch((e) => {
          console.log(e);
          this.$store.dispatch("logout").then(() => {
            this.$router.push("/login");
          });
        });
    },

    getSelectGroup(group) {
      return {
        id: group.Id,
        dept: group.Dept,
      };
    },
  },
};
</script>