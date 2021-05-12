<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        lg="6"
        style="display: contents;"
      >
        <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateFormatted"
              :return-value.sync="dateFormatted"
              label="от"
              persistent-hint
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              @blur="date = parseDate(dateFormatted)"
              v-on="on"
            ></v-text-field>
            <v-checkbox
            v-model="statusFormatted"
            :return-value.sync="statusFormatted"
              label="Исполнено"
              color="info"
            ></v-checkbox>
          </template>
          <v-date-picker
            v-model="date"
            no-title
            @input="menu1 = false"
            locale="ru-ru"
          ></v-date-picker>
        </v-menu>
        
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: vm => ({
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
      statusFormatted: false,
    }),

    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
    },

    watch: {
      date () {
        this.dateFormatted = this.formatDate(this.date)
      },
      dateFormatted(){ 
        this.$emit('update', this.dateFormatted)
      },
      statusFormatted(){ 
        this.$emit('updates', this.statusFormatted)
      },
    },

    methods: {
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}.${month}.${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [day, month, year] = date.split('.')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
    },
  }
</script>