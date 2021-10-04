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
                <v-icon small class="mr-1">mdi-information </v-icon> {{ $t('panel.lasered.caption') }}
            </v-card-title>
            <!-- Sensors -->
            <v-col align-content="left" no-gutters class="flex-nowrap">
                <v-divider class="my-2"></v-divider>
                <v-simple-table v-show="gpIn.length" dense>
                    <template v-slot:default>
                        <!--<thead>
                            <tr>
                                <th class="text-left">{{ $t('panel.lasered.name') }}</th>
                                <th class="text-center">{{ $t('State') }}</th>
                            </tr>
                        </thead>
-->
                        
                        <tbody>
                            <!-- PS_0-->
                            <tr>
                                <td class="text-left"> {{powerStatus[0]}} </td>
                            <!--    <td class="text-left"> {{ gpIn[0] ? (gpIn[0].value ? $t('OFF') : $t('ON')) : $t('generic.noValue') }} </td> -->
                                <td>
                                    <v-btn-toggle :value="false" @change="togglePower" mandatory>
                                        <v-btn text :value="true" elevation="1" :disabled="uiFrozen" :loading="sendingCode" @click="togglePower(true)">
                                            {{ $t('ENABLE') }}
                                        </v-btn>
                                        <v-btn text :value="false" elevation="1" :disabled="uiFrozen" :loading="sendingCode" @click="togglePower(false)">
                                            {{ $t('DISABLE') }}
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
                powerStatus: ["State"],
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
            async togglePower(state) {
                if (!this.sendingCode) {
                    this.sendingCode = true;
                    try {
                        await this.sendCode(state ? 'M1101'  : 'M1102 ' );
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
