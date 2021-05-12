<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" md="8">
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        single-line
        hide-details
        label="Поиск"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-data-table
          :headers="headers"
          :items="documents"
          :items-per-page="15"
          :search="search"
          class="elevation-1"
          :loading="loadProgress"
          loading-text="Загрузка... Ожидайте"
          :sort-by="['all']"
          multi-sort
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Корреспонденция</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="1500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-email-plus-outline</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Новый документ</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="document.number"
                            :rules="[(v) => !!v || 'Поле не заполнено!']"
                            v-if="dialog"
                            label="Подписной № *"
                            autofocus
                            required
                          ></v-text-field>
                          <v-menu
                            v-model="menunewnumberdate"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                label="от"
                                v-model="newnumberdateform"
                                prepend-icon="mdi-calendar"
                                v-bind="attrs"
                                @blur="
                                  numberdate = parseFormDate(newnumberdateform)
                                "
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="numberdate"
                              no-title
                              locale="ru-ru"
                              @input="menunewnumberdate = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="document.numbercenter"
                            :rules="[(v) => !!v || 'Поле не заполнено!']"
                            label="вх. Центра"
                            required
                          ></v-text-field>
                          <v-menu
                            v-model="menunewnumbercenterdate"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                label="от"
                                v-model="newnumbercenterdateform"
                                prepend-icon="mdi-calendar"
                                v-bind="attrs"
                                @blur="
                                  numbercenterdate = parseFormDate(
                                    newnumbercenterdateform
                                  )
                                "
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="numbercenterdate"
                              no-title
                              locale="ru-ru"
                              @input="menunewnumbercenterdate = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="document.numberdepartment"
                            :rules="[(v) => !!v || 'Поле не заполнено!']"
                            label="вх. Управления"
                            required
                          ></v-text-field>
                          <v-menu
                            v-model="menunewnumberdepartmentdate"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                label="от"
                                v-model="newnumberdepartmentdateform"
                                prepend-icon="mdi-calendar"
                                v-bind="attrs"
                                @blur="
                                  numberdepartmentdate = parseFormDate(
                                    newnumberdepartmentdateform
                                  )
                                "
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="numberdepartmentdate"
                              no-title
                              locale="ru-ru"
                              @input="menunewnumberdepartmentdate = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="document.numbergroup"
                            :rules="[(v) => !!v || 'Поле не заполнено!']"
                            label="вх. подразд."
                            required
                          ></v-text-field>
                          <v-menu
                            v-model="menunewnumbergroupdate"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                label="от"
                                v-model="newnumbergroupdateform"
                                prepend-icon="mdi-calendar"
                                v-bind="attrs"
                                @blur="
                                  numbergroupdate = parseFormDate(
                                    newnumbergroupdateform
                                  )
                                "
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="numbergroupdate"
                              no-title
                              locale="ru-ru"
                              @input="menunewnumbergroupdate = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="document.from"
                            :rules="[(v) => !!v || 'Поле не заполнено!']"
                            label="Инициатор"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
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
                                  v-model="menunewexecutiondate"
                                  :close-on-content-click="false"
                                  :nudge-right="40"
                                  transition="scale-transition"
                                  offset-y
                                  min-width="auto"
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                      label="до"
                                      v-model="newexecutiondateform"
                                      prepend-icon="mdi-calendar"
                                      v-bind="attrs"
                                      @blur="
                                        executiondate = parseFormDate(
                                          newexecutiondateform
                                        )
                                      "
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
                                    @input="menunewexecutiondate = false"
                                  ></v-date-picker>
                                </v-menu>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-select
                            v-model="document.view"
                            :hint="`Вид документа`"
                            :items="itemsViewDoc"
                            item-text="state"
                            persistent-hint
                            return-object
                            single-line
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-select
                            v-model="document.speed"
                            :hint="`Приоритет документа`"
                            :items="itemsSpeedDoc"
                            item-text="state"
                            persistent-hint
                            return-object
                            single-line
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-checkbox
                            v-model="document.control"
                            label="На контроле"
                            color="primary"
                          ></v-checkbox>
                        </v-col>
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
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Отменить
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="saveDocument">
                      Сохранить
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="editDialog" max-width="1500px">
                <v-card>
                  <v-card-title>
                    <span class="headline">Редактирование документа</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="currentDocument.number"
                            :rules="[(v) => !!v || 'Поле не заполнено!']"
                            label="Подписной №"
                            required
                          ></v-text-field>
                          <v-menu
                            v-model="menueditnumberdate"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                label="от"
                                v-model="currentDocument.numberdate"
                                prepend-icon="mdi-calendar"
                                v-bind="attrs"
                                @blur="
                                  editnumberdate = parseFormDate(currentDocument.numberdate)
                                "
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="editnumberdate"
                              no-title
                              locale="ru-ru"
                              @input="menueditnumberdate = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="currentDocument.numbercenter"
                            :rules="[(v) => !!v || 'Поле не заполнено!']"
                            label="вх. Центра"
                            required
                          ></v-text-field>
                          <v-menu
                            v-model="menueditnumbercenterdate"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                label="от"
                                v-model="currentDocument.numbercenterdate"
                                prepend-icon="mdi-calendar"
                                v-bind="attrs"
                                @blur="
                                  editnumbercenterdate = parseFormDate(
                                    currentDocument.numbercenterdate
                                  )
                                "
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="editnumbercenterdate"
                              no-title
                              locale="ru-ru"
                              @input="menueditnumbercenterdate = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="currentDocument.numberdepartment"
                            :rules="[(v) => !!v || 'Поле не заполнено!']"
                            label="вх. Управления"
                            required
                          ></v-text-field>
                          <v-menu
                            v-model="menueditnumberdepartmentdate"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                label="от"
                                v-model="currentDocument.numberdepartmentdate"
                                prepend-icon="mdi-calendar"
                                v-bind="attrs"
                                @blur="
                                  editnumberdepartmentdate = parseFormDate(
                                    currentDocument.numberdepartmentdate
                                  )
                                "
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="editnumberdepartmentdate"
                              no-title
                              locale="ru-ru"
                              @input="menueditnumberdepartmentdate = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="currentDocument.numbergroup"
                            :rules="[(v) => !!v || 'Поле не заполнено!']"
                            label="вх. подразд."
                            required
                          ></v-text-field>
                          <v-menu
                            v-model="menueditnumbergroupdate"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                label="от"
                                v-model="currentDocument.numbergroupdate"
                                prepend-icon="mdi-calendar"
                                v-bind="attrs"
                                @blur="
                                  editnumbergroupdate = parseFormDate(
                                    currentDocument.numbergroupdate
                                  )
                                "
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="editnumbergroupdate"
                              no-title
                              locale="ru-ru"
                              @input="menueditnumbergroupdate = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="currentDocument.from"
                            :rules="[(v) => !!v || 'Поле не заполнено!']"
                            label="Инициатор"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
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
                                  v-model="menueditexecutiondate"
                                  :close-on-content-click="false"
                                  :nudge-right="40"
                                  transition="scale-transition"
                                  offset-y
                                  min-width="auto"
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                      label="до"
                                      v-model="currentDocument.executiondate"
                                      prepend-icon="mdi-calendar"
                                      v-bind="attrs"
                                      @blur="
                                        editexecutiondate = parseFormDate(
                                          currentDocument.executiondate
                                        )
                                      "
                                      v-on="on"
                                    ></v-text-field>
                                    <v-checkbox
                                      v-model="currentDocument.status"
                                      label="Исполнено"
                                      color="info"
                                    ></v-checkbox>
                                  </template>
                                  <v-date-picker
                                    v-model="editexecutiondate"
                                    no-title
                                    locale="ru-ru"
                                    @input="menueditexecutiondate = false"
                                  ></v-date-picker>
                                </v-menu>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-select
                            v-model="currentDocument.view"
                            :hint="`Вид документа`"
                            :items="itemsViewDoc"
                            item-text="state"
                            persistent-hint
                            return-object
                            single-line
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-select
                            v-model="currentDocument.speed"
                            :hint="`Приоритет документа`"
                            :items="itemsSpeedDoc"
                            item-text="state"
                            persistent-hint
                            return-object
                            single-line
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-checkbox
                            v-model="currentDocument.control"
                            label="На контроле"
                            color="primary"
                          ></v-checkbox>
                        </v-col>
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
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeEdit">
                      Отменить
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="editDocument">
                      Сохранить
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="600px">
                <v-card>
                  <v-card-title class="headline"
                    >Вы уверены, что хотите удалить документ?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Отменить</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                      >Подтвердить</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.status`]="{ item }">
            <v-simple-checkbox
              v-model="item.status"
              disabled
            ></v-simple-checkbox>
          </template>
          <template v-slot:[`item.control`]="{ item }">
            <v-simple-checkbox
              v-model="item.control"
              disabled
            ></v-simple-checkbox>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="changeLocation(item.id)"
              >mdi-compass-outline</v-icon
            >
            <v-icon small class="mr-2" @click="editItem(item)"
              >mdi-pencil</v-icon
            >
            <!--<v-icon small @click="deleteDocument(item.id)">mdi-delete</v-icon>-->
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import DocumentDataService from "../services/DocumentDataService";
export default {
  data: () => ({
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
    currentDocument: {
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
    menunewnumberdate: false,
    menunewnumbercenterdate: false,
    menunewnumberdepartmentdate: false,
    menunewnumbergroupdate: false,
    menunewexecutiondate: false,
    menueditnumberdate: false,
    menueditnumbercenterdate: false,
    menueditnumberdepartmentdate: false,
    menueditnumbergroupdate: false,
    menueditexecutiondate: false,
    numberdate: "",
    numbercenterdate: "",
    numberdepartmentdate: "",
    numbergroupdate: "",
    executiondate: "",
    editnumberdate: "",
    editnumbercenterdate: "",
    editnumberdepartmentdate: "",
    editnumbergroupdate: "",
    editexecutiondate: "",
    newnumberdateform: "",
    newnumbercenterdateform: "",
    newnumberdepartmentdateform: "",
    newnumbergroupdateform: "",
    newexecutiondateform: "",
    dialog: false,
    editDialog: false,
    dialogDelete: false,
    search: "",
    loadProgress: false,
    documents: [],
    headers: [
      {
        text: "Подп. №",
        align: "start",
        sortable: true,
        value: "number",
      },
      { text: "от", value: "numberdate" },
      { text: "вх. Центр.", value: "numbercenter" },
      { text: "от", value: "numbercenterdate" },
      { text: "вх. Упр.", value: "numberdepartment" },
      { text: "от", value: "numberdepartmentdate" },
      { text: "вх. Отд.", value: "numbergroup" },
      { text: "от", value: "numbergroupdate" },
      { text: "Инициатор", value: "from" },
      { text: "Исп-тель", value: "executor" },
      { text: "до", value: "executiondate" },
      { text: "Статус", value: "status" },
      { text: "Вид", value: "view" },
      { text: "Сроч.", value: "speed" },
      { text: "Контроль", value: "control" },
      { text: "Коммент", value: "comment" },
      { text: "Действия", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    deleteId: "",
    editedItem: {
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
      view: "Запрос",
      speed: "Не срочный",
      control: false,
      comment: "",
    },
    defaultItem: {
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
      view: "Запрос",
      speed: "Не срочный",
      control: false,
      comment: "",
    },
  }),

  computed: { },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogEdit(val) {
      val || this.closeEdit();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    numberdate() {
      this.newnumberdateform = this.formatDate(this.numberdate);
    },
    editnumberdate() {
      this.currentDocument.numberdate = this.formatDate(this.editnumberdate);
    },
    numbercenterdate() {
      this.newnumbercenterdateform = this.formatDate(this.numbercenterdate);
    },
    editnumbercenterdate() {
      this.currentDocument.numbercenterdate = this.formatDate(this.editnumbercenterdate);
    },
    numberdepartmentdate() {
      this.newnumberdepartmentdateform = this.formatDate(
        this.numberdepartmentdate
      );
    },
    editnumberdepartmentdate() {
      this.currentDocument.numberdepartmentdate = this.formatDate(
        this.editnumberdepartmentdate
      );
    },
    numbergroupdate() {
      this.newnumbergroupdateform = this.formatDate(this.numbergroupdate);
    },
    editnumbergroupdate() {
      this.currentDocumentnumbergroupdate = this.formatDate(this.editnumbergroupdate);
    },
    executiondate() {
      this.newexecutiondateform = this.formatDate(this.executiondate);
    },
    editexecutiondate() {
      this.currentDocument.executiondate = this.formatDate(this.editexecutiondate);
    },
  },

  mounted() {
    this.retrieveDocuments();
  },

  methods: {
    saveDocument() {
      // проверка на обязательные поля
      var data = {
        number: this.document.number,
        numberdate: !this.newnumberdateform
          ? undefined
          : this.parseDate(this.newnumberdateform),
        numbercenter: this.document.numbercenter,
        numbercenterdate: !this.newnumbercenterdateform
          ? undefined
          : this.parseDate(this.newnumbercenterdateform),
        numberdepartment: this.document.numberdepartment,
        numberdepartmentdate: !this.newnumberdepartmentdateform
          ? undefined
          : this.parseDate(this.newnumberdepartmentdateform),
        numbergroup: this.document.numbergroup,
        numbergroupdate: !this.newnumbergroupdateform
          ? undefined
          : this.parseDate(this.newnumbergroupdateform),
        from: this.document.from,
        executor: this.document.executor,
        executiondate: !this.newexecutiondateform
          ? undefined
          : this.parseDate(this.newexecutiondateform),
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
      if (this.editedIndex > -1) {
        Object.assign(this.documents[this.editedIndex], this.editedItem);
      } else {
      this.documents.push(this.document);
      }
      this.refreshList();
      this.close();
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

    retrieveDocuments() {
      DocumentDataService.getAll()
        .then((response) => {
          console.log(response);
          this.documents = response.data.map(this.getDisplayDocument);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveDocuments();
    },

    removeAllDocuments() {
      DocumentDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    /*editDocument(id) {
      this.$router.push({ name: "document-details", params: { id: id } });
    },*/

    editDocument() {
      // проверка на обязательные поля
      var data = {
        id: this.currentDocument.id,
        number: this.currentDocument.number,
        numberdate: !(this.currentDocument.numberdate === "б/д") 
        ? this.parseDate(this.currentDocument.numberdate)
        : undefined,
        numbercenter: this.currentDocument.numbercenter,
        numbercenterdate: !(this.currentDocument.numbercenterdate === "б/д") 
        ? this.parseDate(this.currentDocument.numbercenterdate)
        : undefined,
        numberdepartment: this.currentDocument.numberdepartment,
        numberdepartmentdate: !(this.currentDocument.numberdepartmentdate === "б/д") 
        ? this.parseDate(this.currentDocument.numberdepartmentdate)
        : undefined,
        numbergroup: this.currentDocument.numbergroup,
        numbergroupdate: !(this.currentDocument.numbergroupdate === "б/д") 
        ? this.parseDate(this.currentDocument.numbergroupdate)
        : undefined,
        from: this.currentDocument.from,
        executor: this.currentDocument.executor,
        executiondate: !(this.currentDocument.executiondate === "б/д") 
        ? this.parseDate(this.currentDocument.executiondate)
        : undefined,
        status: this.currentDocument.status,
        view: (this.currentDocument.view.state === undefined)
          ? this.currentDocument.view
          : this.currentDocument.view.state,
        speed: (this.currentDocument.speed.state === undefined)
          ? this.currentDocument.speed
          : this.currentDocument.speed.state,
        control: this.currentDocument.control,
        comment: this.currentDocument.comment,
        created: this.currentDocument.created,
        updated: new Date(),
      };
      console.log(data);
      DocumentDataService.update(this.currentDocument.id, data)
        .then((response) => {
          this.currentDocument.view = data.view;
          this.currentDocument.speed = data.speed;
          if (this.editedIndex > -1) {
            Object.assign(this.documents[this.editedIndex], this.currentDocument);
          } else {
            console.log(this.currentDocument);
            this.documents.push(this.currentDocument);
          }
          this.closeEdit();
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
      //this.refreshList();
      //this.closeEdit();
    },

    changeLocation(id) {
      console.log(id);
    },

    deleteDocument(id) {
      //this.dialogDelete = true;
      DocumentDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getDisplayDocument(document) {
      console.log(document);
      return {
        id: document.Id,
        number: document.Number,
        numberdate: !(document.NumberDate === "0001-01-01T00:00:00Z") ? this.parseIncomingDate(
          document.NumberDate.substring(
            0,
            document.NumberDate.indexOf("T")
          )
        )
        : "б/д",
        numbercenter: document.NumberCenter,
        numbercenterdate: !(document.NumberCenterDate === "0001-01-01T00:00:00Z") ? this.parseIncomingDate(
          document.NumberCenterDate.substring(
            0,
            document.NumberCenterDate.indexOf("T")
          )
        )
        : "б/д",
        numberdepartment: document.NumberDepartment,
        numberdepartmentdate: !(document.NumberDepartmentDate === "0001-01-01T00:00:00Z") ? this.parseIncomingDate(
          document.NumberDepartmentDate.substring(
            0,
            document.NumberDepartmentDate.indexOf("T")
          )
        )
        : "б/д",
        numbergroup: document.NumberGroup,
        numbergroupdate: !(document.NumberGroupDate === "0001-01-01T00:00:00Z") ? this.parseIncomingDate(
          document.NumberGroupDate.substring(
            0,
            document.NumberGroupDate.indexOf("T")
          )
        )
        : "б/д",
        from: document.From,
        executor: document.Executor,
        executiondate: !(document.ExecutionDate === "0001-01-01T00:00:00Z") ? this.parseIncomingDate(
          document.ExecutionDate.substring(
            0,
            document.ExecutionDate.indexOf("T")
          )
        )
        : "б/д",
        status: document.Status,
        view: document.View,
        speed: document.Speed,
        control: document.Control,
        comment: document.Comment,
        created: document.Created,
        updated: document.Updated,
      };
    },

    editItem(item) {
      this.editedIndex = this.documents.indexOf(item);
      this.currentDocument = Object.assign({}, item);
      console.log(item);
      this.editDialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.documents.indexOf(item);
      this.deleteId = item.id;
      console.log(this.editedIndex);
      console.log(item);
      //this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.documents.splice(this.editedIndex, 1);
      DocumentDataService.delete(this.deleteId)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
      });
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.document = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeEdit() {
      this.editDialog = false;
      this.$nextTick(() => {
        this.currentDocument = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.document = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    parseIncomingDate(input) {
      let parts = input.split("-");
      if (parts.length === 3) return parts[2] + "." + parts[1] + "." + parts[0];
      else return "00.00.0000";
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>