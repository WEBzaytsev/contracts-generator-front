<template>
    <p
        class="absolute left-4 bottom-0 w-full text-red-500 text-sm"
        v-if="error"
    >
        {{ error }}
    </p>
</template>

<script>
export default {
    name: 'BaseError',
    props: {
        error: {
            type: String,
            default: '',
        },
    },
};
</script>

<style scoped></style>
