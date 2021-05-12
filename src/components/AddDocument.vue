<template>
  <div style="margin-right: 100px; margin-left: 100px">
    <p class="headline">Добавление документа</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <div class="row">
          <div class="col-sm-6 col-md-4 col-12">
            <v-text-field
              v-model="document.number"
              :rules="[(v) => !!v || 'Поле не заполнено!']"
              label="Подписной №"
              required
            ></v-text-field>
            <v-menu
            v-model="menunumberdate"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                label="от"
                v-model="numberdateform"
                prepend-icon="mdi-calendar"
                v-bind="attrs"
                @blur="numberdate = parseFormDate(numberdateform)"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="numberdate"
              no-title
              locale="ru-ru"
              @input="menunumberdate = false"
            ></v-date-picker>
          </v-menu>
          </div>

          <div class="col-sm-6 col-md-4 col-12">
            <v-text-field
              v-model="document.numbercenter"
              :rules="[(v) => !!v || 'Поле не заполнено!']"
              label="вх. Центра"
              required
            ></v-text-field>
            <v-menu
            v-model="menunumbercenterdate"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                label="от"
                v-model="numbercenterdateform"
                prepend-icon="mdi-calendar"
                v-bind="attrs"
                @blur="numbercenterdate = parseFormDate(numbercenterdateform)"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="numbercenterdate"
              no-title
              locale="ru-ru"
              @input="menunumbercenterdate = false"
            ></v-date-picker>
          </v-menu>
          </div>

          <div class="col-sm-6 col-md-4 col-12">
            <v-text-field
              v-model="document.numberdepartment"
              :rules="[(v) => !!v || 'Поле не заполнено!']"
              label="вх. Управления"
              required
            ></v-text-field>
            <v-menu
            v-model="menunumberdepartmentdate"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                label="от"
                v-model="numberdepartmentdateform"
                prepend-icon="mdi-calendar"
                v-bind="attrs"
                @blur="
                  numberdepartmentdate = parseFormDate(numberdepartmentdateform)
                "
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="numberdepartmentdate"
              no-title
              locale="ru-ru"
              @input="menunumberdepartmentdate = false"
            ></v-date-picker>
          </v-menu>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-6 col-md-4 col-12">
            <v-text-field
              v-model="document.numbergroup"
              :rules="[(v) => !!v || 'Поле не заполнено!']"
              label="вх. подразд."
              required
            ></v-text-field>
            <v-menu
            v-model="menunumbergroupdate"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                label="от"
                v-model="numbergroupdateform"
                prepend-icon="mdi-calendar"
                v-bind="attrs"
                @blur="numbergroupdate = parseFormDate(numbergroupdateform)"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="numbergroupdate"
              no-title
              locale="ru-ru"
              @input="menunumbergroupdate = false"
            ></v-date-picker>
          </v-menu>
          </div>

          <div class="col-sm-6 col-md-4 col-12">
            <v-text-field
              v-model="document.from"
              :rules="[(v) => !!v || 'Поле не заполнено!']"
              label="Инициатор"
              required
            ></v-text-field>
          </div>

          <div class="col-sm-6 col-md-4 col-12">
            <v-text-field
              v-model="document.executor"
              :rules="[(v) => !!v || 'Поле не заполнено!']"
              label="Исполнитель"
              required
            ></v-text-field>
            <v-container>
            <v-row>
              <v-col cols="12" lg="6" style="display: contents">
                <v-menu
                  v-model="menuexecutiondate"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      label="до"
                      v-model="executiondateform"
                      prepend-icon="mdi-calendar"
                      v-bind="attrs"
                      @blur="executiondate = parseFormDate(executiondateform)"
                      v-on="on"
                    ></v-text-field>
                    <v-checkbox
                      v-model="document.status"
                      label="Исполнено"
                      color="info"
                    ></v-checkbox>
                  </template>
                  <v-date-picker
                    v-model="executiondate"
                    no-title
                    locale="ru-ru"
                    @input="menuexecutiondate = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-container>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-6 col-md-4 col-12">
            <v-select
              v-model="document.view"
              :hint="`Вид документа`"
              :items="itemsViewDoc"
              item-text="state"
              persistent-hint
              return-object
              single-line
            ></v-select>
          </div>

          <div class="col-sm-6 col-md-4 col-12">
            <v-select
              v-model="document.speed"
              :hint="`Приоритет документа`"
              :items="itemsSpeedDoc"
              item-text="state"
              persistent-hint
              return-object
              single-line
            ></v-select>
          </div>

          <div class="col-sm-6 col-md-4 col-12">
            <v-checkbox
              v-model="document.control"
              label="На контроле"
              color="primary"
            ></v-checkbox>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-6 col-md-12 col-12">
            <v-text-field
              v-model="document.comment"
              :rules="[(v) => !!v || 'Поле не заполнено!']"
              label="Комментарий"
              required
            ></v-text-field>
          </div>
        </div>
      </v-form>
      <v-divider class="my-5"></v-divider>
      <v-btn color="primary" class="mt-3" @click="saveDocument">Добавить</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title> Добавлено! </v-card-title>

        <v-card-subtitle>
          Нажмите для добавления нового документа
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newDocument">Добавить</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import DocumentDataService from "../services/DocumentDataService";

export default {
  name: "add-document",
  data() {
    return {
      itemsViewDoc: [
        { state: "Запрос" },
        { state: "Шифртелеграмма" },
        { state: "Прочее" },
      ],
      itemsSpeedDoc: [{ state: "Не срочный" }, { state: "Срочный" }],
      document: {
        id: null,
        number: "",
        numberdate: "",
        numbercenter: "",
        numbercenterdate: "",
        numberdepartment: "",
        numberdepartmentdate: "",
        numbergroup: "",
        numbergroupdate: "",
        from: "",
        executor: "",
        executiondate: "",
        status: false,
        view: { state: "Запрос" },
        speed: { state: "Не срочный" },
        control: false,
        comment: "",
        created: "",
        updated: "",
      },
      submitted: false,
      menunumberdate: false,
      menunumbercenterdate: false,
      menunumberdepartmentdate: false,
      menunumbergroupdate: false,
      menuexecutiondate: false,
      numberdate: "",
      numbercenterdate: "",
      numberdepartmentdate: "",
      numbergroupdate: "",
      executiondate: "",
      numberdateform: "",
      numbercenterdateform: "",
      numberdepartmentdateform: "",
      numbergroupdateform: "",
      executiondateform: "",
    };
  },
  watch: {
    numberdate() {
      this.numberdateform = this.formatDate(this.numberdate);
    },
    numbercenterdate() {
      this.numbercenterdateform = this.formatDate(this.numbercenterdate);
    },
    numberdepartmentdate() {
      this.numberdepartmentdateform = this.formatDate(
        this.numberdepartmentdate
      );
    },
    numbergroupdate() {
      this.numbergroupdateform = this.formatDate(this.numbergroupdate);
    },
    executiondate() {
      this.executiondateform = this.formatDate(this.executiondate);
    },
  },
  methods: {
    saveDocument() {
      var data = {
        number: this.document.number,
        numberdate: !this.numberdateform ? this.parseFormDate("0001.01.01") : this.parseDate(this.numberdateform),
        numbercenter: this.document.numbercenter,
        numbercenterdate: !this.numbercenterdateform ? this.parseFormDate("0001.01.01") : this.parseDate(this.numbercenterdateform),
        numberdepartment: this.document.numberdepartment,
        numberdepartmentdate: !this.numberdepartmentdateform ? this.parseFormDate("0001.01.01") : this.parseDate(this.numberdepartmentdateform),
        numbergroup: this.document.numbergroup,
        numbergroupdate: !this.numbergroupdateform ? this.parseFormDate("0001.01.01") : this.parseDate(this.numbergroupdateform),
        from: this.document.from,
        executor: this.document.executor,
        executiondate: !this.executiondateform ? this.parseFormDate("0001.01.01") : this.parseDate(this.executiondateform),
        status: this.document.status,
        view: this.document.view.state,
        speed: this.document.speed.state,
        control: this.document.control,
        comment: this.document.comment,
        created: new Date(),
        updated: new Date(),
      };

      DocumentDataService.create(data)
        .then((response) => {
          this.document.id = response.data.Id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}.${month}.${year}`;
    },

    parseDate(input) {
      let parts = input.split(".");
      if (parts.length === 3)
        return new Date(parts[2], parts[1] - 1, parts[0], 3, 0, 0);
      else return new Date(0, 0, 0, 0, 0, 0);
    },

    parseFormDate(date) {
      if (!date) return null;

      const [day, month, year] = date.split(".");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },

    newDocument() {
      this.submitted = false;
      this.document = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>