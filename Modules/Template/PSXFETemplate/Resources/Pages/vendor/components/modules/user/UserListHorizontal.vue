<template>
    <ps-card :class="['flex w-full flex-col lg:rounded-lg shadow-sm', color]" :enabledHover="true">
    <div class="items-center justify-center shadow-sm relative border border-feSecondary-50 dark:border-feSecondary-800 rounded-lg flex flex-col gap-4 p-4">
        <div class="flex gap-4" >
            <ps-route-link :to="{ name: 'fe_other_profile', params: { userId: user.userId }}">
                <div class="w-20 h-20 relative cursor-pointer">
                    <!-- <img alt="Placeholder" width="15px" height="10px" class="w-full h-full rounded-full object-cover"
                        v-lazy=" { src: $page.props.thumb1xUrl + '/' + user.userCoverPhoto, loading: $page.props.sysImageUrl+'/loading_gif.gif', error: $page.props.sysImageUrl+'/default_profile.png' }" > -->
                    <ps-lazy-image
                        class="w-full h-full rounded-full object-cover"
                        :src="$page.props.thumb1xUrl + '/' + user.userCoverPhoto"
                        :srcPlaceholder="$page.props.thumb1xUrl + '/' + user.userCoverPhoto"
                        :error="$page.props.sysImageUrl+'/default_profile.png'"
                    />
                    <div v-if="user.isVerifybluemark == '1'" class="w-8 h-8 bg-feInfo-500 rounded-full p-1 absolute bottom-0 right-0">
                        <ps-icon name="bluemark" textColor="text-feSecondary-50" w="24" h="24" />
                    </div>
                </div>
            </ps-route-link>

            <div class="self-center hidden">
            </div>
        </div>
        <div class="flex items-center justify-center">
            <div class="grow flex flex-col gap-2 items-center justify-center truncate">
                <ps-route-link :to="{ name: 'fe_other_profile', params: { userId: user.userId }}" class="cursor-pointer">
                    <ps-label textColor="text-lg font-semibold text-feSecondary-800 dark:text-feSecondary-50">{{ user.userName.length > 17 ? user.userName.slice(0,17)+"..." : user.userName }}</ps-label>
                </ps-route-link>
                <ps-route-link :to="{ name: 'fe_review_list',query: { user_id: user.userId } }">
                    <div class="flex items-center justify-between w-full mx-auto">
                    <rating :rating="user ? Number(user.overallRating) : 0" :maxStars=5 iconColor="text-feWarning-500 dark:text-feWarning-500" size='1x'/>
                    <ps-label textColor="text-sm font-medium text-feSecondary-500 dark:text-feSecondary-50">{{ "(" }}{{user.ratingCount}}{{ ")" }}</ps-label>
                    </div>
                </ps-route-link>

                <!-- <div class="flex gap-4 h-6">
                    <div v-if="user.isShowPhone == '1' && user.userPhone" class="cursor-pointer">
                        <a :href="'tel:' + user.userPhone "><ps-icon name="phone" w="24" h="24"/></a>

                    </div>
                    <div v-if="user.isShowEmail == '1' && user.userEmail" class="cursor-pointer">
                        <a :href="'mailto:' + user.userEmail "><ps-icon name="email" w="24" h="24"/></a>
                    </div>
                </div> -->

                 <div class="flex items-center gap-1 col-span-1 md:col-span-2 lg:col-span-1">

                    <!-- <ps-icon class="text-feSecondary-800 dark:text-feSecondary-50" name="user-group-fill" w="24" h="24" viewBox="0 0 24 24"/> -->
                    <ps-label textColor="text-sm mr-1 font-medium font-semibold text-feSecondary-800 dark:text-feSecondary-50">{{user ? user.followerCount:'0'}}</ps-label>
                    <ps-label textColor="text-sm mr-1 font-medium text-feSecondary-800 dark:text-feSecondary-50">{{ $t("profile__followers") }}</ps-label>
                    <ps-label textColor="text-sm mr-1 font-medium text-feSecondary-200 dark:text-feSecondary-50">{{ $t("|") }}</ps-label>
                    <ps-label textColor="text-sm mr-1 font-medium font-semibold text-feSecondary-800 dark:text-feSecondary-50">{{user ? user.activeItemCount:'0'}}</ps-label>
                    <ps-label textColor="text-sm font-medium text-feSecondary-800 dark:text-feSecondary-50">{{ $t("user__item") }}</ps-label>

                </div>
            </div>

            <!-- <div class="flex items-center gap-1">
                <ps-icon class="text-feSecondary-800 dark:text-feSecondary-50" name="shoppingCart-fill" w="24" h="24" viewBox="0 0 24 24"/>
                <ps-label textColor="text-sm font-medium text-feSecondary-800 dark:text-feSecondary-50">{{user ? user.activeItemCount:'0'}} {{ $t("user__item") }}</ps-label>
            </div> -->
        </div>

        <div class="h-9">
            <ps-button border="border border-feSecondary-200 dark:border-feSecondary-600" colors="bg-feAchromatic-50 text-feSecondary-800 dark:bg-feSecondary-800 dark:text-feSecondary-200"
                v-if="user.userId == LoginUserId" class="'w-full absolute bottom-4 right-4 left-4" disabled>{{ $t('other_profile__follow')}}</ps-button>
            <ps-button border="border border-feSecondary-200 dark:border-feSecondary-600" colors="bg-feAchromatic-50 text-feSecondary-800 dark:bg-feSecondary-800 dark:text-feSecondary-200"
                v-else-if="user.isFollowed == '0'" class="'w-full absolute bottom-4 right-4 left-4" @click="LoginUserId == user.userId ? '' : followClick(user)">{{ $t('other_profile__follow')}}</ps-button>
            <ps-button border="border border-feSecondary-200 dark:border-feSecondary-600" colors="bg-feAchromatic-50 text-feSecondary-800 dark:bg-feSecondary-800 dark:text-feSecondary-200"
                v-else class="'w-full absolute bottom-4 right-4 left-4" @click="followClick(user)">{{ $t('other_profile__following')}}</ps-button>
        </div>
    </div>
</ps-card>
    <ps-loading-dialog ref="psloading" v-if="showLoadingDialog" :isClickOut='false'/>
</template>

<script lang="ts">

import { ref, defineAsyncComponent } from 'vue'
import { router } from '@inertiajs/vue3';

import PsCard from '@template1/vendor/components/core/card/PsCard.vue';
import PsLabel from '@template1/vendor/components/core/label/PsLabel.vue'
import PsButton from '@template1/vendor/components/core/buttons/PsButton.vue';
import PsIcon from '@template1/vendor/components/core/icons/PsIcon.vue';
import Rating from '@template1/vendor/components/core/rating/RatingShow.vue';
import PsLabelCaption from '@template1/vendor/components/core/label/PsLabelCaption.vue';
import PsRouteLink from '@template1/vendor/components/core/link/PsRouteLink.vue';
const PsLoadingDialog = defineAsyncComponent(() => import('@template1/vendor/components/core/dialog/PsLoadingDialog.vue'));
import PsLazyImage from '@template1/vendor/components/core/image/PsLazyImage.vue';

//Modules
import User from '@templateCore/object/User';
import { useUserListStoreState } from "@templateCore/store/modules/user/UserListStore";
import { useUserStore } from "@templateCore/store/modules/user/UserStore";
import { PsValueStore } from '@templateCore/store/modules/core/PsValueStore';
import UserFollowHolder from '@templateCore/object/holder/UserFollowHolder';
import PsConst from '@templateCore/object/constant/ps_constants';
import { trans } from 'laravel-vue-i18n';
import UserParameterHolder from '@templateCore/object/holder/UserParameterHolder';
import { useProductStore } from '@templateCore/store/modules/item/ProductStore';
import PsUtils from '@templateCore/utils/PsUtils';

export default {
    name : "UserListHorizontal",
    components : {
        PsCard,
        PsLabel,
        PsButton,
        PsIcon,
        Rating,
        PsLabelCaption,
        PsRouteLink,
        PsLoadingDialog,
        PsLazyImage
    },
    props : {
        user : { type : User } ,
        onClick : Function,
        storeName : {
            type: String,
            default: ""
        },
        color : {
            type: String,
            default: "bg-feAchromatic-50"
        }
    },
    setup(props) {
        // Inject Provider
        const productStore = useProductStore('detail');
        const psValueStore = PsValueStore();
        const LoginUserId = psValueStore.getLoginUserId();
        const psloading = ref();
        const showLoadingDialog = ref(false);
        const followHolder = new UserFollowHolder();
        const followerParamHolder = new UserParameterHolder().getFollowerUsers();
        const followingParamHolder = new UserParameterHolder().getFollowingUsers();
        followerParamHolder.loginUserId = LoginUserId;
        followingParamHolder.loginUserId = LoginUserId;
        const userListStore = useUserListStoreState(props.storeName);
        const userStore = useUserStore(props.storeName);
        async function followClick(user){
            if(LoginUserId && LoginUserId != PsConst.NO_LOGIN_USER){
                showLoadingDialog.value = true;
                await PsUtils.waitingComponent(psloading);
                psloading.value.openModal();
                if( user.isFollowed == '1'){
                    psloading.value.message = trans('other_profile__removing_user_from_follower_list');
                }else{
                    psloading.value.message = trans('other_profile__adding_user_to_follower_list');
                }
                followHolder.userId = LoginUserId;
                followHolder.followedUserId = user.userId;
                const res = await userStore.postUserFollow(followHolder);
                refleshData();
                psloading.value.closeModal();

            }
            else{

                router.get(route('login'));
            }


        }
        async function refleshData(){
            if(props.storeName == "profile-follower") {
                await userListStore.refleshUserFollowerFollowingList(LoginUserId, followerParamHolder);
            }else if(props.storeName == "profile-following"){
                await userListStore.refleshUserFollowerFollowingList(LoginUserId, followingParamHolder);
            }else if(props.storeName == "top_rated_seller"){
                await userListStore.refleshTopRatedSellerList(LoginUserId);
            }else if(props.storeName == "userSearch"){
                await userStore.refleshUserSearchList(LoginUserId, userStore.userparamHolder);
            }else{
                await productStore.loadItem(props.storeName, LoginUserId);
            }
        }
        return {
            userListStore,
            followClick,
            LoginUserId,
            psloading,
            showLoadingDialog
        }
    }
}
</script>
