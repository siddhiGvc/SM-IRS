<template>
	<v-row>
		<v-col xs="12" sm="8" md="8" lg="9" xl="9">
			<movement-panel class="mb-3"></movement-panel>
			<v-row>
				<v-col sm="4" md="4" lg="3" xl="3">
					<z-axis-brake></z-axis-brake>
				</v-col>
				<v-col sm="4" md="4" lg="3" xl="3">
					<z-babystep-panel></z-babystep-panel>
				</v-col>

			</v-row>
			<v-row class="my-3">
				<v-col sm="12" :md="(atxPower !== null) ? 9 : 12" :lg="(atxPower !== null) ? 9 : 12" :xl="(atxPower !== null) ? 10 : 12">
					<extrude-panel></extrude-panel>
				</v-col>

				<v-col v-if="atxPower !== null" md="3" lg="3" xl="2" align-self="center">
					<atx-panel></atx-panel>
				</v-col>
			</v-row>			
		</v-col>

		
		
	</v-row>

</template>

<script>'use strict'
import { registerRoute } from '..'
import ZAxisBrake from '../../components/panels/ZAxisBrake.vue';
import ZBabystepPanel from '../../components/panels/ZBabystepPanel.vue';
export default {
  components: { ZAxisBrake, ZBabystepPanel },
	install() {
		// Register a route via Control -> Console
		registerRoute(this, {
			Control: {
				Console: {
                    icon: 'mdi-elevator',
					caption: 'menu.control.movements',
					path: '/Movements'
				}
			}
		});
	}
}</script>