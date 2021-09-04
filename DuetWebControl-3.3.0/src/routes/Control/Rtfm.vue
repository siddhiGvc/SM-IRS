<template>
  <v-card class="flex-wrap">
    <v-card-title class="pb-1">
      <v-icon small class="mr-1">mdi-wrench</v-icon>{{ $t("panel.rtfmpanel.caption") }}
    </v-card-title>
    <v-col>
     <rtfm-panel></rtfm-panel>
    </v-col>
    
  </v-card>
</template>

<script>
"use strict";
import { registerRoute } from "..";
//import RtfmPanel from '../../components/panels/RtfmPanel.vue';

export default {
 // components: { RtfmPanel },
  
  install() {
    // Register a route via Control -> laser
    registerRoute(this, {
      Control: {
        Rtfm: {
          icon: "mdi-beaker-plus-outline",
          caption: "menu.control.rtfm",
          path: "/RTFM",
        },
      },
    });
  },
};
</script>

