import VTour from "./components/VTour.vue";

export default{
  install: (app, options) => {
    app.component("VTour", VTour);
  },
};
