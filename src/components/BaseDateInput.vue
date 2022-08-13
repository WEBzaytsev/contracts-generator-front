<template>
    <div class="relative">
        <BaseLabel :label="label" :id="uuid" />
        <VueDatepicker
            class=""
            :modelValue="modelValue"
            :enableTimePicker="false"
            :uid="uuid"
            :format="format"
            modelType="dd.MM.yyyy"
            :locale="locale"
            v-bind="$attrs"
            :placeholder="placeholder"
            @input="$emit('update:modelValue', $event.target.value)"
            @blur="blur"
        />
        <BaseError :error="error" />
    </div>
</template>

<script>
import { UniqueID } from '@/utils/UniqueID';

export default {
    name: 'BaseDateInput',
    props: {
        label: {
            type: String,
            default: '',
        },
        error: {
            type: String,
            default: '',
        },
        modelValue: {
            type: [String, Number],
            default: '',
        },
        placeholder: {
            type: [String, Number],
            default: '',
        },
    },
    methods: {
        blur() {
            this.$emit('blur');
        },
    },
    setup() {
        const locale = 'ru';

        //TODO: set string uuid because Datepicker don't accept id Number type
        const uuid = String(UniqueID());
        const format = (date) => {
            return date.toLocaleDateString(locale, {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });
        };

        return {
            uuid,
            format,
            locale,
        };
    },
};
</script>

<style scoped></style>
