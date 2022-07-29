<template>
    <div class="py-12 bg-stone-100 h-screen">
        <div class="container mx-auto bg-white/50 rounded-xl shadow-lg p-4">
            <form @submit.prevent="submit">
                <fieldset>
                    <legend class="text-2xl text-center mb-10 font-bold">
                        Основные данные
                    </legend>
                    <div class="flex justify-around">
                        <BaseInput
                            type="text"
                            label="Номер договора"
                            v-model="contractNumber"
                            :error="errors.contractNumber"
                        />
                        <BaseInput
                            type="text"
                            label="Дата"
                            v-model="contractDate"
                            :error="errors.contractDate"
                        />
                        <BaseInput
                            type="text"
                            label="Город"
                            v-model="contractCity"
                            :error="errors.contractCity"
                        />
                    </div>
                </fieldset>

                <BaseButton text="Отправить" />
            </form>
        </div>
    </div>
</template>

<script>
import { createDocument } from '@/api/api';
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';

export default {
    name: 'App',
    setup() {
        const validationSchema = yup.object().shape({
            contractNumber: yup.number().required().positive().integer(),
            contractDate: yup.number().required(),
            contractCity: yup.string().required(),
        });

        const { handleSubmit, errors } = useForm({
            validationSchema,
        });

        const submit = handleSubmit((values) => {
            createDocument(values);
        });

        const { value: contractNumber } = useField('contractNumber');
        const { value: contractDate } = useField('contractDate');
        const { value: contractCity } = useField('contractCity');

        return {
            submit,
            contractNumber,
            contractDate,
            contractCity,
            errors,
        };
    },
};
</script>

<style></style>
