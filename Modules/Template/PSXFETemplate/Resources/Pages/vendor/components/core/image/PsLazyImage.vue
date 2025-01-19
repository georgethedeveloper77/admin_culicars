<template>
    <v-lazy-image
        :src="isError ? error: src"
        :src-placeholder="srcPlaceholder"
        @error="handleError()"
    />
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import VLazyImage from 'v-lazy-image';

    export default defineComponent({
        name: 'PsLazyImage',
        components: {
            VLazyImage
        },
        props:{
            src: {
                type: String,
                default: ''
            },
            srcPlaceholder: {
                type: String,
                default: ''
            },
            error: {
                type: String,
                default: ''
            }
        },
        setup(props){
            const imgSrc = ref(props.src);
            const isError = ref(false);

            // watch(()=>props.src, (newValue, oldValue)=>{
            //     imgSrc.value = newValue;
            // })

            function handleError(){
                isError.value = true;
            }

            return{
                imgSrc,
                isError,
                handleError
            }
        }
    })
</script>
