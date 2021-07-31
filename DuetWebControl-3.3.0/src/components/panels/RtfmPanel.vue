<template>
  <div>
    <button @click="getvalues">load values</button>
    <p>{{values}}</p>
  </div>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      values: [],
      timer: ''
    };
  },

  created() {
    this.fetchEventsList();
    this.timer = setInterval(this.fetchEventsList, 1000);
  },

  methods: {

      getvalues(){
        axios
        .get("http://192.168.0.22/PP/values")
        .then((response) => {
          console.log(response.data);
          this.values = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      },
    fetchEventsList() {
        this.getvalues();
     
    },
  
  },
};
</script>


<style scoped>
</style>