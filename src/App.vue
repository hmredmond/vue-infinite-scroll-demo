<template>
  <div id="app">
    <img src="./assets/logo.png">

    <md-card>
      <md-card-header>
        <div class="md-title">Material Design  / Infinite Scroll Table with Vue.js 2 Demo</div>
        <div>Scoll down to display more results </div>
      </md-card-header>
    </md-card>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <md-table>         
          <md-table-header>
            <md-table-row>
              <md-table-head>Name</md-table-head>
              <md-table-head>Age</md-table-head>
              <md-table-head>Email</md-table-head>
              <md-table-head>Company</md-table-head>
              <md-table-head>About</md-table-head>
              <md-table-head>Fruit</md-table-head>
            </md-table-row>
          </md-table-header>
          <md-table-body>
            <md-table-row  v-for="(item, index) in list" :key='index' >
              <md-table-cell md-label='icon' class="example-list-item logo"><img v-bind:src="item.picture"/></md-table-cell>
              <md-table-cell md-label='Name' class="example-list-item">{{item.name}}</md-table-cell>
              <md-table-cell md-label='Age' class="example-list-item">{{item.age}}</md-table-cell>
              <md-table-cell md-label='Email' class="example-list-item">{{item.email}}</md-table-cell>
              <md-table-cell md-label='Company' class="example-list-item">{{item.company}}</md-table-cell>
              <md-table-cell md-label='About' class="example-list-item">{{item.about}}</md-table-cell>
              <md-table-cell md-label='Fruit' class="example-list-item">{{item.favoriteFruit}}</md-table-cell>
            </md-table-row>
          </md-table-body>
        </md-table>
      </div>
  <div class='loading-status'>
      <div  v-show="isLoading">
        <slot name="spinner">
          <spinner></spinner>
        </slot>
      </div>
      <div class="infinite-status-prompt" v-show="isNoResults">
        <slot name="no-results">No results :(</slot>
      </div>
      <div class="infinite-status-prompt" v-show="isNoMore">
        <slot name="no-more">End of Data</slot>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from 'vue-simple-spinner'
import data from './assets/data/data.json'

export default {
  name: 'app',
  components: {
    Spinner
  },
  data: function () {
    return {
      list: [],
      isNoMore: false,
      isLoading: false,
      isNoResults: false,
      is_paused: false,
      spinner_line_fg_color: undefined,
      spinner_line_bg_color: undefined,
      spinner_size: 32,
      spinner_line_size: 3,
      spinner_speed: 0.6,
      spinner_spacing: 4,
      spinner_message: "I'll start changing in 4 seconds",
      spinner_text_fg_color: undefined,
      spinner_font_size: 13
    }
  },
  methods: {
    loadMore: function () {
      if (!this.isNoMore) {
        this.busy = true
        this.isLoading = true
        setTimeout(() => {
          if (this.list.length < 180) {
            this.busy = false
            this.isLoading = false
            this.getRequestByAjax()
          } else {
            this.isLoading = false
            this.isNoMore = true
          }
        }, 1000)
      }
    },
    getRequestByAjax: function () {
      var _self = this
      /* Get data using an ajax call or DB service */
      /* for demo, data is served from a static json file in the assets/data folder which is imported */
      _self.list = _self.list.concat(data)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

 body{
      margin: 0 auto;
      width: 90%;
      padding:50px;
    }
  .loading-status{
    padding:15px 0;
  }
    .example-list-item{
      font-size: 14px;
      line-height: 25px;
      color: #666;
      background-color: #fafafa;
      border-top: 1px solid #fff;
      border-bottom: 1px solid #e3e3e3;
      vertical-align: top;
      text-align:left;
    }
    .example-list-item{
      content: 'Line: ';
    }
</style>
