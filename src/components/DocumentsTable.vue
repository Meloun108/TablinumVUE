<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" md="8">
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        single-line
        hide-details
        label="Поиск"
        autocomplete="off"
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
                            autocomplete="off"
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
                                label="от *"
                                v-model="newnumberdateform"
                                :rules="[(v) => !!v || 'Поле не заполнено!']"
                                prepend-icon="mdi-calendar"
                                autocomplete="off"
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
                            autocomplete="off"
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
                                autocomplete="off"
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
                            autocomplete="off"
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
                                autocomplete="off"
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
                        <v-col cols="12" sm="6" md="4"> </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-autocomplete
                            v-model="document.from"
                            :items="initios"
                            :filter="customFilterInitio"
                            color="white"
                            item-text="initio"
                            item-value="id"
                            label="Инициатор"
                            required
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-autocomplete
                            v-model="document.executor"
                            :items="executors"
                            :filter="customFilterUser"
                            color="white"
                            item-text="name"
                            item-value="id"
                            label="Исполнитель"
                            required
                          ></v-autocomplete>
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
                                      autocomplete="off"
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
                              autocomplete="off"
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
                            label="Подписной № *"
                            autocomplete="off"
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
                                label="от *"
                                v-model="currentDocument.numberdate"
                                :rules="[(v) => !!v || 'Поле не заполнено!']"
                                prepend-icon="mdi-calendar"
                                autocomplete="off"
                                v-bind="attrs"
                                @blur="
                                  editnumberdate = parseFormDate(
                                    currentDocument.numberdate
                                  )
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
                            autocomplete="off"
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
                                autocomplete="off"
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
                            autocomplete="off"
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
                                autocomplete="off"
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
                        <v-col cols="12" sm="6" md="4"> </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-autocomplete
                            v-model="currentDocument.from"
                            :items="initios"
                            :filter="customFilterInitio"
                            color="white"
                            item-text="initio"
                            item-value="id"
                            label="Инициатор"
                            required
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-autocomplete
                            v-model="currentDocument.executor"
                            :items="executors"
                            :filter="customFilterUser"
                            color="white"
                            item-text="name"
                            item-value="id"
                            label="Исполнитель"
                            required
                          ></v-autocomplete>
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
                                      autocomplete="off"
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
                              autocomplete="off"
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
              <v-dialog v-model="dialogLocation" max-width="1500px">
                <v-card class="mx-auto" tile>
                  <v-card-title>
                    <span class="headline">Движение документа</span>
                  </v-card-title>
                  <v-row align="center" class="list px-3 mx-auto">
                    <v-col cols="12" sm="8">
                      <v-text-field
                        v-model="searchLocation"
                        append-icon="mdi-magnify"
                        single-line
                        hide-details
                        label="Поиск"
                        autocomplete="off"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-col cols="12" sm="12">
                    <v-data-table
                      :headers="headersLocations"
                      :items="docgroupinfo"
                      :items-per-page="5"
                      :search="searchLocation"
                      class="elevation-1"
                      :loading="loadProgress"
                      loading-text="Загрузка... Ожидайте"
                      :sort-by="['all']"
                      multi-sort
                    >
                      <template v-slot: top>
                        <v-toolbar flat>
                          <v-toolbar-title>Местоположение</v-toolbar-title>
                          <v-divider class="mx-4" inset vertical></v-divider>
                          <v-spacer></v-spacer>
                          <v-dialog v-model="dialogNewLoc" max-width="1500px">
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
                                <span class="headline">Новый номер</span>
                              </v-card-title>
                              <v-card-text>
                                <v-container>
                                  <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field
                                        v-model="newdocnumberloc"
                                        :rules="[
                                          (v) => !!v || 'Поле не заполнено!',
                                        ]"
                                        v-if="dialogNewLoc"
                                        label="Номер *"
                                        autocomplete="off"
                                        autofocus
                                        required
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>
                                </v-container>
                              </v-card-text>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                  color="blue darken-1"
                                  text
                                  @click="close"
                                >
                                  Отменить
                                </v-btn>
                                <v-btn
                                  color="blue darken-1"
                                  text
                                  @click="saveNewLocation"
                                >
                                  Сохранить
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-toolbar>
                      </template>
                      <template v-slot:[`item.location`]="{ item }">
                        <v-simple-checkbox
                          v-model="item.location"
                          disabled
                        ></v-simple-checkbox>
                      </template>
                      <template v-slot:[`item.actions`]="{ item }">
                        <v-icon small class="mr-2" @click="editLocation(item)"
                          >mdi-pencil</v-icon
                        >
                        <v-icon small @click="deleteLocation(item)"
                          >mdi-delete</v-icon
                        >
                      </template>
                    </v-data-table>
                  </v-col>
                </v-card>
              </v-dialog>
              <v-dialog v-model="editLocDialog" max-width="1500px">
                <v-card>
                  <v-card-title>
                    <span class="headline"
                      >Редактирование номера документа</span
                    >
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="docgroupinfo.numbergroup"
                            :rules="[(v) => !!v || 'Поле не заполнено!']"
                            label="Номер *"
                            autocomplete="off"
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeEdit">
                      Отменить
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="editLocation">
                      Сохранить
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogLocDelete" max-width="600px">
                <v-card>
                  <v-card-title class="headline"
                    >Вы уверены, что хотите удалить
                    местоположение?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Отменить</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteLocConfirm"
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
            <v-icon small class="mr-2" @click="changeLocation(item)"
              >mdi-compass-outline</v-icon
            >
            <v-icon small class="mr-2" @click="editItem(item)"
              >mdi-pencil</v-icon
            >
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import DocumentDataService from "../services/DocumentDataService";
import InitioDataService from "../services/InitioDataService";
import UserDataService from "../services/UserDataService";
import GroupDataService from "../services/GroupDataService";
import { mapState } from "vuex";

export default {
  data: () => ({
    itemsSpeedDoc: [
      { state: "Не срочный" }, 
      { state: "Срочный" }
    ],
    itemsViewDoc: [
      { state: "Запрос" },
      { state: "Шифртелеграмма" },
      { state: "Прочее" },
    ],
    document: {
      id: null,
      number: "",
      numberdate: "",
      numbercenter: "",
      numbercenterdate: "",
      numberdepartment: "",
      numberdepartmentdate: "",
      groupinfo: [
        {
          group: "",
          numbergroup: "",
          numbergroupdate: "",
          location: true,
        },
      ],
      from: {
        id: null,
        initio: "",
      },
      executor: {
        id: null,
        name: "",
      },
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
      groupinfo: [
        {
          group: "",
          numbergroup: "",
          numbergroupdate: "",
          location: true,
        },
      ],
      from: {
        id: null,
        initio: "",
      },
      executor: {
        id: null,
        name: "",
      },
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
    dialogNewLoc: false,
    editDialog: false,
    editLocDialog: false,
    dialogDelete: false,
    dialogLocDelete: false,
    dialogLocation: false,
    search: "",
    searchLocation: "",
    loadProgress: false,
    documents: [],
    initios: [],
    groups: [],
    executors: [],
    usergroup: "",
    docgroupinfo: [],
    newdocnumberloc: "",
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
    headersLocations: [
      {
        text: "Подразделение",
        align: "start",
        sortable: true,
        value: "group",
      },
      { text: "Номер док-та", value: "numbergroup" },
      { text: "от", value: "numbergroupdate" },
      { text: "На руках", value: "location" },
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

  computed: mapState(["getTok"]),

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogNewLoc(val) {
      val || this.close();
    },
    dialogEdit(val) {
      val || this.closeEdit();
    },
    dialogLocEdit(val) {
      val || this.closeEdit();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    dialogLocDelete(val) {
      val || this.closeDelete();
    },
    dialogLocation(val) {
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
      this.currentDocument.numbercenterdate = this.formatDate(
        this.editnumbercenterdate
      );
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
      this.currentDocumentnumbergroupdate = this.formatDate(
        this.editnumbergroupdate
      );
    },
    executiondate() {
      this.newexecutiondateform = this.formatDate(this.executiondate);
    },
    editexecutiondate() {
      this.currentDocument.executiondate = this.formatDate(
        this.editexecutiondate
      );
    },
  },

  mounted() {
    this.retrieveDocuments();
  },

  methods: {
    customFilterInitio(item, queryText) {
      const textOne = item.initio.toLowerCase();
      const searchText = queryText.toLowerCase();
      return textOne.indexOf(searchText) > -1;
    },

    customFilterUser(item, queryText) {
      const textOne = item.name.toLowerCase();
      const searchText = queryText.toLowerCase();
      return textOne.indexOf(searchText) > -1;
    },

    saveDocument() {
      console.log(this.document);
      if (this.document.number === "" || !this.newnumberdateform) {
        this.$toastr.e("", "Не заполнены обязательные поля!");
      } else {
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
          groupinfo: [
            {
              group: this.usergroup,
              numbergroup: "",
              numbergroupdate: new Date(),
              location: true,
            },
          ],
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

        DocumentDataService.create(data, this.$store.state.token)
          .then((response) => {
            this.document.id = response.data.Id;
            console.log(response.data);
            this.submitted = true;
          })
          .catch((e) => {
            console.log(e);
            this.$store.dispatch("logout").then(() => {
              this.$router.push("/login");
            });
          });
        if (this.editedIndex > -1) {
          Object.assign(this.documents[this.editedIndex], this.editedItem);
        } else {
          this.documents.push(this.document);
        }
        this.refreshList();
        this.close();
      }
    },

    saveNewLocation() {
      console.log(this.newdocnumberloc);
      if (this.newdocnumberloc === "") {
        this.$toastr.e("", "Не заполнены обязательные поля!");
      } else {
        var data = {
          group: this.usergroup,
          numbergroup: "",
          numbergroupdate: new Date(),
          location: true,
        };
        console.log("docgroupinfo");
        console.log(this.docgroupinfo);
        this.docgroupinfo.push(data);
        /*DocumentDataService.create(data, this.$store.state.token)
          .then((response) => {
            this.document.id = response.data.Id;
            console.log(response.data);
            this.submitted = true;
          })
          .catch((e) => {
            console.log(e);
            this.$store.dispatch("logout").then(() => {
              this.$router.push("/login");
            });
          });
        if (this.editedIndex > -1) {
          Object.assign(this.documents[this.editedIndex], this.editedItem);
        } else {
          this.documents.push(this.document);
        }*/
        console.log(this.docgroupinfo);
        this.refreshList();
        this.close();
      }
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
      GroupDataService.getAll(this.$store.state.token)
        .then((response) => {
          console.log(response);
          this.groups = response.data.map(this.getSelectGroup);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
          this.$store.dispatch("logout").then(() => {
            this.$router.push("/login");
          });
        });
      InitioDataService.getAll(this.$store.state.token)
        .then((response) => {
          console.log(response);
          this.initios = response.data.map(this.getSelectInitio);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
          this.$store.dispatch("logout").then(() => {
            this.$router.push("/login");
          });
        });
      UserDataService.getAll(this.$store.state.token)
        .then((response) => {
          console.log(response);
          this.executors = response.data.map(this.getSelectUser);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
          this.$store.dispatch("logout").then(() => {
            this.$router.push("/login");
          });
        });
      UserDataService.findByUser(localStorage.user, this.$store.state.token)
        .then((response) => {
          this.usergroup = response.data.Group;
          DocumentDataService.findByUserGroup(
            this.usergroup,
            this.$store.state.token
          )
            .then((response) => {
              console.log(response);
              this.documents = response.data.map(this.getDisplayDocument);
              console.log(response.data);
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

    getSelectGroup(group) {
      console.log(group);
      return {
        id: group.Id,
        dept: group.Dept,
      };
    },

    getSelectInitio(initio) {
      console.log(initio);
      return {
        id: initio.Id,
        initio: initio.Initio,
      };
    },

    getSelectUser(user) {
      console.log(user);
      return {
        id: user.Id,
        name: user.Name,
      };
    },

    refreshList() {
      this.retrieveDocuments();
    },

    removeAllDocuments() {
      DocumentDataService.deleteAll(this.$store.state.token)
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
          this.$store.dispatch("logout").then(() => {
            this.$router.push("/login");
          });
        });
    },

    editDocument() {
      if (
        this.currentDocument.number === "" ||
        !this.currentDocument.numberdate
      ) {
        this.$toastr.e("", "Не заполнены обязательные поля!");
      } else {
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
          numberdepartmentdate: !(
            this.currentDocument.numberdepartmentdate === "б/д"
          )
            ? this.parseDate(this.currentDocument.numberdepartmentdate)
            : undefined,
          groupinfo: this.docgroupinfo,
          from: !(typeof this.currentDocument.from === "object")
            ? this.currentDocument.from
            : this.currentDocument.from.id,
          executor: !(typeof this.currentDocument.executor === "object")
            ? this.currentDocument.executor
            : this.currentDocument.executor.id,
          executiondate: !(this.currentDocument.executiondate === "б/д")
            ? this.parseDate(this.currentDocument.executiondate)
            : undefined,
          status: this.currentDocument.status,
          view:
            this.currentDocument.view.state === undefined
              ? this.currentDocument.view
              : this.currentDocument.view.state,
          speed:
            this.currentDocument.speed.state === undefined
              ? this.currentDocument.speed
              : this.currentDocument.speed.state,
          control: this.currentDocument.control,
          comment: this.currentDocument.comment,
          created: this.currentDocument.created,
          updated: new Date(),
        };
        DocumentDataService.update(
          this.currentDocument.id,
          data,
          this.$store.state.token
        )
          .then((response) => {
            this.currentDocument.view = data.view;
            this.currentDocument.speed = data.speed;
            this.currentDocument.from = this.getFrom(data.from);
            this.currentDocument.executor = this.getExec(data.executor);
            if (this.editedIndex > -1) {
              Object.assign(
                this.documents[this.editedIndex],
                this.currentDocument
              );
            } else {
              this.documents.push(this.currentDocument);
            }
            this.closeEdit();
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
            this.$store.dispatch("logout").then(() => {
              this.$router.push("/login");
            });
          });
      }
    },

    deleteDocument(id) {
      DocumentDataService.delete(id, this.$store.state.token)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
          this.$store.dispatch("logout").then(() => {
            this.$router.push("/login");
          });
        });
    },

    getDisplayDocument(document) {
      return {
        id: document.Id,
        number: document.Number,
        numberdate: !(document.NumberDate === "0001-01-01T00:00:00Z")
          ? this.parseIncomingDate(
              document.NumberDate.substring(0, document.NumberDate.indexOf("T"))
            )
          : "б/д",
        numbercenter: document.NumberCenter,
        numbercenterdate: !(
          document.NumberCenterDate === "0001-01-01T00:00:00Z"
        )
          ? this.parseIncomingDate(
              document.NumberCenterDate.substring(
                0,
                document.NumberCenterDate.indexOf("T")
              )
            )
          : "б/д",
        numberdepartment: document.NumberDepartment,
        numberdepartmentdate: !(
          document.NumberDepartmentDate === "0001-01-01T00:00:00Z"
        )
          ? this.parseIncomingDate(
              document.NumberDepartmentDate.substring(
                0,
                document.NumberDepartmentDate.indexOf("T")
              )
            )
          : "б/д",
        groupinfo: document.GroupInfo,
        from: this.getFrom(document.From),
        executor: this.getExec(document.Executor),
        executiondate: !(document.ExecutionDate === "0001-01-01T00:00:00Z")
          ? this.parseIncomingDate(
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

    getDisplayLocation(location) {
      return {
        group: this.getGroup(location.Group),
        numbergroup: location.NumberGroup,
        numbergroupdate: !(location.NumberGroupDate === "0001-01-01T00:00:00Z")
          ? this.parseIncomingDate(
              location.NumberGroupDate.substring(
                0,
                location.NumberGroupDate.indexOf("T")
              )
            )
          : "б/д",
        location: location.Location,
      };
    },

    editItem(item) {
      this.editedIndex = this.documents.indexOf(item);
      this.currentDocument = Object.assign({}, item);
      let ini = this.initios.find((i) => i.initio == item.from);
      let indI = this.initios.indexOf(ini);
      this.currentDocument.from = this.initios[indI];
      let exec = this.executors.find((e) => e.name == item.executor);
      let indE = this.executors.indexOf(exec);
      this.currentDocument.executor = this.executors[indE];
      this.docgroupinfo = item.groupinfo;
      this.editDialog = true;
    },

    editLocation(location) {
      console.log(location);
      /*this.editedIndex = this.documents.indexOf(item);
      this.currentDocument = Object.assign({}, item);
      let ini = this.initios.find((i) => i.initio == item.from);
      let indI = this.initios.indexOf(ini);
      this.currentDocument.from = this.initios[indI];
      let exec = this.executors.find((e) => e.name == item.executor);
      let indE = this.executors.indexOf(exec);
      this.currentDocument.executor = this.executors[indE];
      this.docgroupinfo = item.groupinfo;*/
      this.editLocDialog = true;
    },

    changeLocation(item) {
      this.editedIndex = this.documents.indexOf(item);
      this.currentDocument = Object.assign({}, item);
      let ini = this.initios.find((i) => i.initio == item.from);
      let indI = this.initios.indexOf(ini);
      this.currentDocument.from = this.initios[indI];
      let exec = this.executors.find((e) => e.name == item.executor);
      let indE = this.executors.indexOf(exec);
      this.currentDocument.executor = this.executors[indE];
      this.docgroupinfo = item.groupinfo.map(this.getDisplayLocation);
      this.dialogLocation = true;
    },

    deleteItem(item) {
      this.editedIndex = this.documents.indexOf(item);
      this.deleteId = item.id;
      this.dialogDelete = true;
    },

    deleteLocation(location) {
      console.log(location);
      //this.editedIndex = this.documents.indexOf(item);
      //this.deleteId = item.id;
      this.dialogLocDelete = true;
    },

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

    deleteLocConfirm() {
      /*this.docgroupinfo.splice(this.editedIndex, 1);
      DocumentDataService.delete(this.deleteId, this.$store.state.token)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
          this.$store.dispatch("logout").then(() => {
            this.$router.push("/login");
          });
        });*/
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

    getFrom(inn) {
      let ini = this.initios.find((item) => item.id == inn);
      return ini.initio;
    },

    getExec(exec) {
      let ex = this.executors.find((item) => item.id == exec);
      return ex.name;
    },

    getGroup(group) {
      console.log("dept");
      console.log(group);
      let gr = this.groups.find((item) => item.id == group);
      console.log(gr);
      return gr.dept;
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