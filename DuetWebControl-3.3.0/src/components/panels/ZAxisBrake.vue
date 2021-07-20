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
		<v-card-title>
			<v-icon small class="mr-1">mdi-car-brake-alert</v-icon> {{ $t('panel.zbrake.caption') }}
		</v-card-title>

		<v-card-text class="pt-0">
			<v-row no-gutters class="mt-1">
				<v-col>
					<code-btn :code="`M42 P9 S0`" no-wait block>
						<v-icon>mdi-lock-outline</v-icon> {{ $t('panel.zbrake.lock') }}
					</code-btn>
				</v-col>

				<v-col>
					<code-btn :code="`M42 P9 S1`" no-wait block>
						<v-icon>mdi-lock-open-outline</v-icon> {{ $t('panel.zbrake.release') }}
					</code-btn>
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>
</template>

<script>
	'use strict'

	import { mapState, mapGetters, mapActions } from 'vuex'

	export default {
		computed: {
			...mapGetters(['uiFrozen']),
			...mapState('machine/model', ['state'])
		},
		data() {
			return {
				sendingCode: false
			}
		},
		methods: {
			...mapActions('machine', ['sendCode']),
			async toggleBrake(state) {
				if (!this.sendingCode) {
					this.sendingCode = true;
					try {
						await this.sendCode(state ? 'M42 P9 S1' : 'M42 P9 S0');
					} catch (e) {
						// handled before we get here
					}
					this.sendingCode = false;
				}
			}
		}
	}</script>
