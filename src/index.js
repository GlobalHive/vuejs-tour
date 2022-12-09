import VTour from "./components/VTour.vue";
import "./style/style.scss";

export default{
  install: (app, options) => {
    app.component("VTour", VTour);
  },
};
