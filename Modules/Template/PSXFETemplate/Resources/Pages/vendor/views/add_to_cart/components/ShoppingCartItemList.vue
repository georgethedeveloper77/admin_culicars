<template>
            <div v-if="addToCartStore.cart?.data != null">
                <div v-if = "addToCartStore.cart?.data?.items.filter((item)=>item.isSoldOut==0)?.length > 0 || isVendorExpired == true">
                    <ps-label textColor="bg-feAchromatic-100 dark:bg-feAchromatic-700 dark:text-feAchromatic-50   px-4 py-3 rounded-t-lg">
                        <div class="flex justify-between">
                            <ps-label textColor= "text-xl font-semibold">
                                {{ vendorStore.vendor?.data?.name }}
                            </ps-label>

                           <div class = "flex gap-2">
                                <ps-label :textColor="'text-feSecondary-400'">
                                    {{ $t("delete_selected_items")}}
                                </ps-label>
                                <ps-icon textColor="text-feSecondary-500 dark:text-feAchromatic-500" v-if = "addToCartStore.cart?.data?.items"
                                @click="getAllSelectedCartItems('Available')" class="cursor-pointer" name="trash-alt" h="24" w="24" />
                            </div>
                        </div>
                    </ps-label>

                </div>

                <div v-if="isVendorExpired" class="text-xs font-medium text-feSecondary-800 bg-feWarning-50 p-4">{{ $t("core_fe__vendor_currently_close") }}</div>

                <div v-if="addToCartStore.cart?.data?.items.filter((item)=>item.isSoldOut==0)?.length > 0" class="dark:bg-feAchromatic-800 w-full border border-t-0 dark:border-feAchromatic-800 rounded-b-lg p-4 flex flex-col gap-2">
                    <div :class="index == addToCartStore.cart?.data?.items.filter((item)=>item.isSoldOut==0)?.length-1 ? ['flex gap-4'] : ['flex gap-4 pb-2 border-b-2 dark:border-feAchromatic-700'] " v-for="(item, index) in addToCartStore.cart.data?.items.filter((item)=>item.isSoldOut==0)" :key="index">
                        <PsCheckboxValue :value="item.isSelect == 1 ? true : false" title=""
                         @change="handleCheckboxChange(item, 'Available')" />
                        <img class="h-24 w-24 rounded"
                            v-lazy="{ src: $page.props.uploadUrl + '/' + item.defaultPhoto.imgPath, loading: $page.props.sysImageUrl+'/loading_gif.gif', error: $page.props.sysImageUrl+'/default_photo.png' }" />

                            <div class="w-full flex flex-col justify-between">
                            <ps-label class="flex justify-between items-start gap-4">
                                <ps-label :textColor="[isVendorExpired?'text-feSecondary-400':'text-feSecondary-500 dark:text-feAchromatic-200','text-sm']">{{item.itemName}}{{item.isSelect}}</ps-label>
                                <!-- <ps-label :textColor="[isVendorExpired?'text-feSecondary-400':'text-feSecondary-500 dark:text-feAchromatic-200','text-sm']">{{item}}</ps-label> -->
                                <ps-icon textColor="text-feSecondary-500 dark:text-feAchromatic-500" @click="deleteFromCart(item.cartItemId)" class="cursor-pointer" name="trash-alt" h="24" w="24" />
                            </ps-label>
                            <ps-label :textColor="[isVendorExpired?'text-fePrimary-300':'text-fePrimary-500','text-base']">
                                <span v-if="item.discountPrice != '0'" :class="[isVendorExpired?'text-feSecondary-400':'text-feSecondary-800 dark:text-feAchromatic-200','line-through text-xs']">{{item.vendorCurrencySymbol + formatPrice(item.originalPrice)}}</span>
                                {{item.vendorCurrencySymbol + formatPrice(item.salePrice)}}
                            </ps-label>
                            <div class="flex justify-between items-center">
                                <ps-label v-if="item.availableQuantity <= 10" textColor="text-base font-normal text-fePrimary-500">{{ $t("core_fe__only_items_in_stock",{"attribute":item.availableQuantity}) }}</ps-label>
                                <span></span>
                                <div class="flex border dark:border-feAchromatic-600 rounded overflow-hidden w-24 ">
                                    <span :class="[item.quantity == 1 || isVendorExpired ? 'cursor-not-allowed text-feSecondary-100 dark:text-feAchromatic-600' : 'cursor-pointer dark:text-feAchromatic-200','text-center text-base w-8 h-8 border-r-2 dark:border-feAchromatic-600']"
                                    @click="item.quantity == 1 || isVendorExpired ? '' : addToCart(item, null, 'sub')">&minus;</span>
                                    <span :class="[isVendorExpired ? 'text-feSecondary-100' : 'text-feSecondary-500 dark:text-feAchromatic-200', 'text-center w-9 h-8 align-middle pt-1']">{{item.quantity}}</span>
                                    <span :class="[item.quantity == item.availableQuantity || isVendorExpired ? 'cursor-not-allowed text-feSecondary-100  dark:text-feAchromatic-600' : 'cursor-pointer dark:text-feAchromatic-200','text-center text-base w-8 h-8 border-l-2 dark:border-feAchromatic-600']"
                                    @click="item.quantity == item.availableQuantity || isVendorExpired ? '' : addToCart(item, null, 'add')">&plus;</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <!-- <div v-else class="w-full h-72 border dark:bg-feAchromatic-800 dark:border-feAchromatic-800 rounded-b-lg p-4 flex flex-col gap-2 items-center justify-center">
                    <img class="h-36 w-52"
                        v-lazy="{ src: $page.props.sysImageUrl + '/no_order.png', loading: $page.props.sysImageUrl+'/loading_gif.gif', error: $page.props.sysImageUrl+'/default_photo.png' }" />
                    <ps-label textColor="text-base dark:text-feAchromatic-200 font-medium text-feSecondary-500 text-center w-[413px]" >
                        {{$t('core_fe__all_items_sold_out_text')}}
                    </ps-label>

                </div> -->

                <div v-if="addToCartStore.cart?.data?.items.filter((item)=>item.isSoldOut==1).length > 0">
                    <!-- {{ addToCartStore.cart?.data?.items.filter((item)=>item.isSoldOut==1).map(item => item.cartItemId) }}
                    hi {{ item }} -->
                    <ps-label textColor="bg-feAchromatic-100 dark:bg-feAchromatic-700 dark:text-feAchromatic-50   px-4 py-3 rounded-t-lg">
                        <div class="flex justify-between">
                            <ps-label textColor= "text-xl font-semibold">
                                {{$t('core_fe__sold_out_items')}}
                            </ps-label>

                            <div class = "flex gap-2">
                                <ps-label :textColor="'text-feSecondary-400'">
                                    {{ $t("delete_all")}}

                                </ps-label>

                                <ps-icon textColor="text-feSecondary-500 dark:text-feAchromatic-500"
                                @click="getAllSelectedCartItems('SoldOut')" class="cursor-pointer" name="trash-alt" h="24" w="24" />
                            </div>
                        </div>
                    </ps-label>
                </div>


                <div v-if="addToCartStore.cart?.data?.items.filter((item)=>item.isSoldOut==1).length > 0" class="dark:bg-feAchromatic-800 w-full border border-t-0 dark:border-feAchromatic-800 rounded-b-lg p-4 flex flex-col gap-2">
                    <div :class="index1 == addToCartStore.cart?.data?.items.filter((item)=>item.isSoldOut==1)?.length-1 ? ['flex gap-4'] : ['flex gap-4 pb-2 border-b-2'] "
                         v-for="(item, index1) in addToCartStore.cart.data?.items.filter((item)=>item.isSoldOut==1)" :key="index1">
                         <PsCheckboxValue :value="true" title=""
                         @change="handleCheckboxChange(item, 'SoldOut')" />
                         <img class="h-24 w-24 rounded"
                            v-lazy="{ src: $page.props.uploadUrl + '/' + item.defaultPhoto.imgPath, loading: $page.props.sysImageUrl+'/loading_gif.gif', error: $page.props.sysImageUrl+'/default_photo.png' }" />
                        <div class="w-full flex flex-col justify-between">
                            <ps-label class="flex justify-between items-start gap-4">
                                <ps-label textColor="text-feSecondary-400 text-sm dark:text-feAchromatic-500">{{item.itemName}}</ps-label>
                                <ps-icon textColor="text-feSecondary-500 dark:text-feAchromatic-500" @click="deleteFromCart(item.cartItemId)" class="cursor-pointer" name="trash-alt" h="24" w="24" />
                            </ps-label>
                            <ps-label textColor="text-fePrimary-300 text-base">
                                <span class="line-through text-feSecondary-400 dark:text-feAchromatic-500 text-xs">{{item.vendorCurrencySymbol + formatPrice(item.originalPrice)}}</span>
                                {{item.vendorCurrencySymbol + formatPrice(item.salePrice)}}
                            </ps-label>
                            <div class="flex justify-between items-center">
                                <ps-label textColor="text-base font-normal text-fePrimary-500">{{ $t("sold_out") }}</ps-label>
                                <span></span>
                                <div class="flex border dark:border-feAchromatic-600 rounded overflow-hidden w-24 ">
                                    <span class="text-center text-feSecondary-400 dark:text-feAchromatic-600 text-base w-8 h-8 border-r-2 dark:border-feAchromatic-600 cursor-not-allowed">&minus;</span>
                                    <span class="text-center text-feSecondary-400 dark:text-feAchromatic-600 w-9 h-8 align-middle pt-1">{{item.quantity}}</span>
                                    <span class="text-center text-feSecondary-400 dark:text-feAchromatic-600 text-base w-8 h-8 border-l-2 dark:border-feAchromatic-600 cursor-not-allowed">&plus;</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ps-loading-dialog ref="ps_loading_dialog" />
    <ps-error-dialog ref="ps_error_dialog" />

</template>


<script>
import PsContentContainer from '@template1/vendor/components/layouts/container/PsContentContainer.vue';
import {  ref, onMounted, defineComponent, computed, reactive, onUnmounted, watch } from 'vue';
import { trans } from 'laravel-vue-i18n';
import { PsValueStore } from "@templateCore/store/modules/core/PsValueStore";
import { useAddToCartStoreState } from "@templateCore/store/modules/addToCart/AddToCartStore";
import { useVendorStore } from "@templateCore/store/modules/vendor/VendorStore";
import format from 'number-format.js';

import AddToCartParameterHolder from '@templateCore/object/holder/AddToCartParameterHolder';
import DeleteItemsFromCartParameterHolder from '@templateCore/object/holder/DeleteItemsFromCartParameterHolder';

import PsLabel from '@template1/vendor/components/core/label/PsLabel.vue';
import PsIcon from '@template1/vendor/components/core/icons/PsIcon.vue';
import PsLoadingDialog from '@template1/vendor/components/core/dialog/PsLoadingDialog.vue';
import PsCheckboxValue from '@template1/vendor/components/core/checkbox/PsCheckboxValue.vue';
import PsErrorDialog from '@template1/vendor/components/core/dialog/PsErrorDialog.vue';

    export default defineComponent({
        name: "CartItemList",
        components: {
            PsLabel,
            PsIcon,
            PsLoadingDialog,
            PsCheckboxValue,
            PsErrorDialog
        },
        props: {
            priceFormat: {
                type: String,
                default: ""
            }
        },
        setup(props, {emit}) {
            const psValueStore = PsValueStore();
            const loginUserId = psValueStore.getLoginUserId();
            const addToCartStore = useAddToCartStoreState('checkout');
            const vendorStore = useVendorStore();
            const addToCartHolder = new AddToCartParameterHolder();
            const deleteItemsFromCartHolder = new DeleteItemsFromCartParameterHolder();
            const vendorId = ref();
            const isVendorExpired = ref(false);
            const ps_loading_dialog = ref();
            const itemChecked = ref([]);
            const itemCheckedSoldOut = ref([]);
            const ps_error_dialog = ref();
            const isSelect = ref();

            const index = ref(0);
            const index1 = ref(0);
            onMounted(async () => {
                const cartData = await addToCartStore.getAllItemFromCart(loginUserId, 0);
                vendorId.value = await addToCartStore?.cart?.data?.vendorId;
                await vendorStore.loadVendor(vendorId.value, loginUserId, '');
                isVendorExpired.value = vendorStore.vendor?.data?.expireStatus == 2 ? true : false;

                itemChecked.value = await addToCartStore.cart?.data?.items
                                    .filter(item => item.isSoldOut == 0 && item.isSelect == 1)
                                    .map(item => item.cartItemId);

                itemCheckedSoldOut.value = await addToCartStore.cart?.data?.items
                                    .filter(item => item.isSoldOut == 1)
                                    .map(item => item.cartItemId);
                await itemChecked.value;
                await itemCheckedSoldOut.value;
                emit('updateItemCount', itemChecked.value);
                //alert("item checked" + itemChecked.value);
            })

            function formatPrice(value){
                return format(props.priceFormat, value);
            }

            function handleCheckboxChange(item, param) {
                if(param == "SoldOut"){
                    const index = itemCheckedSoldOut.value.indexOf(item.cartItemId);
                    if (index === -1) {
                        // If the cartItemId is not in the array, add it
                        itemCheckedSoldOut.value.push(item.cartItemId);
                    } else {
                        // If the cartItemId is already in the array, remove it
                        itemCheckedSoldOut.value.splice(index, 1);
                    }
                    //alert(itemCheckedSoldOut);
                }
                else{
                    const index = itemChecked.value.indexOf(item.cartItemId);
                    let isSelect = item.isSelect == 1 ? "0" : "1";
                    if (index === -1) {
                        // If the cartItemId is not in the array, add it
                        itemChecked.value.push(item.cartItemId);
                    } else {
                        // If the cartItemId is already in the array, remove it
                        itemChecked.value.splice(index, 1);
                    }
                    addToCart(item, isSelect);
                }
                emit('updateItemCount', itemChecked.value);
                //alert(itemChecked.value);
                //Vue.set(itemChecked, index, itemChecked.value[index]);

            }

            async function getAllSelectedCartItems(param) {
                    //alert(itemChecked.value);
                    if(param == "SoldOut"){
                        console.log(itemCheckedSoldOut.value);
                        deleteFromCart(itemCheckedSoldOut.value);
                    }else{
                        console.log(itemChecked.value);
                        deleteFromCart(itemChecked.value);
                    }


            }

            async function deleteFromCart(itemId) {
                ps_loading_dialog.value.openModal();

                // Check if itemId is an array
                if (Array.isArray(itemId)) {
                    // If it's an array, loop through each item and delete them one by one
                    for (const id of itemId) {
                        deleteItemsFromCartHolder.ids = [id];
                        const response = await addToCartStore.deleteItemsFromCart(loginUserId, deleteItemsFromCartHolder);
                        if (response.data.status == 'success') {
                            await addToCartStore.getAllItemFromCart(loginUserId, 0);
                            //alert("Hi 1");
                        }
                        console.log(response);
                    }
                } else {
                         deleteItemsFromCartHolder.ids = [itemId];
                        ps_loading_dialog.value.openModal();
                        const response = await addToCartStore.deleteItemsFromCart(loginUserId, deleteItemsFromCartHolder);
                        if(response.data.status == 'success'){
                            await addToCartStore.getAllItemFromCart(loginUserId, 0);
                            ps_loading_dialog.value.closeModal();
                        }
                        console.log(response)
                }

                ps_loading_dialog.value.closeModal();
            }

            // async function deleteFromCart(itemId){
            //     deleteItemsFromCartHolder.ids = [itemId];
            //     ps_loading_dialog.value.openModal();
            //     const response = await addToCartStore.deleteItemsFromCart(loginUserId, deleteItemsFromCartHolder);
            //     if(response.data.status == 'success'){
            //         await addToCartStore.getAllItemFromCart(loginUserId);
            //         ps_loading_dialog.value.closeModal();
            //     }
            //     console.log(response)
            // }

            async function addToCart(item, isSelect = null, type = null){
                let qty = parseInt(item.quantity);
                let availableQty = parseInt(item.availableQuantity);
                if(type == null){
                    addToCartHolder.quantity = qty;
                }else{
                    if(type=="add" && qty<availableQty){
                        addToCartHolder.quantity = qty + 1;
                    }
                    if(type=="sub" && qty > 1){
                        addToCartHolder.quantity = qty - 1;
                    }
                }


                addToCartHolder.vendorId = vendorId.value;
                addToCartHolder.itemId = item.itemId;
                addToCartHolder.userId = loginUserId;
                addToCartHolder.isSelect = isSelect == null ? item.isSelect : isSelect;

                ps_loading_dialog.value.openModal();
                const response = await addToCartStore.addToCart(loginUserId, addToCartHolder);

                console.log(addToCartStore)
                if(response.status == 1){
                    await addToCartStore.getAllItemFromCart(loginUserId, 0);
                    ps_loading_dialog.value.closeModal();
                }else{
                    ps_loading_dialog.value.closeModal();
                    ps_error_dialog.value.openModal("", response.message);
                }
            }

            return {
                addToCartStore,
                vendorStore,
                addToCart,
                ps_loading_dialog,
                deleteFromCart,
                isVendorExpired,
                itemChecked,
                itemCheckedSoldOut,
                handleCheckboxChange,
                getAllSelectedCartItems,
                ps_error_dialog,
                formatPrice,
            }
        }
    })
</script>

