<template>
  <div>
    <h2 class="text-h6 mb-2">
        Печать реестров
    </h2>

    <groups-autocomplete />
    <number-autocomplete />
    <classified-autocomplete />
    <v-btn
      color="success"
      @click="generate"
      style="margin-left: auto !important; margin-right: auto !important"
      >Сформировать</v-btn
    >
  </div>
</template>

<script>
import * as docx from "docx";
import { saveAs } from "file-saver";
import NumberAutocomplete from './NumberAutocomplete.vue';
import ClassifiedAutocomplete from './ClassifiedAutocomplete.vue';
import GroupsAutocomplete from './GroupsAutocomplete.vue';

export default {
  components: { NumberAutocomplete, ClassifiedAutocomplete, GroupsAutocomplete },
  data: () => ({}),

  methods: {
    generate() {
      console.log(localStorage.registrynumber.replace(new RegExp(",",'g'), "\\r\\a"));
      const doc = new docx.Document({
        sections: [
          {
            properties: {},
            children: [
              new docx.Paragraph({
                alignment: docx.AlignmentType.CENTER,
                children: [
                  new docx.TextRun({
                    text: "Р Е Е С Т Р №  ",
                    bold: true,
                    size: 24,
                  }),
                  new docx.TextRun({
                    text: "000",
                    bold: true,
                    size: 28,
                    underline: {},
                  }),
                ],
              }),
              new docx.Paragraph({
                children: [
                  new docx.TextRun({
                    text: "",
                    size: 12,
                  }),
                ],
              }),
              new docx.Paragraph({
                alignment: docx.AlignmentType.LEFT,
                children: [
                  new docx.TextRun({
                    text: "на корреспонденцию             ",
                    bold: true,
                    size: 12,
                  }),
                  new docx.TextRun({
                    text: "имя центра",
                    bold: true,
                    size: 14,
                    underline: {},
                  }),
                ],
              }),
              new docx.Paragraph({
                children: [
                  new docx.TextRun({
                    text: "            (наименование органа безопасности, подразделения органа безопасности)",
                    size: 10,
                  }),
                ],
              }),
              new docx.Paragraph({
                children: [
                  new docx.TextRun({
                    text: "для доставки адресату        ",
                    bold: true,
                    size: 12,
                  }),
                ],
              }),
              new docx.Paragraph({
                alignment: docx.AlignmentType.RIGHT,
                children: [
                  new docx.TextRun({
                    text: this.formattedDate() + " г.",
                    bold: true,
                    size: 14,
                    underline: {},
                  }),
                ],
              }),
              new docx.Paragraph({
                children: [
                  new docx.TextRun({
                    text: "        Отправитель   ",
                    size: 12,
                  }),
                  new docx.TextRun({
                    text: localStorage.group,
                    bold: true,
                    size: 14,
                    underline: {},
                  }),
                ],
              }),
              new docx.Paragraph({
                children: [
                  new docx.TextRun({
                    text: "",
                    size: 12,
                  }),
                ],
              }),
              new docx.Table({
                rows: [
                  new docx.TableRow({
                    children: [
                      new docx.TableCell({
                        children: [
                          new docx.Paragraph({
                            alignment: docx.AlignmentType.CENTER,
                            children: [
                              new docx.TextRun({
                                text: "№",
                                size: 10,
                              }),
                            ],
                          }),
                          new docx.Paragraph({
                            alignment: docx.AlignmentType.CENTER,
                            children: [
                              new docx.TextRun({
                                text: "п/п",
                                size: 10,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new docx.TableCell({
                        children: [
                          new docx.Paragraph({
                            alignment: docx.AlignmentType.CENTER,
                            children: [
                              new docx.TextRun({
                                text: "Кому адресованы пакеты или документы",
                                size: 10,
                              }),
                            ],
                          }),
                          new docx.Paragraph({
                            alignment: docx.AlignmentType.CENTER,
                            children: [
                              new docx.TextRun({
                                text: "(подробное наименование адресата)",
                                size: 10,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new docx.TableCell({
                        children: [
                          new docx.Paragraph({
                            alignment: docx.AlignmentType.CENTER,
                            children: [
                              new docx.TextRun({
                                text: "Номера документов",
                                size: 10,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new docx.TableCell({
                        children: [
                          new docx.Paragraph({
                            alignment: docx.AlignmentType.CENTER,
                            children: [
                              new docx.TextRun({
                                text: "Гриф секретности",
                                size: 10,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new docx.TableCell({
                        children: [
                          new docx.Paragraph({
                            alignment: docx.AlignmentType.CENTER,
                            children: [
                              new docx.TextRun({
                                text: "Номер экземпляров документов",
                                size: 10,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new docx.TableCell({
                        children: [
                          new docx.Paragraph({
                            alignment: docx.AlignmentType.CENTER,
                            children: [
                              new docx.TextRun({
                                text: "Подпись в получении, дата, время и печать",
                                size: 10,
                              }),
                            ],
                          }),
                          new docx.Paragraph({
                            alignment: docx.AlignmentType.CENTER,
                            children: [
                              new docx.TextRun({
                                text: "«Для пакетов»",
                                size: 10,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  new docx.TableRow({
                    children: [
                      new docx.TableCell({
                        children: [
                          new docx.Paragraph({
                            alignment: docx.AlignmentType.CENTER,
                            children: [
                              new docx.TextRun({
                                text: "1.",
                                size: 12,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new docx.TableCell({
                        children: [
                          new docx.Paragraph({
                            alignment: docx.AlignmentType.CENTER,
                            children: [
                              new docx.TextRun({
                                text: localStorage.registrygroup,
                                size: 12,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new docx.TableCell({
                        children: [
                          new docx.Paragraph({
                            alignment: docx.AlignmentType.CENTER,
                            children: [
                              new docx.TextRun({
                                text: localStorage.registrynumber.replace(new RegExp(",",'g'), "\\n"),
                                size: 12,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new docx.TableCell({
                        children: [
                          new docx.Paragraph({
                            alignment: docx.AlignmentType.CENTER,
                            children: [
                              new docx.TextRun({
                                text: localStorage.registryclassified,
                                size: 12,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new docx.TableCell({
                        children: [
                          new docx.Paragraph({
                            alignment: docx.AlignmentType.CENTER,
                            children: [
                              new docx.TextRun({
                                text: "",
                                size: 12,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new docx.TableCell({
                        children: [
                          new docx.Paragraph({
                            alignment: docx.AlignmentType.CENTER,
                            children: [
                              new docx.TextRun({
                                text: "",
                                size: 12,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
                width: {
                  size: 9535,
                  type: docx.WidthType.DXA,
                },
              }),
              new docx.Paragraph({
                children: [
                  new docx.TextRun({
                    text: "",
                    size: 12,
                  }),
                ],
              }),
              new docx.Paragraph({
                children: [
                  new docx.TextRun({
                    text: "           Итого         ",
                    size: 14,
                  }),
                  new docx.TextRun({
                    text: "один      пакет",
                    size: 14,
                    underline: {},
                  }),
                ],
              }),
              new docx.Paragraph({
                children: [
                  new docx.TextRun({
                    text: "                                      (прописью)",
                    size: 10,
                  }),
                ],
              }),
              new docx.Paragraph({
                children: [
                  new docx.TextRun({
                    text: "",
                    size: 12,
                  }),
                ],
              }),
              new docx.Paragraph({
                children: [
                  new docx.TextRun({
                    text: "",
                    size: 12,
                  }),
                ],
              }),
              new docx.Paragraph({
                children: [
                  new docx.TextRun({
                    text: "Отправитель",
                    size: 14,
                  }),
                  new docx.TextRun({
                    text: "                                                                        ",
                    size: 14,
                    underline: {},
                  }),
                  new docx.TextRun({
                    text: localStorage.fullname,
                    size: 14,
                    underline: {},
                  }),
                ],
              }),
              new docx.Paragraph({
                children: [
                  new docx.TextRun({
                    text: "              (должность и подпись, заверенная печатью)",
                    size: 10,
                  }),
                ],
              }),
              new docx.Paragraph({
                children: [
                  new docx.TextRun({
                    text: "",
                    size: 12,
                  }),
                ],
              }),
              new docx.Paragraph({
                children: [
                  new docx.TextRun({
                    text: "Принято ",
                    size: 14,
                  }),
                  new docx.TextRun({
                    text: "                      ",
                    size: 14,
                    underline: {},
                  }),
                  new docx.TextRun({
                    text: " пакетов        ",
                    size: 14,
                  }),
                  new docx.TextRun({
                    text: "             ",
                    size: 14,
                    underline: {},
                  }),
                  new docx.TextRun({
                    text: "   ",
                    size: 14,
                  }),
                  new docx.TextRun({
                    text: "                        ",
                    size: 14,
                    underline: {},
                  }),
                  new docx.TextRun({
                    text: "    ",
                    size: 14,
                  }),
                  new docx.TextRun({
                    text: "    " + new Date().getFullYear() + " г.",
                    size: 14,
                    underline: {},
                  }),
                  new docx.TextRun({
                    text: "⠀",
                    size: 14,
                    underline: {},
                  }),
                ],
              }),
            ],
          },
        ],
      });

      docx.Packer.toBlob(doc).then((blob) => {
        console.log(blob);
        saveAs(blob, "example.docx");
        console.log("Document created successfully");
      });
    },

    formattedDate(d = new Date()) {
      let month = d.getMonth() + 1;
      let day = String(d.getDate());
      const year = String(d.getFullYear());

      switch (month) {
        case 1:
          month = "января";
          break;
        case 2:
          month = "февраля";
          break;
        case 3:
          month = "марта";
          break;
        case 4:
          month = "апреля";
          break;
        case 5:
          month = "мая";
          break;
        case 6:
          month = "июня";
          break;
        case 7:
          month = "июля";
          break;
        case 8:
          month = "августа";
          break;
        case 9:
          month = "сентября";
          break;
        case 10:
          month = "октября";
          break;
        case 11:
          month = "ноября";
          break;
        case 12:
          month = "декабря";
          break;
      }
      if (day.length < 2) day = "0" + day;

      return `${day} ${month} ${year}`;
    },
  },
};
</script>