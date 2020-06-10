import Vue from "vue";
import Router from "vue-router";
import Index from "@/components/Index";
import AddNote from "@/components/AddNote";
import EditNote from "@/components/EditNote";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Index",
      component: Index
    },
    {
      path: "/add-note",
      name: "AddNote",
      component: AddNote
    },
    {
      path: "/edit-note/:note_slug",
      name: "EditNote",
      component: EditNote
    }
  ]
});
