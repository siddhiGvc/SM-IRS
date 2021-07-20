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
</style>

<template>
    <v-card>    <!-- -->
        <v-card-text class="px-0 pt-0 pb-2 content text-xs-center" v-show="visibleInputs || (visibleInputs.length + move.extruders.length)">
            <v-card-title class="py-2">
                <v-icon small class="mr-1"> mdi-information </v-icon> {{ $t('panel.status.caption') }}
            </v-card-title>
            <!-- Sensors -->
            <v-col align-content="left" no-gutters class="flex-nowrap">
                <v-divider class="my-2"></v-divider>
                <v-simple-table v-show="gpIn.length" dense>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">{{ $t('panel.laserStatus.parameter') }}</th>
                                <th class="text-left">{{ $t('panel.laserStatus.state') }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- DC Voltage Fault Out -->
                            <tr>
                                <td class="text-left"> {{LaserState[3]}} </td>
                                <td class="text-left"> {{ sensors.gpIn[6] ? (gpIn[5].value ? $t('OK') : $t('FAULT')) : $t('noValue') }} </td>
                            </tr>
                            <!-- Laser Ready Out -->
                            <tr>
                                <td class="text-left"> {{LaserState[0]}} </td>
                                <td class="text-left"> {{ sensors.gpIn[3] ? (gpIn[3].value ? $t('ON') : $t('OFF')) : $t('noValue') }} </td>
                            </tr>
                            <!-- Laser Indicator Out -->
                            <tr>
                                <td class="text-left"> {{LaserState[1]}} </td>
                                <td class="text-left"> {{ sensors.gpIn[4] ? (gpIn[4].value ? $t('ON') : $t('OFF')) : $t('noValue') }} </td>
                            </tr>
                            <!-- Over Temperature Fault -->
                            <tr>
                                <td class="text-left"> {{LaserState[2]}} </td>
                                <td class="text-left"> {{ sensors.gpIn[5] ? (gpIn[5].value ? $t('OK') : $t('FAULT')) : $t('noValue') }} </td>
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

        import { mapState, mapGetters } from 'vuex'
        import {isPrinting } from '../../store/machine/modelEnums.js'

        export default {
            computed: {
                ...mapState('settings', ['darkTheme']),
                ...mapState('machine/model', ['state']),
                ...mapGetters(['isConnected', 'uiFrozen']),
                ...mapState('machine/model', {
                    boards: state => state.boards,
                    fans: state => state.fans,
                    move: state => state.move,
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
                }
            },
            data() {
                return {
                    displayToolPosition: true,
                    LaserState: ["Laser Ready", "Laser Indicator", "Laser Temperature", "Laser Voltage"],
                }
                
            },
            methods: {
                isLaserSensorsPresent() {
                    return this.sensors.gpIn.length != 0;
                   // GpInputPort
                },

                formatGpInValue(values) {
                    if (values.length === 1) {
                        return values[0];
                    }
                    return values;
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
