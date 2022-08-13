<template>
    <div class="relative">
        <BaseLabel :label="label" :id="uuid" />
        <input
            class="w-full border border-solid border-black/10 p-4 bg-white/80 text-sm block rounded-lg shadow-inner focus:shadow-md transition-all duration-300 text-black"
            :id="uuid"
            v-bind="$attrs"
            :placeholder="placeholder"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            @blur="blur"
        />
        <BaseError :error="error" />
    </div>
</template>

<script>
import { UniqueID } from '@/utils/UniqueID';

export default {
    name: 'BaseInput',
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
            required: true,
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
        const uuid = UniqueID();

        return {
            uuid,
        };
    },
};
</script>

<style scoped></style>
