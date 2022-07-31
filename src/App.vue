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
                                v-model="$root[field.name]"
                                :error="errors[field.name]"
                            />
                        </div>
                    </form-fields-group>
                </div>

                <div class="mt-24">
                    <fieldset>
                        <BaseFieldsetLegend text="Пункты договора" />
                        <div
                            class="my-8 shadow-inner rounded border border-solid border-black/10"
                        >
                            <div
                                class="grid items-stretch grid-cols-[230px_400px_minmax(0,_1fr)] border-b border-solid border-black/10 last:border-none"
                            >
                                <p
                                    class="border-r border-solid border-black/10 py-6 px-3 flex items-center justify-center text-center"
                                >
                                    Предмет Договора
                                </p>
                                <p
                                    class="border-r border-solid border-black/10 py-6 px-3 flex items-center"
                                >
                                    Максимаьная стоимость работы/услуги без
                                    подписания заказа
                                </p>
                                <div class="py-6 flex justify-around">
                                    <BaseInput
                                        type="text"
                                        width-class="w-2/5"
                                        label="Макс. стоимость (р)"
                                        v-model="contractMinPrice"
                                        :error="errors.contractMinPrice"
                                    />
                                </div>
                            </div>
                            <div
                                class="grid items-stretch grid-cols-[230px_400px_minmax(0,_1fr)] border-b border-solid border-black/10 last:border-none"
                            >
                                <p
                                    class="border-r border-solid border-black/10 py-6 px-3 flex items-center justify-center text-center"
                                >
                                    Финансовые условия
                                </p>
                                <p
                                    class="border-r border-solid border-black/10 py-6 px-3 flex items-center"
                                >
                                    Стоимость работы/услуги в связи с
                                    применением Исполнителем упрощённой схемы
                                    налогообложения
                                </p>
                                <div class="py-6 flex justify-around">
                                    <BaseInput
                                        type="text"
                                        width-class="w-2/5"
                                        label="Облагается НДС?"
                                        v-model="contractNDS"
                                        :error="errors.contractNDS"
                                    />
                                </div>
                            </div>
                            <div
                                class="grid items-stretch grid-cols-[230px_400px_minmax(0,_1fr)] border-b border-solid border-black/10 last:border-none"
                            >
                                <p
                                    class="border-r border-solid border-black/10 py-6 px-3 flex items-center justify-center text-center"
                                >
                                    Обстоятельства непреодолимой силы
                                </p>
                                <p
                                    class="border-r border-solid border-black/10 py-6 px-3 flex items-center"
                                >
                                    Сторона имеет право отложить исполнение
                                    обязательств не более
                                </p>
                                <div class="py-6 flex justify-around">
                                    <BaseInput
                                        type="text"
                                        label="Срок (числом)"
                                        width-class="w-2/5"
                                        v-model="contractTermNumber"
                                        :error="errors.contractTermNumber"
                                    />
                                    <BaseInput
                                        type="text"
                                        width-class="w-2/5"
                                        label="Срок (словами)"
                                        v-model="contractTermString"
                                        :error="errors.contractTermString"
                                    />
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>

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
                validations[field.name] = yup.string().required();
            }

            if (field.validations.type === 'number') {
                validations[field.name] = yup.number().required();
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
