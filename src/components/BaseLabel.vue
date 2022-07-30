<template>
    <label :for="id" class="text-sm pl-4 block" v-if="label">{{ label }}</label>
</template>

<script>
export default {
    name: 'BaseLabel',
    props: {
        label: {
            type: String,
            default: '',
        },
        id: {
            type: [String, Number],
            required: true,
        },
    },
};
</script>

<style scoped></style>
