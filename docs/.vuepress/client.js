import { defineClientConfig } from '@vuepress/client'
import VTour from '../../src/components/VTour.vue'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component('VTour', VTour);
  },
  setup() {},
  rootComponents: [
    'VTour',
  ],
})
