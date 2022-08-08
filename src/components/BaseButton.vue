<template>
    <button
        class="px-4 py-2 rounded-lg shadow-lg border-black/10 border border-solid font-bold transition-all duration-300 hover:bg-stone-200"
        v-bind="$attrs"
    >
        {{ text }}
    </button>
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
