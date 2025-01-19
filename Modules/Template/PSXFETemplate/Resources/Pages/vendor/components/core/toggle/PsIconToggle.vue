<template>
    <div class="flex items-center">
        <button
            class="flex flex-row items-center w-12 h-6 rounded-xl" type="submit"
            :class="selectedValue ? ['justify-end ' , toggleOnTheme] : ['justify-start ' , toggleOffTheme]"
            @click="toggle">

            <span  class="flex flex-col items-center justify-center w-4 h-4 mx-1 rounded-full bg-feAchromatic-400" >
                <ps-icon w="10" h="10" class="flex-grow-0 text-feAchromatic-50" :name="selectedValue ? toggleOnIcon : toggleOffIcon" />
            </span>

        </button>

        <!-- <button :class="toggleValue ? 'text-dark':'text-feAchromatic-50'" @click="toggle">
            <ps-icon name="moon" textColor="text-feAchromatic-50" class="" w='20' h='20' viewBox="0 0 20 20"/>
        </button> -->
    </div>
</template>

<script>
import { ref } from 'vue'
import PsIcon from "../icons/PsIcon.vue";

export default {
    name: "PsIconToggle",
    components: {
        PsIcon
    },
    props: {
        selectedValue : {
            type : Boolean,
            default: false
        },
        toggleOnTheme : {
            type : String,
            default: 'bg-fePrimary-500'
        },
        toggleOffTheme : {
            type : String,
            default: 'bg-feSecondary-600'
        },
        toggleOnIcon: {
            type : String,
            default: 'night'
        },
        toggleOffIcon: {
            type : String,
            default: 'day'
        },
    },
    emit : ['onChange'],
    setup(props, context) {
        // const toggleValue = ref(props.selectedValue)
        function toggle(){
            // toggleValue.value = !toggleValue.value;
            context.emit('onChange')
        }
        return{
            toggle,
            // toggleValue
        }
    },
}
</script>
