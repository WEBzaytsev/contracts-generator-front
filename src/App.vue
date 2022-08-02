<template>
    <div class="py-12 bg-stone-100 min-h-screen">
        <div
            class="container mx-auto bg-white/50 rounded-xl shadow-lg px-4 py-12"
        >
            <form @submit="submit">
                <form-fields-group title="Основные данные">
                    <div
                        class="max-w-[800px] grid grid-cols-4 gap-x-7.5 w-fit mx-auto"
                    >
                        <component
                            :is="`Base${field.component}`"
                            v-for="field of mainFields"
                            :key="field.name"
                            :name="field.name"
                            :type="field.type"
                            :label="field.label"
                            :placeholder="field.placeholder || field.label"
                            v-model="$root[field.name]"
                            :error="errors[field.name]"
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
                            v-for="(subfields, idx) in executorFields"
                            :key="idx"
                        >
                            <component
                                :is="`Base${field.component}`"
                                v-for="field of subfields"
                                :key="field.name"
                                :name="field.name"
                                :type="field.type"
                                :label="field.label"
                                :placeholder="field.placeholder || field.label"
                                v-model="$root[field.name]"
                                :error="errors[field.name]"
                            />
                        </div>
                    </form-fields-group>

                    <form-fields-group
                        class="shadow-inner p-4 rounded border border-solid border-black/10"
                        title="Заказчик"
                    >
                        <div
                            class="mb-6 last:mt-0"
                            :class="
                                subfields.length >= 2
                                    ? 'grid grid-cols-2 gap-x-5 gap-y-2.5'
                                    : ''
                            "
                            v-for="(subfields, idx) in clientFields"
                            :key="idx"
                        >
                            <component
                                :is="`Base${field.component}`"
                                v-for="field of subfields"
                                :key="field.name"
                                :name="field.name"
                                :type="field.type"
                                :label="field.label"
                                :placeholder="field.placeholder || field.label"
                                v-model="$root[field.name]"
                                :error="errors[field.name]"
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
                        v-for="(subfields, idx) in contractItems"
                        :key="idx"
                    >
                        <component
                            :is="`Base${field.component}`"
                            v-for="field of subfields"
                            :key="field.name"
                            :name="field.name"
                            :type="field.type"
                            :placeholder="field.placeholder || field.label"
                            :label="field.label"
                            v-model="$root[field.name]"
                            :error="errors[field.name]"
                        />
                    </div>
                </form-fields-group>

                <BaseButton text="Отправить" />
            </form>
        </div>
    </div>
</template>

<script>
import { createDocument } from '@/api/api';
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import FormFieldsGroup from '@/components/FormFieldsGroup';

export default {
    name: 'App',
    components: { FormFieldsGroup },
    computed: {
        mainFields() {
            return this.getFieldsByArea('main');
        },
        executorFields() {
            const allExecutorFields = this.getFieldsByArea('executor');
            return this.separateFieldsBySubarea(allExecutorFields);
        },
        clientFields() {
            const allClientFields = this.getFieldsByArea('client');
            return this.separateFieldsBySubarea(allClientFields);
        },
        contractItems() {
            const allClientFields = this.getFieldsByArea('contract-items');
            return this.separateFieldsBySubarea(allClientFields);
        },
    },
    methods: {
        getFieldsByArea(areaName) {
            return this.formFields.filter((f) => f.area === areaName);
        },
        separateFieldsBySubarea(fieldsArray) {
            let subarea = '';
            const result = {};

            fieldsArray.forEach((item) => {
                if (item.subarea === subarea) {
                    result[subarea].push(item);
                    return;
                }
                subarea = item.subarea;
                result[subarea] = [item];
            });

            return result;
        },
    },
    setup() {
        const formFields = require('@/settings-jsons/contract.json');
        const validations = {};

        for (let field of formFields) {
            if (field.validations.type === 'string') {
                validations[field.name] = yup.string();
                /*.required(`Заполните ${field.label}`)*/
            }

            if (field.validations.type === 'number') {
                validations[field.name] = yup.number();
                /*.required(`Заполните ${field.label}`)*/
            }
        }

        const validationSchema = yup.object(validations);

        const { handleSubmit, errors } = useForm({
            validationSchema,
        });

        const submit = handleSubmit((values) => {
            createDocument(values);
        });

        const objectToReturn = {
            submit,
            formFields,
            errors,
        };

        for (let field of formFields) {
            const { value: currentField } = useField(field.name);
            objectToReturn[field.name] = currentField;
        }

        return objectToReturn;
    },
};
</script>

<style></style>
