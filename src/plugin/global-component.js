import { defineAsyncComponent } from "vue";

const LayoutMain = defineAsyncComponent(() =>
    import("../layouts/LayoutMain.vue"),
);
const Input = defineAsyncComponent(() =>
    import("../components/FormControl.vue"),
);
const InputField = defineAsyncComponent(() =>
    import("../components/FormField.vue"),
);
const Btn = defineAsyncComponent(() =>
    import("../components/BaseBtn.vue"),
);
const mdicon = defineAsyncComponent(() =>
    import("../components/BaseIcon.vue"),
);

export const globalcomponent = (app) => {
    app.component("LayoutMain", LayoutMain);
    app.component("Input", Input);
    app.component("InputField", InputField);
    app.component("Btn", Btn);
    app.component("mdicon", mdicon);
};
