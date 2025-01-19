<template>
    <div v-if="showSuccessToast" class="transition delay-150 duration-1000 ease-in-out w-100 p-4 bg-green-50 absolute z-50 mx-auto left-0 right-0 top-[200px] flex">
        <ps-icon name="successCheck" textColor="text-green-500" w="24" h="24"/>
        <p class="pl-4 text-bold">{{  $t(message)  }}</p>
    </div>
</template>

<script lang='ts'>
import { defineComponent,ref } from 'vue';
import PsIcon from '@template1/vendor/components/core/icons/PsIcon.vue';

import { trans } from 'laravel-vue-i18n';
export default defineComponent({
    components : {
        PsIcon,
    },
    props: {
        message : {
            type: String,
        },
        showSuccessToast: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const message = ref('ps_success_dialog__success_message');
        const isShowSuccessToast = props.showSuccessToast;

        if(props.message != null && props.message.trim() != '') {
            message.value = props.message;
        }


        return {
            message,
            isShowSuccessToast
        }
    },
})
</script>
