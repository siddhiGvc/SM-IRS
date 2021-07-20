<style scoped>
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
        <!-- 1. Tickle pulse state on/off 2. show frequency -->
        <v-card-title class="py-2">
            <v-icon small class="mr-1"> </v-icon> {{ $t('panel.ticklePulse.caption') }}
        </v-card-title>
        <v-col>
            <v-divider class="my-2"> </v-divider>
            <v-text>
                <span v-if="lSensorsPresent" class="d-flex flex-column align-center">
                    {{ $display(this.sensors.gpIn[4].value, 1, 'pwm (laser Indicator)') }}
                    {{ $display('value',1,full)}}
                    {{gpIn ? (this.sensors.gpIn[4].value ? $t('generic.yes') : $t('generic.no')) : $t('generic.noValue')}}
                </span>
            </v-text>   <!-- change value to sensors.gpOut[x].value or state--> <!-- suffix="ms"-->
            <v-text-field v-model="ticklePulse" :rules='textRules' label="Enter Tickle Pulse" suffix="ms"> </v-text-field>   <!-- set in ms convert in ms-->
            <v-btn-toggle :value="state.atxPower" @change="togglePower" mandatory>
                <v-btn text :value="true" :disabled="uiFrozen" :loading="sendingCode" @click="togglePulse(true)">
                    {{ $t('panel.ticklePulse.on') }}
                </v-btn>
                <v-btn text :value="false" :disabled="uiFrozen" :loading="sendingCode" @click="togglePulse(false)">
                    {{ $t('panel.ticklePulse.off') }}
                </v-btn>
            </v-btn-toggle>
</v-col>
    </v-card>
</template>

<script>
    'strict'
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        data: () => ({
            textRules: [
                value => (value && value <= 1) || 'Set upto 4% of actual power',
                value => (value && !isNaN(value)) || 'Enter Valid Value',           //valid tickle pulse
            ],
        }),
        computed: {
            ...mapGetters(['isConnected']),
            ...mapState('machine/model', ['sensors']),
            ...mapState('machine/model', ['state']),      // machine state
            gpIn: state => state.sensors.gpIn,
        },
        methods: {
            ...mapActions('machine', ['sendCode']),

            async togglePulse(state) {
                if (!this.sendingCode) {
                    this.sendingCode = true;
                    try {
                        if (this.ticklePulse == 'undefined' || this.ticklePulse == 0) {
                            await this.sendCode(state ? 'M50' : 'M51');     //add for fire and off state will be full off
                        } else {
                            this.res = 255 * this.ticklePulse;
                            this.res = this.res / 25;                                              //25 is maximum laser power 
                            await this.sendCode(state ? 'M571 T'+this.res : 'M571 T0');          //set the tickle pulse else turn it off
                        }
                    } catch (e) {
                        // handled before we get here
                    }
                    this.sendingCode = false;
                }
            }
        },
    }
</script>