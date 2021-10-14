<style scoped>
    strong {
        align-self: center;
        text-align: center;
    }

    .category-header {
        flex: 0 0 100px;
    }

    a:not(:hover) {
        color: inherit;
    }

    .content span,
    .content strong {
        padding-left: 8px;
        padding-right: 8px;
    }

    .probe-span {
        border-radius: 5px;
    }

        .probe-span:not(:last-child) {
            margin-right: 8px;
        }

    .v-btn-toggle {
        display: flex;
    }
    .v-btn-toggle > button {
	display: flex;
	flex: 1 1 auto;

    }
    .v-btn-toggle {
        flex-direction: row
    }
</style>

<template>
    <v-card>
        <!-- -->
        <v-card-text class="px-0 pt-0 pb-2 content text-xs-center" v-show="visibleInputs || (visibleInputs.length + move.extruders.length)">
            <!--<v-card-title  class="pb-1">-->
            <v-card-title>
                <v-icon small class="mr-1">mdi-information </v-icon> {{ $t('panel.irheater.caption') }}
            </v-card-title>
            <!-- Sensors -->
            <v-col align-content="left" no-gutters class="flex-nowrap">
                <v-divider class="my-2"></v-divider>
                <v-simple-table v-show="gpIn.length" dense>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">{{ $t('panel.irheater.name') }}</th>
                              <!--  <th class="text-left">{{ $t('panel.irheater.status') }}</th> --> 
                                <th class="text-center">{{ $t('Control') }}</th>
                                <th class="text-left">{{ $t('panel.irheater.name') }}</th>
                              <!--  <th class="text-left">{{ $t('panel.irheater.status') }}</th> --> 
                                <th class="text-center">{{ $t('Control') }}</th>
                            </tr>
                        </thead>

                        <!-- IRH_1-->
                        <tbody>
                            <tr>
                               <td class="text-left"> {{irheaterStatus[0]}} </td> 
                            <!--    <td class="text-left"> {{ IRH1 ? (IRH1.value ? $t('OFF') : $t('ON')) : $t('generic.noValue') }} </td>-->
                                <td>
                                    <v-btn-toggle color="primary" :value="false"  id="IR1" @change="togglePower" mandatory>
                                        <v-btn text :value="true" elevation="1" :disabled="uiFrozen" :loading="sendingCode" @click="togglePower(true, 1)">
                                            {{ $t('ON') }}
                                        </v-btn>
                                        <v-btn text :value="false" elevation="1" :disabled="uiFrozen" :loading="sendingCode" @click="togglePower(false, 1)">
                                            {{ $t('OFF') }}
                                        </v-btn>
                                    </v-btn-toggle>
                                </td>

                                 <td class="text-left"> {{irheaterStatus[4]}} </td> 
                                <!--    <td class="text-left"> {{ IRH1 ? (IRH1.value ? $t('OFF') : $t('ON')) : $t('generic.noValue') }} </td>-->
                                <td>
                                    <v-btn-toggle color="primary" :value="false"  id="IR1" @change="togglePower" mandatory>
                                        <v-btn text :value="true" elevation="1" :disabled="uiFrozen" :loading="sendingCode" @click="togglePower(true, 5)">
                                            {{ $t('ON') }}
                                        </v-btn>
                                        <v-btn text :value="false" elevation="1" :disabled="uiFrozen" :loading="sendingCode" @click="togglePower(false, 5)">
                                            {{ $t('OFF') }}
                                        </v-btn>
                                    </v-btn-toggle>
                                </td>


                            </tr>
                        <!-- IRH_2-->
                            <tr>
                                <td class="text-left"> {{irheaterStatus[1]}} </td>
                            <!--    <td class="text-left"> {{ gpIn[1] ? (gpIn[1].value ? $t('OFF') : $t('ON')) : $t('generic.noValue') }} </td> -->
                                <td>
                                    <!--gpIn[1].value-->
                                    <v-btn-toggle color="primary" :value="false" @change="togglePower" mandatory>
                                        <v-btn text :value="true" elevation="1" :disabled="uiFrozen" :loading="sendingCode" @click="togglePower(true, 2)">
                                            {{ $t('ON') }}
                                        </v-btn>
                                        <v-btn text :value="false" elevation="1" :disabled="uiFrozen" :loading="sendingCode" @click="togglePower(false, 2)">
                                            {{ $t('OFF') }}
                                        </v-btn>
                                    </v-btn-toggle>
                                </td>

                                <td class="text-left"> {{irheaterStatus[5]}} </td> 
                                <!--    <td class="text-left"> {{ IRH1 ? (IRH1.value ? $t('OFF') : $t('ON')) : $t('generic.noValue') }} </td>-->
                                <td>
                                    <v-btn-toggle color="primary" :value="false"  id="IR1" @change="togglePower" mandatory>
                                        <v-btn text :value="true" elevation="1" :disabled="uiFrozen" :loading="sendingCode" @click="togglePower(true, 6)">
                                            {{ $t('ON') }}
                                        </v-btn>
                                        <v-btn text :value="false" elevation="1" :disabled="uiFrozen" :loading="sendingCode" @click="togglePower(false, 6)">
                                            {{ $t('OFF') }}
                                        </v-btn>
                                    </v-btn-toggle>
                                </td>



                            </tr>
                         <!-- IRH_2-->
                            <tr>
                               <td class="text-left"> {{irheaterStatus[2]}} </td> 
                            <!--    <td class="text-left"> {{ gpIn[2] ? (gpIn[2].value ? $t('ON') : $t('OFF')) : $t('generic.noValue') }} </td> -->
                                <td>
                                    <!--gpIn[2].value-->
                                    <v-btn-toggle color="primary" :value="false" @change="togglePower" mandatory>
                                        <v-btn text :value="true" elevation="1" :disabled="uiFrozen" :loading="sendingCode" @click="togglePower(true, 3)">
                                            {{ $t('ON') }}
                                        </v-btn>
                                        <v-btn text :value="false" elevation="1" :disabled="uiFrozen" :loading="sendingCode" @click="togglePower(false, 3)">
                                            {{ $t('OFF') }}
                                        </v-btn>
                                    </v-btn-toggle>
                                </td>

                                <td class="text-left"> {{irheaterStatus[6]}} </td> 
                                <!--    <td class="text-left"> {{ IRH1 ? (IRH1.value ? $t('OFF') : $t('ON')) : $t('generic.noValue') }} </td>-->
                                <td>
                                    <v-btn-toggle color="primary" :value="false"  id="IR1" @change="togglePower" mandatory>
                                        <v-btn text :value="true" elevation="1" :disabled="uiFrozen" :loading="sendingCode" @click="togglePower(true, 7)">
                                            {{ $t('ON') }}
                                        </v-btn>
                                        <v-btn text :value="false" elevation="1" :disabled="uiFrozen" :loading="sendingCode" @click="togglePower(false, 7)">
                                            {{ $t('OFF') }}
                                        </v-btn>
                                    </v-btn-toggle>
                                </td>



                            </tr>
                         <!-- IRH_3-->
                            <tr>
                               <td class="text-left"> {{irheaterStatus[3]}} </td> 
                            <!--    <td class="text-left"> {{ gpIn[3] ? (gpIn[3].value ? $t('ON') : $t('OFF')) : $t('generic.noValue') }} </td> -->
                                <td>
                                    <!--gpIn[2].value-->
                                    <v-btn-toggle color="primary" :value="false" @change="togglePower" mandatory>
                                        <v-btn text :value="true" elevation="1" :disabled="uiFrozen" :loading="sendingCode" @click="togglePower(true, 4)">
                                            {{ $t('ON') }}
                                        </v-btn>
                                        <v-btn text :value="false" elevation="1" :disabled="uiFrozen" :loading="sendingCode" @click="togglePower(false, 4)">
                                            {{ $t('OFF') }}
                                        </v-btn>
                                    </v-btn-toggle>
                                </td>

                                <td class="text-left"> {{irheaterStatus[7]}} </td> 
                                <!--    <td class="text-left"> {{ IRH1 ? (IRH1.value ? $t('OFF') : $t('ON')) : $t('generic.noValue') }} </td>-->
                                <td>
                                    <v-btn-toggle color="primary" :value="false"  id="IR1" @change="togglePower" mandatory>
                                        <v-btn text :value="true" elevation="1" :disabled="uiFrozen" :loading="sendingCode" @click="togglePower(true, 8)">
                                            {{ $t('ON') }}
                                        </v-btn>
                                        <v-btn text :value="false" elevation="1" :disabled="uiFrozen" :loading="sendingCode" @click="togglePower(false, 8)">
                                            {{ $t('OFF') }}
                                        </v-btn>
                                    </v-btn-toggle>
                                </td>

                            </tr>   
                        </tbody>










                    </template>
                </v-simple-table>
            </v-col>

           


            <div v-show="!gpIn.length" class="mt-1 text-center">
                {{ $t('$vuetify.noDataText') }}
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
    'use strict'

    import { mapState, mapGetters, mapActions } from 'vuex'

    import { isPrinting } from '../../store/machine/modelEnums.js'

    export default {
        computed: {
            ...mapGetters(['uiFrozen']),
            ...mapState('settings', ['darkTheme']),
            ...mapState('machine/model', ['state']),
            ...mapState('machine/model', {
                boards: state => state.boards,
                fans: state => state.fans,
                move: state => state.move,
                gpOut: state => state.gpOut,
                sensors: state => state.sensors,
                gpIn: state => state.sensors.gpIn,
                status: state => state.state.status
            }),
            ...mapGetters(['isConnected']),
            sensorsPresent() {
                return ((this.boards.length && this.boards[0].vIn.current > 0) ||
                    (this.boards.length && this.boards[0].v12.current > 0) ||
                    (this.boards.length && this.boards[0].mcuTemp.current > -273) || (this.probesPresent));
            },

            visibleInputs() {
                return this.sensors.gpIn.filter(gpIn => gpIn.visible);
            },

        },
        data() {
            return {
                displayToolPosition: true,
                irheaterStatus: ["IRH1", "IRH2", "IRH3", "IRH4", "IRH5", "IRH6", "IRH7", "IRH8"],
                sendingCode: false,
            }

        },
        methods: {
            ...mapActions('machine', ['sendCode']),
            isLaserSensorsPresent() {
                return this.sensors.gpIn.length != 0;
                // GpInputPort
            },
           
//changes the '1' to 0
            formatGpInValue(values) {
                if (values.length === 0) {
                    return values[0];
                }
                return values;
            },
            async togglePower(state, index) {
                if (!this.sendingCode) {
                    this.sendingCode = true;
                    try {
                      //  console.log(this.state.gpOut[21].pwm);
                      //  console.log(this.state.gpOut[22].pwm);
                       // console.log(this.state.gpOut[23].pwm);
                        await this.sendCode(state ? 'M42 P' + (20 + index) + ' S1' : 'M42 P' + (20 + index) + ' S0');
                    } catch (e) {
                        // handled before we get here
                    }
                    this.sendingCode = false;
                }
            },

            probeSpanClasses(probe, index) {
                let result = [];
                if (index && this.sensors.probes.length > 1) {
                    result.push('ml-2');
                }
                if (!isPrinting(this.stats) && probe.value !== null) {
                    if (probe.value >= probe.threshold) {
                        result.push('red');
                        result.push(this.darkTheme ? 'darken-3' : 'lighten-4');
                    } else if (probe.value > probe.threshold * 0.9) {
                        result.push('orange');
                        result.push(this.darkTheme ? 'darken-2' : 'lighten-4');
                    }
                }
                return result;
            }
        }
    }
</script>
