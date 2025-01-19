<template>
    <div v-if="showWarningToast" class="transition delay-150 duration-1000 ease-in-out w-100 p-4 bg-yellow-50 absolute z-50 mx-auto left-0 right-0 top-[200px] flex">
        <ps-icon name="info" textColor="text-yellow-500" w="24" h="24"/>
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
        showWarningToast: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const message = ref('ps_success_dialog__success_message');
        const isshowWarningToast = props.showWarningToast;

        if(props.message != null && props.message.trim() != '') {
            message.value = props.message;
        }


        return {
            message,
            isshowWarningToast
        }
    },
})
</script>
