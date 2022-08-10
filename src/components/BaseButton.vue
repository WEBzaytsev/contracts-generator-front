<template>
    <div
        class="px-4 py-2 rounded-lg shadow-lg border-black/10 border border-solid font-bold transition-all duration-300 hover:bg-stone-200 cursor-pointer mr-4 last:mr-0"
    >
        <a v-if="url" :href="url" :download="download">{{ text }}</a>
        <button v-else>
            {{ text }}
        </button>
    </div>
</template>

<script>
export default {
    name: 'BaseButton',
    props: {
        text: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            default: '',
        },
        download: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style scoped></style>
