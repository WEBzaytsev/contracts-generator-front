<template>
    <div>
        <fieldset>
            <BaseFieldsetLegend :text="title" />
            <slot></slot>
        </fieldset>
    </div>
</template>

<script>
export default {
    name: 'FormFieldsGroup',
    props: {
        title: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped></style>
