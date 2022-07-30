<template>
    <div class="relative">
        <BaseLabel :label="label" :id="uuid" />
        <textarea
            class="w-full border border-solid border-black/10 p-4 bg-white/80 block rounded-lg shadow-inner focus:shadow-md transition-all duration-300 text-black"
            :id="uuid"
            v-bind="$attrs"
            :placeholder="label"
            :modelValue="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
        ></textarea>
        <BaseError :error="error" />
    </div>
</template>

<script>
import { UniqueID } from '@/utils/UniqueID';

export default {
    name: 'BaseTextarea',
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
            type: String,
            default: '',
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
