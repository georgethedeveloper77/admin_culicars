<template>
    <div class="flex flex-row mb-4">
      <ps-label class="w-1/2" textColor="text-feAchromatic-600 dark:text-feAchromatic-400"> {{ title }} </ps-label>
      <ps-label class="w-1/2" textColor="text-feAchromatic-800 dark:text-feAchromatic-200">
        <span v-if="typeof value == 'string'">{{ value }}</span>
        <span v-else v-for="(v,index) in value" :key="index">{{ v }} <br></span>
      </ps-label>
    </div>
</template>

<script>

import PsLabel from '@template1/vendor/components/core/label/PsLabel.vue';

export default ({
    name : "OrderSuccessTitleAndValue",
    components : {
        PsLabel
    },
    props : {
        title : String,
        value : Array
    }
})
</script>
