<template>
  <div>
    <button @click="getvalues">load values</button>
  <div v-for="value in values" :key="value.id">
    <h4>Piston Pump       {{value.ppId}}</h4>
    <h4>Material Name     {{value.ppMaterialName}}</h4>
    <h4>PP Qty in MM      {{value.ppQty}}</h4>
    <h4>Utime             {{value.ppUtime}}</h4>
    <hr/>
    </div>
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
        .get('/Raspberry/PistonPump')
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