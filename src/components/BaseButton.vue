<template>
    <button v-bind="$attrs">{{ text }}</button>
</template>

<script>
export default {
    name: 'BaseButton',
    props: {
        text: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped></style>
