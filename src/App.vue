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
                                v-model="$root[field.name]"
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
                        />
                        <span
                            class="px-4 py-2 text-center block rounded-lg border cursor-pointer border-solid border-black/10 shadow-inner font-medium hover:bg-stone-200 transition-all col-start-2 col-end-4"
                            v-if="key === 'order-stage'"
                            @click="duplicateOrderStageFields"
                        >
                            Добавить
                        </span>
                    </div>
                </form-fields-group>

                <BaseButton text="Отправить" />
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
        };
    },
    computed: {},
    methods: {
        async submitHandler() {
            const staticFields = this.getAllStaticFields();

            const orderStages = [];
            const currentArr = this.fields['order-info']['order-stage'];
            currentArr.forEach((item, index) => {
                const newItem = {
                    orderStageId: index + 1,
                };
                item.forEach((i, idx) => {
                    defineProperty(
                        newItem,
                        currentArr.at(0).at(idx)['name'],
                        i.value
                    );
                });

                orderStages.push(newItem);
            });

            const objectToSend = {
                staticFields,
                orderStages,
            };

            const request = await createDocument(objectToSend);

            console.log(await request);
        },
        duplicateOrderStageFields() {
            this.fields['order-info']['order-stage'].push([]);

            const fieldsArray = this.fields['order-info']['order-stage'][0];

            for (let item of fieldsArray) {
                const copiedItem = Object.assign({}, item);

                if (this.fields['order-info']['order-stage'].length > 2) {
                    copiedItem.name = `${copiedItem.name}${
                        this.fields['order-info']['order-stage'].length - 1
                    }`;
                } else {
                    copiedItem.name += 1;
                }

                copiedItem.value = '';

                this.fields['order-info']['order-stage']
                    .at(-1)
                    .push(copiedItem);
            }
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
    },
};
</script>

<style></style>
