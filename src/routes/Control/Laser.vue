<template>
    <v-card class="flex-wrap">
        <v-card-title class="pb-1">
            <v-icon small class="mr-1">mdi-wrench</v-icon> {{ $t('panel.laserControles.caption') }}
        </v-card-title>
        <v-col>
            <v-checkbox v-model="laserControl" label="Controls" color="primary" hide-details class="shrink mr-2 mt-0"> </v-checkbox>
        </v-col>
            <v-row>
                <v-col>
                    <laser-dashboard class="mb-2"></laser-dashboard>
                </v-col>
                
                <v-col>
                    <laser-control-panel v-show="laserControl" class="mb-2"> </laser-control-panel>
                </v-col>
            </v-row>
    </v-card>
</template>

<script>
    'use strict'
    import { mapState, mapGetters, mapActions } from 'vuex'
    import { registerRoute } from '..'

    export default {
        data()
        {
            return {
                laserControl: false,
            }
        },
        install() {
            // Register a route via Control -> laser
            registerRoute(this, {
                Control: {
                    Laser: {
                        icon: 'mdi-exclamation',
                        caption: 'menu.control.laser',
                        path: '/LaserControl'
                    }
                }
            });
        },
        computed: {
            ...mapGetters(['isConnected']),
            ...mapState('machine/model', ['sensors']),
            ...mapState('machine/model', ['state'])      // machine state

        },
        methods: {
            ...mapActions('machine', ['sendCode']),
        },
    };
    
</script>

<!--<v-icon class="mr-1">{{ isAtxOn ? 'mdi-play' : 'mdi-stop' }}</v-icon> {{ pauseResumeText }}-->
<!-- Laser Module Enable/Disable
     1) Laser power supply on/off
     2) Tickle pulse on/off
     3) Laser operation enable disable -->
<!-- Laser On/Off
     1) Laser enable/disable        //should not to add
     2) Laser power set(W & input should be in list power) -> duty cycle-->
