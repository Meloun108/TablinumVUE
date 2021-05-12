<template>
  <div v-if="currentDocument" style="margin-right: 100px; margin-left: 100px">
    <p class="headline">Редактирование документа</p>

    <v-form ref="form" lazy-validation>
      <div class="row">
        <div class="col-sm-6 col-md-4 col-12">
          <v-text-field
            v-model="currentDocument.number"
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
            v-model="currentDocument.numbercenter"
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
            v-model="currentDocument.numberdepartment"
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
            v-model="currentDocument.numbergroup"
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
            v-model="currentDocument.from"
            :rules="[(v) => !!v || 'Поле не заполнено!']"
            label="Инициатор"
            required
          ></v-text-field>
        </div>

        <div class="col-sm-6 col-md-4 col-12">
          <v-text-field
            v-model="currentDocument.executor"
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
                      v-model="currentDocument.status"
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
            v-model="currentDocument.view"
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
            v-model="currentDocument.speed"
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
            v-model="currentDocument.control"
            label="На контроле"
            color="primary"
          ></v-checkbox>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-6 col-md-12 col-12">
          <v-text-field
            v-model="currentDocument.comment"
            :rules="[(v) => !!v || 'Поле не заполнено!']"
            label="Комментарий"
            required
          ></v-text-field>
        </div>
      </div>

      <v-divider class="my-5"></v-divider>

      <v-btn
        v-if="currentDocument.status"
        @click="updatePublished()"
        color="primary"
        small
        class="mr-2"
      >
        UnPublish
      </v-btn>

      <v-btn
        v-else
        @click="updatePublished()"
        color="primary"
        small
        class="mr-2"
      >
        Publish
      </v-btn>

      <v-btn color="error" small class="mr-2" @click="deleteDocument">
        Удалить
      </v-btn>

      <v-btn color="success" small @click="updateDocument"> Обновить </v-btn>
    </v-form>

    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <p>Please click on a Tutorial...</p>
  </div>
</template>

<script>
import DocumentDataService from "../services/DocumentDataService";

export default {
  name: "document",
  data() {
    return {
      itemsViewDoc: [
        { state: "Запрос" },
        { state: "Шифртелеграмма" },
        { state: "Прочее" },
      ],
      itemsSpeedDoc: [{ state: "Не срочный" }, { state: "Срочный" }],
      currentDocument: null,
      message: "",
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
    getDocument(id) {
      DocumentDataService.get(id)
        .then((response) => {
          this.currentDocument = response.data;
          this.numbercenterdate = this.parseFormDate(
            this.parseIncomingDate(
              this.currentDocument.NumberCenterDate.substring(
                0,
                this.currentDocument.NumberCenterDate.indexOf("T")
              )
            )
          );
          this.numberdepartmentdate = this.parseFormDate(
            this.parseIncomingDate(
              this.currentDocument.NumberDepartmentDate.substring(
                0,
                this.currentDocument.NumberDepartmentDate.indexOf("T")
              )
            )
          );
          this.numbergroupdate = this.parseFormDate(
            this.parseIncomingDate(
              this.currentDocument.NumberGroupDate.substring(
                0,
                this.currentDocument.NumberGroupDate.indexOf("T")
              )
            )
          );
          this.executiondate = this.parseFormDate(
            this.parseIncomingDate(
              this.currentDocument.ExecutionDate.substring(
                0,
                this.currentDocument.ExecutionDate.indexOf("T")
              )
            )
          );
          this.currentDocument.number = this.currentDocument.Number;
          (this.numberdateform = this.parseIncomingDate(
            this.currentDocument.NumberDate.substring(
              0,
              this.currentDocument.NumberDate.indexOf("T")
            )
          )),
            (this.currentDocument.numbercenter = this.currentDocument.NumberCenter),
            (this.numbercenterdateform = this.parseIncomingDate(
              this.currentDocument.NumberCenterDate.substring(
                0,
                this.currentDocument.NumberCenterDate.indexOf("T")
              )
            )),
            (this.currentDocument.numberdepartment = this.currentDocument.NumberDepartment),
            (this.numberdepartmentdateform = this.parseIncomingDate(
              this.currentDocument.NumberDepartmentDate.substring(
                0,
                this.currentDocument.NumberDepartmentDate.indexOf("T")
              )
            )),
            (this.currentDocument.numbergroup = this.currentDocument.NumberGroup),
            (this.numbergroupdateform = this.parseIncomingDate(
              this.currentDocument.NumberGroupDate.substring(
                0,
                this.currentDocument.NumberGroupDate.indexOf("T")
              )
            )),
            (this.currentDocument.from = this.currentDocument.From),
            (this.currentDocument.executor = this.currentDocument.Executor),
            (this.executiondateform = this.parseIncomingDate(
              this.currentDocument.ExecutionDate.substring(
                0,
                this.currentDocument.ExecutionDate.indexOf("T")
              )
            )),
            (this.currentDocument.status = this.currentDocument.Status),
            (this.currentDocument.view = this.currentDocument.View),
            (this.currentDocument.speed = this.currentDocument.Speed),
            (this.currentDocument.control = this.currentDocument.Control),
            (this.currentDocument.comment = this.currentDocument.Comment),
            console.log(response.data);
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
    parseFormDate(date) {
      if (!date) return null;

      const [day, month, year] = date.split(".");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },

    parseIncomingDate(input) {
      let parts = input.split("-");
      if (parts.length === 3) return parts[2] + "." + parts[1] + "." + parts[0];
      else return "00.00.0000";
    },

    parseOutgoingDate(input) {
      let parts = input.split(".");
      if (parts.length === 3)
        return new Date(parts[2], parts[1] - 1, parts[0], 3, 0, 0);
      else return new Date(0, 0, 0, 0, 0, 0);
    },

    updatePublished() {
      var data = {
        id: this.currentDocument.Id,
        number: this.currentDocument.number,
        numberdate: this.parseOutgoingDate(this.numberdateform),
        numbercenter: this.currentDocument.numbercenter,
        numbercenterdate: this.parseOutgoingDate(this.numbercenterdateform),
        numberdepartment: this.currentDocument.numberdepartment,
        numberdepartmentdate: this.parseOutgoingDate(
          this.numberdepartmentdateform
        ),
        numbergroup: this.currentDocument.numbergroup,
        numbergroupdate: this.parseOutgoingDate(this.numbergroupdateform),
        from: this.currentDocument.from,
        executor: this.currentDocument.executor,
        executiondate: this.parseOutgoingDate(this.executiondateform),
        status: this.currentDocument.status,
        view: !this.currentDocument.view.state
          ? this.currentDocument.View
          : this.currentDocument.view.state,
        speed: !this.currentDocument.speed.state
          ? this.currentDocument.Speed
          : this.currentDocument.speed.state,
        control: this.currentDocument.control,
        comment: this.currentDocument.comment,
        created: this.currentDocument.Created,
        updated: new Date(),
      };
      console.log(data);
      DocumentDataService.update(this.currentDocument.Id, data)
        .then((response) => {
          //this.currentDocument.status = status;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateDocument() {
      DocumentDataService.update(this.currentDocument.id, this.currentDocument)
        .then((response) => {
          console.log(response.data);
          this.message = "Обновлено!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteDocument() {
      DocumentDataService.delete(this.currentDocument.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "documents" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getDocument(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>