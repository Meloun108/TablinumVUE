<template>
  <div>
    <form class="login" @submit.prevent="login">
      <h1 style="text-align: center; margin-top: 100px">Вход в систему</h1>
      <v-text-field
        v-model="username"
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
        :append-icon="show1 ? mdiEye : mdiEyeOff"
        :type="show1 ? 'text' : 'password'"
        counter
        @click:append="show1 = !show1"
        autocomplete="off"
        required
      ></v-text-field>
      <v-card-actions>
        <v-btn
          color="success"
          type="submit"
          style="margin-left: auto !important; margin-right: auto !important"
          >Войти</v-btn
        >
      </v-card-actions>
    </form>
  </div>
</template>

<script>
import { mdiEye, mdiEyeOff } from '@mdi/js'

export default {
  data() {
    return {
      mdiEye,
      mdiEyeOff,
      username: "",
      password: "",
      show1: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) =>
          v.length >= 5 || "Пароль должен содержать не менее 5 символов!",
      },
    };
  },
  methods: {
    login: function () {
      let login = this.username;
      let password = this.password;
      this.$store
        .dispatch("login", { login, password })
        .then(() => this.$router.push("/"))
        .catch(
          (err) => (
            console.log(err),
            this.$toastr.e(err, "Неправильно введен логин или пароль")
          )
        );
    },
  },
};
</script>