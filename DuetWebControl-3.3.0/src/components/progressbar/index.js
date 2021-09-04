

import Vue from 'vue'

import ProgressBar from './ProgressBar.vue'
import ProgressBarBattery from './ProgressBarBattery'
import ProgressBarCircle from './ProgressBarCircle'
import ProgressBarCylinder from './ProgressBarCylinder'
import ProgressBarLine from './ProgressBarLine'

Vue.component('ProgressBar', ProgressBar)
Vue.component('ProgressBarBattery',ProgressBarBattery)
Vue.component('ProgressBarCircle',ProgressBarCircle)
Vue.component('ProgressBarCylinder',ProgressBarCylinder)
Vue.component('ProgressBarLine',ProgressBarLine)

export { ProgressBar }
export {ProgressBarBattery}
//export default ProgressBar
