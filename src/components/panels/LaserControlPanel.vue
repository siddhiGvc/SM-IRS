<style scoped>
.v-btn-toggle {
  display: flex;
}

.v-btn-toggle > button {
  display: flex;
  flex: 1 1 auto;
}

.v-btn-toggle {
  flex-direction: row;
}
</style>
<template>
  <v-card>
    <v-card-text class="px-0 pt-0 pb-2 content text-xs-center">
      <v-card-title class="py-2">
        <v-icon small class="mr-1"> mdi-laser-pointer </v-icon>
        {{ $t("panel.laserControles.caption1") }}
      </v-card-title>
      <v-col>
        <v-col>
          <v-simple-table>
            <tbody>
              <!-- PS_0-->
              <tr>
                <td class="text-left">State</td>
                <!--    <td class="text-left"> {{ gpIn[0] ? (gpIn[0].value ? $t('OFF') : $t('ON')) : $t('generic.noValue') }} </td> -->
                <td>
                  <v-btn-toggle :value="false" @change="togglePower" mandatory>
                    <v-btn
                      text
                      :value="true"
                      elevation="1"
                      :disabled="uiFrozen"
                      :loading="sendingCode"
                      @click="toggleState(true)"
                    >
                      {{ $t("ENABLE") }}
                    </v-btn>
                    <v-btn
                      text
                      :value="false"
                      elevation="1"
                      :disabled="uiFrozen"
                      :loading="sendingCode"
                      @click="toggleState(false)"
                    >
                      {{ $t("DISABLE") }}
                    </v-btn>
                  </v-btn-toggle>
                </td>
              </tr>
            </tbody>
          </v-simple-table>

          <v-divider class="my-6"></v-divider>

          <v-checkbox
            v-model="laserEnable"
            label="Laser - Manual control"
            color="primary"
            hide-details
            @click="check(laserEnable)"
            class="shrink mr-2 mt-0"
          >
          </v-checkbox>
        <!--
          <v-text-field
            v-model="laserPower"
            :disabled="!laserEnable"
            :rules="newRules"
            label="Enter Power"
            suffix="W"
          >
          </v-text-field>
        -->
    
        </v-col>
        <v-col >
           <v-text-field
            v-model="laserPower"
            :disabled="!laserEnable"
            :rules="newRules"
            label="Enter Power"
            suffix="W"
          >
          </v-text-field>     

          <v-btn-toggle mandatory>
            <v-btn
              text
              :value="true"
              :disabled="!laserEnable"
              :loading="sendingCode"
              @click="togglePower(true)"
            >
              {{ $t("panel.laserControles.laserEnable") }}
            </v-btn>
            <v-btn
              text
              :value="false"
              :disabled="!laserEnable"
              :loading="sendingCode"
              @click="togglePower(false)"
            >
              {{ $t("panel.laserControles.laserDisable") }}
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-col>
    </v-card-text>
  </v-card>
</template>

<script>
"strict";

import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    laserEnable: false,
    laserPower: 0.0,
    newRules: [
      (value) => (value && value <= 25) || "25W is Max Power",
      (value) => (value && !isNaN(value)) || "Enter Valid Power",
    ],
    sendingCode: false,
  }),
  computed: {
    ...mapGetters(["isConnected", "uiFrozen"]),
    ...mapState("machine/model", ["sensors"]),
    ...mapState("machine/model", ["state"]), // machine state
    ...mapState("machine/model", {
      gpIn: (state) => state.sensors.gpIn,
    }),
  },
  methods: {
    ...mapActions("machine", ["sendCode"]),
    check: async function (laserEnable) {
      if (!this.sendingCode) {
         this.sendingCode = true;
        try {
            await this.sendCode(laserEnable ? 'M1103' : 'M1103');         //P8 has enable pin
          if (laserEnable == false) {
            //if the state goes to false state disable the laser
            this.laserEnable = false;
          }
          //     console.log("value at 3", this.sensors.gpIn[3].value)
        } catch (e) {
          // handled before we get here
        }

        this.sendingCode = false;
      }
    },
    visibleInputs() {
      return this.sensors.gpIn.filter((gpIn) => gpIn.value);
    },

    async toggleState(state) {
      if (!this.sendingCode) {
        this.sendingCode = true;
        try {
          await this.sendCode(state ? "M1101" : "M1102 ");
        } catch (e) {
          // handled before we get here
        }
        this.sendingCode = false;
      }
    },

    async togglePower(state) {
      if (!this.sendingCode) {
        this.sendingCode = true;
        try {
          // if state == false then turn off the check also
          //   console.log("filter the gpIn data",this.sensors.gpIn.filter(gpIn => gpIn.value));

          console.log("Print laser power", this.laserPower);
          this.pow = 255 * this.laserPower; //see spellCheck
          this.pow = this.pow / 25;
          // 25 is laser power
          await this.sendCode(state ? "M1105 S" + this.pow : "M1103"); //add for fire and off state will be full off
        } catch (e) {
          // handled before we get here
        }
        this.sendingCode = false;
      }
    },
  },
};
</script>