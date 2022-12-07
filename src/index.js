import VTour from "./components/VTour.vue";

const VueJSTour = {
  install: (app, options) => {
    app.component("VTour", VTour);
  },
};
export default VueJSTour;
