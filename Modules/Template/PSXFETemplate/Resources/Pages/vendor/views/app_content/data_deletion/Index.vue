<template>

    <Head :title="$t('edit_data_deletion_policy')" />

    <ps-label class="p-8" v-if="data_deletion_policy && data_deletion_policy.content">
        <span class="ck-content" v-html="data_deletion_policy.content" />
    </ps-label>

</template>

<script>
import PsLabel from "@template1/vendor/components/core/label/PsLabel.vue";
  import { defineComponent } from "vue";
import { Head } from "@inertiajs/vue3";


export default defineComponent({
    name: "Index",
    components: {
        PsLabel,
        Head
    },
    props: ['data_deletion_policy' ],
    setup(props) {
        var loading = document. getElementById("home_loading__container");
        loading.style.display = "none";

        return {

        }
    },

})
</script>
