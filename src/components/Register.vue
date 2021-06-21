<template>
  <div>
    <!-- Регистрировать пользователя с ObjectId группы и роли -->
    <form class="login" @submit.prevent="register">
      <h1 style="text-align: center; margin-top: 100px">
        Регистрация пользователя
      </h1>
      <v-text-field
        v-model="login"
        :rules="[(v) => !!v || 'Поле не заполнено!']"
        label="Логин"
        style="
          max-width: 250px;
          margin-left: auto !important;
          margin-right: auto !important;
        "
        autocomplete="off"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="[(v) => !!v || 'Поле не заполнено!', rules.required, rules.min]"
        label="Пароль"
        style="
          max-width: 250px;
          margin-left: auto !important;
          margin-right: auto !important;
        "
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show1 ? 'text' : 'password'"
        counter
        @click:append="show1 = !show1"
        autocomplete="off"
        required
      ></v-text-field>
      <v-text-field
        v-model="confirmPassword"
        :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
        label="Еще раз пароль"
        style="
          max-width: 250px;
          margin-left: auto !important;
          margin-right: auto !important;
        "
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show2 ? 'text' : 'password'"
        counter
        @click:append="show2 = !show2"
        autocomplete="off"
        required
      ></v-text-field>
      <v-text-field
        v-model="name"
        :rules="[(v) => !!v || 'Поле не заполнено!']"
        label="ФИО"
        style="
          max-width: 250px;
          margin-left: auto !important;
          margin-right: auto !important;
        "
        autocomplete="off"
        required
      ></v-text-field>
      <v-select
        v-model="group"
        :hint="`Группа`"
        :items="groups"
        item-text="dept"
        item-value="id"
        persistent-hint
        return-object
        single-line
        required
        style="
          max-width: 250px;
          margin-left: auto !important;
          margin-right: auto !important;
        "
      ></v-select>
      <v-select
        v-model="role"
        :hint="`Роль`"
        :items="roles"
        item-text="rolename"
        item-value="id"
        persistent-hint
        return-object
        single-line
        required
        style="
          max-width: 250px;
          margin-left: auto !important;
          margin-right: auto !important;
        "
      ></v-select>
      <v-card-actions>
        <v-btn
          color="success"
          type="submit"
          style="margin-left: auto !important; margin-right: auto !important"
          >Зарегистрировать</v-btn
        >
      </v-card-actions>
    </form>
  </div>
</template>

<script>
import GroupDataService from "../services/GroupDataService"
import RoleDataService from "../services/RoleDataService"
export default {
  data() {
    return {
      group: {
        id: null,
        dept: "",
      },
      role: {
        id: null,
        rolename: "",
      },
      login: "",
      name: "",
      groups: [],
      roles: [],
      password: "",
      confirmPassword: "",
      show1: false,
      show2: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) =>
          v.length >= 5 || "Пароль должен содержать не менее 5 символов!",
      },
      confirmPasswordRules: [(v) => !!v || "Поле не заполнено!"],
    };
  },

  mounted() {
    this.retrieveData();
  },

  methods: {
    register: function () {
      if (
        this.login === "" ||
        this.password === "" ||
        this.password !== this.confirmPassword ||
        this.group === "" ||
        this.role === "" ||
        this.name === "" ||
        this.password.length < 5
      ) {
        this.$toastr.e("", "Не заполнены обязательные поля!");
      } else {
        let data = {
          login: this.login,
          name: this.name,
          group: this.group.id,
          role: this.role.id,
          password: this.password,
        };
        console.log(data);
        this.$store
          .dispatch("register", data)
          .then(() => this.$router.push("/"))
          .catch((err) => console.log(err));
      }
    },

    retrieveData() {
      GroupDataService.getAll(this.$store.state.token)
        .then((response) => {
          console.log(response);
          this.groups = response.data.map(this.getSelectGroup);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
        RoleDataService.getAll(this.$store.state.token)
        .then((response) => {
          console.log(response);
          this.roles = response.data.map(this.getSelectRole);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getSelectGroup(group) {
      console.log(group);
      return {
        id: group.Id,
        dept: group.Dept,
      }
    }, 

    getSelectRole(role) {
      console.log(role);
      return {
        id: role.Id,
        rolename: role.RoleName,
      }
    },
  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.password === this.confirmPassword || "Пароли не совпадают!";
    },
  },
};
</script>