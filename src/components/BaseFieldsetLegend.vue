<template>
    <legend class="text-2xl text-center mb-10 font-bold">{{ text }}</legend>
</template>

<script>
export default {
    name: 'BaseFieldsetLegend',
    props: {
        text: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped></style>
