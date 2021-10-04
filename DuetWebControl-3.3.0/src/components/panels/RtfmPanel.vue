<template>
  <v-row>
   
    
  <!--
  <table >
    <caption>PISTON PUMP</caption>
    <div v-for="value in values" :key="value.id">
    <tr>
        <th scope="col">Piston Pump</th>
        <th scope="col">Material Name</th>
        <th scope="col">Height in MM</th>
        <th scope="col">Utime</th>
        
    </tr>
    <tr>
        <td >{{ value.ppId }}</td>
        <td> {{ value.ppMaterialName }}</td>
        <td>{{ value.ppQty }}</td>
        <td>{{ value.ppUtime }}</td>

    </tr>
    </div>
  </table>
  -->
    <!--
      <div v-for="value in values" :key="value.id">
        <v-col>
        <v-card>
        <h4>Piston Pump {{ value.ppId }}</h4>
        <h4>Material Name {{ value.ppMaterialName }}</h4>
        <progress-bar :value="value.ppQty" />
        <h4>PP Qty in MM {{ value.ppQty }}</h4>
        <h4>Utime {{ value.ppUtime }}</h4>
        </v-card>
        </v-col>
      </div>
    -->
  </v-row>
</template>


<script>
import ProgressBar from "../../components/progressbar/ProgressBar.vue";

import ProgressBarCylinder from '../progressbar/ProgressBarCylinder.vue';
import ProgressBarBattery from '../progressbar/ProgressBarBattery.vue';
import ProgressBarLine from '../progressbar/ProgressBarLine.vue';
import axios from "axios";
export default {
  data() {
    return {
      values: [],
      timer: "",
    };
  },

  created() {
   // this.fetchEventsList();
   // this.timer = setInterval(this.fetchEventsList, 1000);
  },

  components: {
    ProgressBar,
   ProgressBarCylinder,
    ProgressBarBattery,
    ProgressBarLine,
  },
  
options: {
  text: {
    color: '#FFFFFF',
    shadowEnable: true,
    shadowColor: '#000000',
    fontSize: 14,
    fontFamily: 'Helvetica',
    dynamicPosition: false,
    hideText: false
  },
  progress: {
    color: '#2dbd2d',
    backgroundColor: '#333333',
    inverted: false
  },
  layout: {
    height: 35,
    width: 140,
    verticalTextAlign: 61,
    horizontalTextAlign: 43,
    zeroOffset: 0,
    strokeWidth: 30,
    progressPadding: 0,
    type: 'cylinder'
  }
},
  methods: {
    getvalues() {
      axios
        .get("/Raspberry/PistonPump")
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