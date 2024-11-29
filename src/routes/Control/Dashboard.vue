<template>
	<v-col>

		<!---
		<v-col xs="12" sm="8" md="8" lg="9" xl="9">
			<movement-panel class="mb-3"></movement-panel>

			<v-row v-if="isFFForUnset" class="my-3">
				<v-col sm="12" :md="(atxPower !== null) ? 9 : 12" :lg="(atxPower !== null) ? 9 : 12" :xl="(atxPower !== null) ? 10 : 12">
					<extrude-panel></extrude-panel>
				</v-col>

				<v-col v-if="atxPower !== null" md="3" lg="3" xl="2" align-self="center">
					<atx-panel></atx-panel>
				</v-col>
			</v-row>

			<v-row class="my-3">
				<v-col sm="12" :md="(!isFFForUnset && atxPower !== null) ? 9 : 12" :lg="(!isFFForUnset && atxPower !== null) ? 9 : 12" :xl="(!isFFForUnset && atxPower !== null) ? 10 : 12">
					<fan-panel></fan-panel>
				</v-col>

				<v-col v-if="!isFFForUnset && atxPower !== null" md="3" lg="3" xl="2" align-self="center">
					<atx-panel></atx-panel>
				</v-col>
			</v-row>
		</v-col>
		-->

		
		<v-row  >
			
			<v-col class="my-2" sm="4" md="4" lg="3" xl="3">
			<power-status > </power-status>
			</v-col>
			<!--
			<v-col class="mb-2" sm="4" md="4" lg="3" xl="3">
			<laser-ed-panel > </laser-ed-panel>
			</v-col>
			-->
			<v-col class="my-2" sm="4" md="4" lg="5" xl="5">
			<ir-heater-panel > </ir-heater-panel>
			</v-col>		
		<!--	<macro-list class="mb-3"></macro-list> -->
			
		</v-row>

		
	
		<v-row>
		
                <v-col class="my-2" sm="6" md="6" lg="5" xl="5">
                    <laser-dashboard class="mb-2"></laser-dashboard>
                </v-col>
                
                <v-col class="my-2" sm="4" md="4" lg="3" xl="3">
					<laser-control-panel > </laser-control-panel>
                </v-col>
           
		</v-row>

		

	

	</v-col>

	

</template>

<script>
'use strict'

import { mapState } from 'vuex'

import { registerRoute } from '..'

import { MachineMode } from '../../store/machine/modelEnums.js'

export default {
  
	computed: {
		...mapState('machine/model', {
			atxPower: state => state.state.atxPower,
			machineMode: state => state.state.machineMode
		}),
		isFFForUnset() {
			return !this.machineMode || (this.machineMode === MachineMode.fff);
		}
	},
	install() {
		// Register a route via Control -> Dashboard
		registerRoute(this, {
			Control: {
				Dashboard: {
					icon: 'mdi-view-dashboard',
					caption: 'menu.control.dashboard',
					path: '/'
				}
			}
		});
	}
}
</script>
