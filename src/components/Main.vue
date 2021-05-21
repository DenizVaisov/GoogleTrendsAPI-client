<template>
  <div>
    <b-container>
      <b-row>
        <b-col class="mt-4">
          <b-form-input v-model="keyword" v-on:keyup.enter="relatedQueryies" type="search" placeholder="Введите ключевое слово..."></b-form-input>
        </b-col>
      </b-row>
      <b-row>
        <b-col v-for="(item, index) in rankedKeyword" :key="index" class="mt-3 mb-3" md="12">
          <apexchart width="1100" height="400" type="line" :options="options" :series="series"></apexchart>
          <b-card-group deck>
            <b-card no-body header="Похожие запросы">
              <b-list-group v-for="(item1, index1) in item" :key="index1" flush>
                <b-list-group-item href="#">{{item1.query}}</b-list-group-item>
              </b-list-group>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Apexchart from 'vue-apexcharts'
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  name: 'Main',
  components: { Apexchart },
  computed: {
    ...mapGetters('user', {
      userProfile: 'userProfile'
    })
  },
  data() {
    return {
      rankedKeyword: {},
      keyword: "",
      options: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: []
        }
      },
      series: []
    }
  },
  mounted() {
  },
  methods: {
    relatedQueryies: function() {
      axios.get(`https://localhost:5001/api/related/${this.keyword}`).then(response => {
        if(response.status === 200 || response.status === 201) {
          this.rankedKeyword = response.data.default.rankedList[0];
          let rankedListKeyword = response.data.default.rankedList[0].rankedKeyword;
          console.log(this.rankedKeyword);

          let data = [];

          for(let item in rankedListKeyword) {
            this.options.xaxis.categories.push(rankedListKeyword[item].query);
            data.push(rankedListKeyword[item].value);
          }

          this.series.push({name: this.keyword, data: data});
          console.log(this.options.xaxis.categories);
          console.log(this.series.data);
        }
      });
    }
  }
}
</script>

<style>

</style>