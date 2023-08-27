<template>
    <div class="py-12 bg-stone-100 min-h-screen">
        <div
            class="container mx-auto bg-white/50 rounded-xl shadow-lg px-4 py-12"
        >
            <form @submit.prevent="submitHandler">
                <form-fields-group title="Основные данные">
                    <div
                        class="max-w-[800px] grid grid-cols-4 gap-x-7.5 w-fit mx-auto"
                    >
                        <component
                            :is="`Base${field.component}`"
                            v-for="(field, idx) of fields['main-info']"
                            :key="idx"
                            :name="field.name"
                            :type="field.type"
                            :label="field.label"
                            :placeholder="field.placeholder || field.label"
                            v-model="field.value"
                            @update:modelValue="inputHandler(field)"
                            @blur="blurHandler(field)"
                            :error="errors[field.name] || ''"
                        />
                    </div>
                </form-fields-group>
                <div class="grid grid-cols-2 gap-10 mt-24">
                    <form-fields-group
                        class="shadow-inner p-4 rounded border border-solid border-black/10"
                        title="Исполнитель"
                    >
                        <div
                            class="mb-6 last:mt-0"
                            :class="{
                                'grid grid-cols-2 gap-x-5 gap-y-2.5':
                                    subfields.length >= 2,
                            }"
                            v-for="(subfields, idx) in fields['executor-info']"
                            :key="idx"
                        >
                            <component
                                :is="`Base${field.component}`"
                                v-for="(field, id) of subfields"
                                :key="id"
                                :name="field.name"
                                :type="field.type"
                                :label="field.label"
                                :placeholder="field.placeholder || field.label"
                                v-model="field.value"
                                @update:modelValue="inputHandler(field)"
                                @blur="blurHandler(field)"
                                :error="errors[field.name] || ''"
                            />
                        </div>
                    </form-fields-group>

                    <form-fields-group
                        class="shadow-inner p-4 rounded border border-solid border-black/10"
                        title="Заказчик"
                    >
                        <div
                            class="mb-6 last:mt-0"
                            :class="{
                                'grid grid-cols-2 gap-x-5 gap-y-2.5':
                                    subfields.length >= 2,
                            }"
                            v-for="(subfields, idx) in fields['client-info']"
                            :key="idx"
                        >
                            <component
                                :is="`Base${field.component}`"
                                v-for="(field, id) of subfields"
                                :key="id"
                                :name="field.name"
                                :type="field.type"
                                :label="field.label"
                                :placeholder="field.placeholder || field.label"
                                v-model="field.value"
                                @update:modelValue="inputHandler(field)"
                                @blur="blurHandler(field)"
                                :error="errors[field.name] || ''"
                            />
                        </div>
                    </form-fields-group>
                </div>
                <form-fields-group title="Пункты договора" class="mt-24">
                    <div
                        class="mb-6 last:mt-0"
                        :class="{
                            'grid grid-cols-4 gap-x-5 items-end gap-y-2.5':
                                subfields.length >= 2,
                        }"
                        v-for="(subfields, idx) in fields['contract-items']"
                        :key="idx"
                    >
                        <component
                            :is="`Base${field.component}`"
                            v-for="(field, id) of subfields"
                            :key="id"
                            :name="field.name"
                            :type="field.type"
                            :placeholder="field.placeholder || field.label"
                            :label="field.label"
                            v-model="field.value"
                            @update:modelValue="inputHandler(field)"
                            @blur="blurHandler(field)"
                            :error="errors[field.name] || ''"
                        />
                    </div>
                </form-fields-group>

                <form-fields-group title="Заказ" class="mt-24">
                    <div
                        class="mb-6 last:mt-0"
                        v-for="(subfields, key) in fields['order-info']"
                        :class="{
                            'grid grid-cols-3 gap-x-5 max-w-[60%] mx-auto':
                                key === 'order-main',
                            'grid grid-cols-4 gap-x-5 gap-y-2.5':
                                key === 'order-stage',
                            'grid grid-cols-4 gap-x-5 items-start gap-y-2.5':
                                subfields.length >= 2 &&
                                key !== 'order-main' &&
                                key !== 'order-stage',
                        }"
                        :key="key"
                    >
                        <template v-if="key === 'order-stage'">
                            <p
                                class="text-center mx-auto font-bold col-start-1 col-end-5"
                            >
                                Этапы, сроки и стоимость выполнения Работ
                            </p>
                            <template
                                v-for="(items, index) of subfields"
                                :key="index"
                            >
                                <component
                                    :is="`Base${field.component}`"
                                    v-for="(field, id) of items"
                                    :key="id"
                                    :name="field.name"
                                    :type="field.type"
                                    :placeholder="
                                        field.placeholder || field.label
                                    "
                                    :label="field.label"
                                    v-model="field.value"
                                    @blur="blurHandler(field)"
                                />
                            </template>
                        </template>
                        <component
                            v-else
                            :is="`Base${field.component}`"
                            v-for="(field, id) of subfields"
                            :key="id"
                            :name="field.name"
                            :type="field.type"
                            :placeholder="field.placeholder || field.label"
                            :label="field.label"
                            v-model="field.value"
                            @update:modelValue="inputHandler(field)"
                            @blur="blurHandler(field)"
                            :error="errors[field.name] || ''"
                        />
                        <span
                            class="px-4 py-2 text-center block rounded-lg border cursor-pointer border-solid border-black/10 shadow-inner font-medium hover:bg-stone-200 transition-all col-start-2 col-end-4"
                            v-if="key === 'order-stage'"
                            @click="duplicateFields(subfields)"
                        >
                            Добавить
                        </span>
                    </div>
                </form-fields-group>
                <div class="flex w-full justify-center">
                    <BaseButton
                        v-if="downloadUrl"
                        :url="downloadUrl"
                        :download="true"
                        text="Скачать"
                    />
                    <BaseButton text="Отправить" v-if="!downloadUrl" />
                </div>
                <p
                    class="text-center text-red-600 py-2 mx-auto"
                    v-if="formError"
                >
                    {{ formError }}
                </p>
            </form>
        </div>
    </div>
</template>

<script>
import FormFieldsGroup from '@/components/FormFieldsGroup';
// import Editor from '@tinymce/tinymce-vue';
import { defineProperty } from '@/utils/defineProperty';
import { createDocument } from '@/api/api';
import isUndefined from 'lodash/isUndefined';
import isString from 'lodash/isString';

export default {
    name: 'App',
    components: { FormFieldsGroup /*, editor: Editor*/ },
    data() {
        return {
            fields: require('@/settings-jsons/contract.json'),
            // content: '',
            downloadUrl: '',
            formError: '',
            errors: {},
        };
    },
    computed: {},
    methods: {
        inputHandler(field) {
            if (isUndefined(field.validations)) {
                return;
            }

            this.validate(field);
        },

        blurHandler(field) {
            this.saveData();
            this.validate(field);
        },

        validate(field) {
            let error;

            if (field.validations.required) {
                error = this.requiredValidate(field.value);
            }

            if (!error && field.validations.type === 'string') {
                error = this.stringValidate(field.value);
            }

            if (!error && field.validations.type === 'number') {
                error = this.numberValidate(field.value);
            }

            if (!error) {
                if (Object.keys(this.errors).find((f) => f === field.name)) {
                    delete this.errors[field.name];
                    return;
                }
                return;
            }

            this.errors[field.name] = error;
        },

        requiredValidate(value) {
            return value.trim() === '' ? '*Обязательно' : false;
        },

        stringValidate(value) {
            return !isString(value) ? 'Ожидается строка' : false;
        },

        numberValidate(value) {
            return isNaN(Number(value)) ? 'Ожидается число' : false;
        },

        checkValidates(instance) {
            if (Array.isArray(instance)) {
                //TODO: fix it work around if possible
                if (Array.isArray(instance.at(0))) {
                    return;
                }
                //TODO: end

                instance.forEach((item) => this.checkValidates(item));
                return;
            }

            if (typeof instance === 'object') {
                if (isUndefined(instance.value) || isUndefined(instance.name)) {
                    Object.values(instance).forEach((item) =>
                        this.checkValidates(item)
                    );
                    return;
                }
            }

            this.validate(instance);
        },

        async submitHandler(e) {
            e.preventDefault();

            this.checkValidates(this.fields);

            if (Object.keys(this.errors).length) {
                this.formError =
                    'Ошибка. Проверьте правильность заполнения данных';
                return;
            }

            if (this.formError) {
                this.formError = '';
            }

            const staticFields = {};
            this.getStaticValues(this.fields, staticFields);

            const collections = {};
            const orderStages = [];
            const currentArr = this.fields['order-info']['order-stage'];
            currentArr.forEach((item) => {
                const newItem = {};
                item.forEach((i, idx) => {
                    defineProperty(
                        newItem,
                        currentArr.at(0).at(idx)['name'],
                        i.value
                    );
                });

                orderStages.push(newItem);
            });
            collections['orderStage'] = orderStages;

            const objectToSend = {
                staticFields,
                collections,
                contractTasks: this.content,
            };

            const request = await createDocument(objectToSend);

            if (await request.success) {
                const origin = new URL(window.location.href).origin;
                this.downloadUrl = `${origin}/${request['file_name']}`;
                return;
            }

            this.formError = 'Ошибка. Попробуйте позже';
        },

        duplicateFields(currentArr) {
            currentArr.push([
                ...currentArr[0].map((c) => {
                    const newElem = Object.assign({}, c);
                    newElem.value = '';
                    return newElem;
                }),
            ]);
        },

        getStaticValues(instance, sourceObject) {
            if (Array.isArray(instance)) {
                //TODO: fix it work around if possible
                if (Array.isArray(instance.at(0))) {
                    return;
                }
                //TODO: end

                instance.forEach((item) =>
                    this.getStaticValues(item, sourceObject)
                );
                return;
            }

            if (typeof instance === 'object') {
                if (isUndefined(instance.value) || isUndefined(instance.name)) {
                    Object.values(instance).forEach((item) =>
                        this.getStaticValues(item, sourceObject)
                    );
                    return;
                }
            }

            defineProperty(sourceObject, instance.name, instance.value);
        },

        saveData() {
            window.localStorage.setItem(
                'contract-data',
                JSON.stringify(this.fields)
            );
        },
    },

    created() {
        if (window.localStorage.getItem('contract-data')) {
            this.fields = Object.assign(
                this.fields,
                JSON.parse(window.localStorage.getItem('contract-data'))
            );
        }
    },
};
</script>

<style></style>
