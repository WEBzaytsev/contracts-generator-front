<template>
    <div class="py-12 bg-stone-100 min-h-screen">
        <div
            class="container mx-auto bg-white/50 rounded-xl shadow-lg px-4 py-12"
        >
            <form @submit.prevent="submit">
                <fieldset>
                    <BaseFieldsetLegend text="Основные данные" />
                    <div
                        class="max-w-[800px] grid grid-cols-4 gap-x-7.5 w-fit mx-auto"
                    >
                        <!--TODO: remake to select-->
                        <BaseInput
                            type="text"
                            label="Номер договора"
                            v-model="contractNumber"
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
                            class="col-start-3 col-end-5"
                            v-model="contractCity"
                            :error="errors.contractCity"
                        />
                    </div>
                </fieldset>

                <div class="grid grid-cols-2 gap-10 mt-24">
                    <div
                        class="shadow-inner p-4 rounded border border-solid border-black/10"
                    >
                        <fieldset>
                            <BaseFieldsetLegend text="Исполнитель" />
                            <div class="grid grid-cols-2 gap-x-5 gap-y-2.5">
                                <BaseInput
                                    type="text"
                                    label="Фамилия"
                                    v-model="executorSecondName"
                                    :error="errors.executorSecondName"
                                />
                                <BaseInput
                                    type="text"
                                    label="Имя"
                                    v-model="executorFirstName"
                                    :error="errors.executorFirstName"
                                />
                                <BaseInput
                                    type="text"
                                    label="Отчество"
                                    v-model="executorLastName"
                                    :error="errors.executorLastName"
                                />
                            </div>
                            <div class="grid grid-cols-2 gap-x-5 mt-8">
                                <BaseInput
                                    type="text"
                                    label="Email"
                                    v-model="executorEmail"
                                    :error="errors.executorEmail"
                                />
                                <BaseInput
                                    type="text"
                                    label="Телефон"
                                    v-model="executorPhone"
                                    :error="errors.executorPhone"
                                />
                            </div>
                            <div class="grid grid-cols-2 gap-x-5 mt-8">
                                <BaseInput
                                    type="text"
                                    label="Наименование организации"
                                    v-model="executorCompany"
                                    :error="errors.executorCompany"
                                />
                                <BaseInput
                                    type="text"
                                    label="Должность"
                                    v-model="executorPosition"
                                    :error="errors.executorPosition"
                                />
                            </div>
                            <div class="mt-8">
                                <BaseTextarea
                                    type="text"
                                    label="Юридический адрес"
                                    v-model="executorLegalAddress"
                                    :error="errors.executorLegalAddress"
                                />
                            </div>
                            <div class="mt-8">
                                <BaseInput
                                    type="text"
                                    label="Документ(устав)"
                                    v-model="executorDocument"
                                    :error="errors.executorDocument"
                                />
                            </div>
                            <div class="mt-8">
                                <BaseInput
                                    type="text"
                                    label="Банк"
                                    v-model="executorBankName"
                                    :error="errors.executorBankName"
                                />
                            </div>
                            <div
                                class="grid grid-cols-2 gap-x-5 gap-y-2.5 mt-8"
                            >
                                <BaseInput
                                    type="text"
                                    label="ИНН"
                                    v-model="executorINN"
                                    :error="errors.executorINN"
                                />
                                <BaseInput
                                    type="text"
                                    label="КПП"
                                    v-model="executorKPP"
                                    :error="errors.executorKPP"
                                />
                                <BaseInput
                                    type="text"
                                    label="БИК"
                                    v-model="executorBIC"
                                    :error="errors.executorBIC"
                                />
                            </div>
                            <div class="grid grid-cols-2 gap-x-5 mt-8">
                                <BaseInput
                                    type="text"
                                    label="Расчётный счёт"
                                    v-model="executorCheckingAccount"
                                    :error="errors.executorCheckingAccount"
                                />
                                <BaseInput
                                    type="text"
                                    label="Корреспондентский счёт"
                                    v-model="executorCorespondentAccount"
                                    :error="errors.executorCorespondentAccount"
                                />
                            </div>
                        </fieldset>
                    </div>
                    <div
                        class="shadow-inner p-4 rounded border border-solid border-black/10"
                    >
                        <fieldset>
                            <BaseFieldsetLegend text="Заказчик" />
                            <div class="grid grid-cols-2 gap-x-5 gap-y-2.5">
                                <BaseInput
                                    type="text"
                                    label="Фамилия"
                                    v-model="clientSecondName"
                                    :error="errors.clientSecondName"
                                />
                                <BaseInput
                                    type="text"
                                    label="Имя"
                                    v-model="clientFirstName"
                                    :error="errors.clientFirstName"
                                />
                                <BaseInput
                                    type="text"
                                    label="Отчество"
                                    v-model="clientLastName"
                                    :error="errors.clientLastName"
                                />
                            </div>
                            <div class="grid grid-cols-2 gap-x-5 mt-8">
                                <BaseInput
                                    type="text"
                                    label="Email"
                                    v-model="clientEmail"
                                    :error="errors.clientEmail"
                                />
                                <BaseInput
                                    type="text"
                                    label="Телефон"
                                    v-model="clientPhone"
                                    :error="errors.clientPhone"
                                />
                            </div>
                            <div class="grid grid-cols-2 gap-x-5 mt-8">
                                <BaseInput
                                    type="text"
                                    label="Наименование организации"
                                    v-model="clientCompany"
                                    :error="errors.clientCompany"
                                />
                                <BaseInput
                                    type="text"
                                    label="Должность"
                                    v-model="clientPosition"
                                    :error="errors.clientPosition"
                                />
                            </div>
                            <div class="mt-8">
                                <BaseTextarea
                                    type="text"
                                    label="Юридический адрес"
                                    v-model="clientLegalAddress"
                                    :error="errors.clientLegalAddress"
                                />
                            </div>
                            <div class="mt-8">
                                <BaseInput
                                    type="text"
                                    label="Документ(устав)"
                                    v-model="clientDocument"
                                    :error="errors.clientDocument"
                                />
                            </div>
                            <div class="mt-8">
                                <BaseInput
                                    type="text"
                                    label="Банк"
                                    v-model="clientBankName"
                                    :error="errors.clientBankName"
                                />
                            </div>
                            <div
                                class="grid grid-cols-2 gap-x-5 gap-y-2.5 mt-8"
                            >
                                <BaseInput
                                    type="text"
                                    label="ИНН"
                                    v-model="clientINN"
                                    :error="errors.clientINN"
                                />
                                <BaseInput
                                    type="text"
                                    label="КПП"
                                    v-model="clientKPP"
                                    :error="errors.clientKPP"
                                />
                                <BaseInput
                                    type="text"
                                    label="БИК"
                                    v-model="clientBIC"
                                    :error="errors.clientBIC"
                                />
                            </div>
                            <div class="grid grid-cols-2 gap-x-5 mt-8">
                                <BaseInput
                                    type="text"
                                    label="Расчётный счёт"
                                    v-model="clientCheckingAccount"
                                    :error="errors.clientCheckingAccount"
                                />
                                <BaseInput
                                    type="text"
                                    label="Корреспондентский счёт"
                                    v-model="clientCorespondentAccount"
                                    :error="errors.clientCorespondentAccount"
                                />
                            </div>
                        </fieldset>
                    </div>
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

export default {
    name: 'App',
    setup() {
        const validationSchema = yup.object().shape({
            contractNumber: yup.number().required().positive().integer(),
            contractDate: yup.number().required(),
            contractCity: yup.string().required(),

            clientFirstName: yup.string().required(),
            clientSecondName: yup.string().required(),
            clientLastName: yup.string().required(),
            clientEmail: yup.string().required(),
            clientPhone: yup.string().required(),
            clientCompany: yup.string().required(),
            clientPosition: yup.string().required(),
            clientLegalAddress: yup.string().required(),
            clientDocument: yup.string().required(),
            clientINN: yup.number().required(),
            clientKPP: yup.number().required(),
            clientBankName: yup.string().required(),
            clientBIC: yup.number().required(),
            clientCheckingAccount: yup.number().required(),
            clientCorespondentAccount: yup.number().required(),

            executorFirstName: yup.string().required(),
            executorSecondName: yup.string().required(),
            executorLastName: yup.string().required(),
            executorEmail: yup.string().required(),
            executorPhone: yup.string().required(),
            executorCompany: yup.string().required(),
            executorPosition: yup.string().required(),
            executorLegalAddress: yup.string().required(),
            executorDocument: yup.string().required(),
            executorINN: yup.number().required(),
            executorKPP: yup.number().required(),
            executorBankName: yup.string().required(),
            executorBIC: yup.number().required(),
            executorCheckingAccount: yup.number().required(),
            executorCorespondentAccount: yup.number().required(),

            contractMinPrice: yup.string().required(),
            contractNDS: yup.string().required(),
            contractTermNumber: yup.number().required(),
            contractTermString: yup.string().required(),
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

        const { value: clientFirstName } = useField('clientFirstName');
        const { value: clientSecondName } = useField('clientSecondName');
        const { value: clientLastName } = useField('clientLastName');
        const { value: clientEmail } = useField('clientEmail');
        const { value: clientPhone } = useField('clientPhone');
        const { value: clientCompany } = useField('clientCompany');
        const { value: clientPosition } = useField('clientPosition');
        const { value: clientLegalAddress } = useField('clientLegalAddress');
        const { value: clientDocument } = useField('clientDocument');
        const { value: clientINN } = useField('clientINN');
        const { value: clientKPP } = useField('clientKPP');
        const { value: clientBankName } = useField('clientBankName');
        const { value: clientBIC } = useField('clientBIC');
        const { value: clientCheckingAccount } = useField(
            'clientCheckingAccount'
        );
        const { value: clientCorespondentAccount } = useField(
            'clientCorespondentAccount'
        );

        const { value: executorFirstName } = useField('executorFirstName');
        const { value: executorSecondName } = useField('executorSecondName');
        const { value: executorLastName } = useField('executorLastName');
        const { value: executorEmail } = useField('executorEmail');
        const { value: executorPhone } = useField('executorPhone');
        const { value: executorCompany } = useField('executorCompany');
        const { value: executorPosition } = useField('executorPosition');
        const { value: executorLegalAddress } = useField(
            'executorLegalAddress'
        );
        const { value: executorDocument } = useField('executorDocument');
        const { value: executorINN } = useField('executorINN');
        const { value: executorKPP } = useField('executorKPP');
        const { value: executorBankName } = useField('executorBankName');
        const { value: executorBIC } = useField('executorBIC');
        const { value: executorCheckingAccount } = useField(
            'executorCheckingAccount'
        );
        const { value: executorCorespondentAccount } = useField(
            'executorCorespondentAccount'
        );

        const { value: contractMinPrice } = useField('contractMinPrice');
        const { value: contractNDS } = useField('contractNDS');
        const { value: contractTermNumber } = useField('contractTermNumber');
        const { value: contractTermString } = useField('contractTermString');

        return {
            submit,
            contractNumber,
            contractDate,
            contractCity,
            errors,

            clientFirstName,
            clientSecondName,
            clientLastName,
            clientEmail,
            clientPhone,
            clientCompany,
            clientPosition,
            clientLegalAddress,
            clientDocument,
            clientINN,
            clientKPP,
            clientBankName,
            clientBIC,
            clientCheckingAccount,
            clientCorespondentAccount,

            executorFirstName,
            executorSecondName,
            executorLastName,
            executorEmail,
            executorPhone,
            executorCompany,
            executorPosition,
            executorLegalAddress,
            executorDocument,
            executorINN,
            executorKPP,
            executorBankName,
            executorBIC,
            executorCheckingAccount,
            executorCorespondentAccount,

            contractMinPrice,
            contractNDS,
            contractTermNumber,
            contractTermString,
        };
    },
};
</script>

<style></style>
