<template>
    <div class="w-full rounded-lg border p-6 dark:bg-feAchromatic-800 dark:border-feAchromatic-700">
        <div class="flex justify-between items-start pb-4 border-b-2 dark:border-feAchromatic-700">
            <div class="">
                <ps-label textColor="text-lg font-semibold text-feAchromatic-800 dark:text-feAchromatic-200">
                    {{ $t('Order ID:') }} {{ order.orderCode }}
                    <span class="ms-3 border px-4 py-1 rounded" :style="'color: '+order.orderStatusColor+';border:1px solid '+order.orderStatusColor">{{ order.orderStatus }}</span>
                </ps-label>
                <div class="flex mt-3">
                    <ps-label textColor="text-sm font-normal text-feAchromatic-800 dark:text-feAchromatic-200 pe-2">{{ order.orderDate }}</ps-label>
                    <ps-label textColor="text-sm font-normal text-feAchromatic-800 dark:text-feAchromatic-200 px-2 border-x-2">{{ order.itemCount }} Items</ps-label>
                    <ps-label textColor="text-sm font-normal text-feAchromatic-800 dark:text-feAchromatic-200 ps-2">
                        {{ order.total }}
                        <span class="text-xs font-medium p-1 rounded " :style="'color:'+order.paymentStatusColor+';background-color:'+order.paymentStatusColor+'20'">{{ order.paymentStatus }}</span>
                    </ps-label>
                </div>
            </div>
            <div class="sm:flex gap-4 hidden">
                <div class="w-10 h-10 p-2 cursor-pointer border rounded dark:border-feAchromatic-500 hover:bg-fePrimary-500 hover:text-feAchromatic-50"
                    @click="downloadClick(order.id)">
                    <ps-icon textColor="dark:text-feAchromatic-200" name="fileDownload" w="24" h="24" viewBox="0 0 24 26"/>
                </div>
                <ps-route-link :to="{
                    name:'fe_order_history_detail', query:{orderId:order.id}
                    }">
                    <ps-button colors="hover:text-white" border="rounded border dark:text-feAchromatic-200 dark:border-feAchromatic-500">{{ $t("core_fe__view_order_details") }}</ps-button>
                </ps-route-link>
            </div>
        </div>
        <ps-label textColor="text-xl font-semibold text-feAchromatic-800 dark:text-feAchromatic-200 pt-4">{{ order.vendorName }}</ps-label>
        <div class="mt-2 grid sm:grid-cols-6 md:grid-cols-10 grid-cols-3 gap-2">
            <div class="col-span-1" v-for="(item, index) in order.itemInfo" :key="index">
                <img alt="Placeholder" class="overflow-hidden object-cover w-full h-24 rounded" width="640px" height="360px"
                    v-lazy="{ src: $page.props.thumb1xUrl + '/' + item.defaultPhoto.imgPath, loading: $page.props.sysImageUrl + '/loading_gif.gif', error: $page.props.sysImageUrl + '/default_photo.png' }" />
            </div>
        </div>
        <div class="flex gap-4 sm:hidden w-full mt-4">
                <div class="w-10 h-10 p-2 cursor-pointer border rounded dark:border-feAchromatic-500 hover:bg-fePrimary-500 hover:text-feAchromatic-50">
                    <ps-icon textColor="dark:text-feAchromatic-200" name="fileDownload" w="24" h="24" viewBox="0 0 24 26"/>
                </div>
                <ps-route-link :to="{
                    name:'fe_order_history_detail', query:{orderId:order.id}
                    }" class="w-full">
                    <ps-button colors="hover:text-white w-full" border="rounded border dark:text-feAchromatic-200 dark:border-feAchromatic-500">{{ $t("core_fe__view_order_details") }}</ps-button>
                </ps-route-link>
            </div>
    </div>
</template>

<script>
import { onMounted, onUnmounted, ref, defineComponent, computed} from 'vue';

import PsLabel from '@template1/vendor/components/core/label/PsLabel.vue';
import PsRouteLink from '@template1/vendor/components/core/link/PsRouteLink.vue';
import PsButton from '@template1/vendor/components/core/buttons/PsButton.vue';
import PsIcon from '@template1/vendor/components/core/icons/PsIcon.vue';

    export default defineComponent({
        name: 'OrderItem',
        components: {
            PsLabel,
            PsRouteLink,
            PsButton,
            PsIcon
        },
        props: {
            order: Object,
        },
        setup(props, {emit}) {
            //
            function downloadClick(id){
                window.location.href = 'api/v1.0/vendor/download-pdf?login_user_id=1&order_id='+id;
            }

            return {
                downloadClick,
            }
        }
    })
</script>
