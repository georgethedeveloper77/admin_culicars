<template>
    <ps-label class="select-none inline-flex items-center">
        <input type="checkbox" :disabled="disabled" class="bg-transparent"
        :class="disabled ? [disabledTheme, theme, border]: [theme, border, colors, textColor, focus, hover]"
        :id="title" :checked="value"
        @input="handleInput($event.target.checked)" />
        {{title}}
    </ps-label>
</template>

<script lang='ts'>
import PsLabel from "../label/PsLabel.vue";

export default {
    name: "PsCheckboxValue",
    components: { PsLabel },
    props: {
        "value" : Boolean,
        "title" : {
            type : String,
            default : "N.A"
        },
        theme: {
            type : String,
            default : "me-2 w-4 h-4 rounded"
        },
        disabledTheme: {
            type : String,
            default : "bg-feSecondary-100 text-feSecondary-300 dark:text-feSecondary-600 dark:bg-feSecondary-700 cursor-not-allowed opacity-90"
        },
        colors: {
            type : String,
            default : "checked:bg-fePrimary-500 dark:checked:bg-fePrimary-500"
        },
        border: {
            type : String,
            default : "border border-feSecondary-200 dark:border-feSecondary-400"
        },
        textColor: {
            type: String,
            default : "text-fePrimary-500 dark:text-fePrimary-500"
        },
        focus: {
            type: String,
            default: "focus:ring-2 focus:ring-fePrimary-300"
        },
        hover: {
            type: String,
            default: "hover:bg-fePrimary-500 dark:hover:bg-fePrimary-500"
        },
        disabled: {
            type: Boolean,
            default: false
        },

    },
    setup(_, { emit }) {

        function handleInput(v) {
            emit('update:value', v);
        }

        return {
            handleInput
        }
    }
}
</script>
