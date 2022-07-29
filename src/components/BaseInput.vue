<template>
    <div class="relative">
        <label for="" class="text-sm mb-1 block" v-if="label">{{
            label
        }}</label>
        <input
            class="w-full p-4 bg-white/80 block rounded-lg shadow-xl focus:shadow-md transition-all duration-300 text-black"
            v-bind="$attrs"
            :placeholder="label"
            :modelValue="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
        />
        <p
            class="absolute left-0 top-full w-full text-red-600 pl-4"
            v-if="error"
        >
            {{ error }}
        </p>
    </div>
</template>

<script>
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
            default: '',
        },
    },
};
</script>

<style scoped></style>
