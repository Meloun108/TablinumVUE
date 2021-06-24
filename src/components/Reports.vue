<template>
  <div>
    <h1>DOCX browser Word document generation</h1>

    <v-btn
      color="success"
      @click="generate"
      style="margin-left: auto !important; margin-right: auto !important"
      >Зарегистрировать</v-btn
    >
  </div>
</template>

<script>
import * as docx from "docx";
import { saveAs } from "file-saver";

export default {
  data: () => ({}),

  methods: {
    generate() {
      const doc = new docx.Document({
        sections: [
          {
            properties: {},
            children: [
              new docx.Paragraph({
                children: [
                  new docx.TextRun({
                    text: "Р Е Е С Т Р №  ",
                    bold: true,
                    size: 24,
                    alignment: {
                        x: HorizontalPositionAlign.CENTER,
                        y: VerticalPositionAlign.TOP,
                    },
                  }),
                  new docx.TextRun({
                      text: "000",
                      bold: true,
                      size: 28,
                      underline: {},
                      alignment: {
                        x: HorizontalPositionAlign.CENTER,
                        y: VerticalPositionAlign.TOP,
                        },
                  })
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
  },
};
</script>