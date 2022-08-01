import { createApp } from 'vue';
import App from './App.vue';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import './index.css';

const app = createApp(App);

// register "Base" components
const requireComponent = require.context(
    './components',
    false,
    /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach((fileName) => {
    const componentConfig = requireComponent(fileName);

    const componentName = upperFirst(
        camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
    );

    app.component(componentName, componentConfig.default || componentConfig);
});

// add Datepicker
app.component('VueDatepicker', Datepicker);

app.mount('#app');
