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
                            @blur="saveData"
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
                                @blur="saveData"
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
                                @blur="saveData"
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
                            @blur="saveData"
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
                                    @blur="saveData"
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
                            @blur="saveData"
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
                    <BaseButton text="Отправить" />
                </div>
                <p
                    class="text-center text-red-600 py-2 mx-auto"
                    v-if="!successSubmit"
                >
                    Ошибка. Попробуйте позже
                </p>
            </form>
        </div>
    </div>
</template>

<script>
import FormFieldsGroup from '@/components/FormFieldsGroup';
import { defineProperty } from '@/utils/defineProperty';
import { createDocument } from '@/api/api';

export default {
    name: 'App',
    components: { FormFieldsGroup },
    data() {
        return {
            fields: require('@/settings-jsons/contract.json'),
            downloadUrl: '',
            successSubmit: true,
        };
    },
    computed: {},
    methods: {
        async submitHandler() {
            const staticFields = this.getAllStaticFields();

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
            };

            console.log(objectToSend);

            const request = await createDocument(objectToSend);

            if (await request.success) {
                this.downloadUrl = `/${request['file_name']}`;
                return;
            }

            this.successSubmit = false;
        },
        duplicateFields(currentArr) {
            currentArr.push([
                ...currentArr[0].map((c) => Object.assign({}, c)),
            ]);
        },
        getAllStaticFields() {
            const allValues = {};
            this.getStaticValues(this.fields, allValues);
            return allValues;
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
                if (
                    instance.value === undefined ||
                    instance.name === undefined
                ) {
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
            this.fields = JSON.parse(
                window.localStorage.getItem('contract-data')
            );
        }

        console.log(this.fields);
    },
};
</script>

<style></style>
