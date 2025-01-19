<?php

namespace Modules\Core\Http\Services;

use App\Config\ps_constant;
use App\Http\Services\PsService;
use Google\Auth\OAuth2;
use Google\Service\Docs\Request;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Http;
use Modules\Core\Constants\Constants;
use Modules\Core\Entities\Configuration\BackendSetting;
use Modules\Core\Entities\CoreImage;
use Modules\Core\Entities\Currency;
use Modules\Core\Entities\Financial\ItemCurrency;
use Modules\Core\Entities\Item;

/**
 * @deprecated
 */
class FirebaseCloudMessagingService extends PsService
{
    protected $userAccessApiTokenService, $client;

    public function __construct(UserAccessApiTokenService $userAccessApiTokenService)
    {
        $this->userAccessApiTokenService = $userAccessApiTokenService;
        $this->client = new Client();
    }

    public function getUrlForFCM($firebaseProjectId)
    {
        $url = "https://fcm.googleapis.com/v1/projects/" . $firebaseProjectId . "/messages:send";
        return $url;
    }

    public static function getToken()
    {
        $file = ps_constant::privateKeyFileNameForFCM;
        $filePath = base_path('storage/firebase/' . $file);

        $scopes = ['https://www.googleapis.com/auth/firebase.messaging'];


        if (!file_exists($filePath)) {
            $dataArr = [
                "status" => "error",
                "code" => Constants::notFoundStatusCode,
                "message" => "The Private Json File is not found"
            ];
            return $dataArr;
        }

        $jsonKey = json_decode(file_get_contents($filePath), true);

        if (empty($jsonKey)) {
            $dataArr = [
                "status" => "error",
                "code" => Constants::badRequestStatusCode,
                "message" => "There is no content in this json file"
            ];
            return $dataArr;
        }

        $oauth2 = new OAuth2([
            'audience' => $jsonKey['token_uri'],
            'issuer' => $jsonKey['client_email'],
            'signingAlgorithm' => 'RS256',
            'signingKey' => $jsonKey['private_key'],
            'scope' => $scopes,
            'sub' => $jsonKey['client_email'],
            'tokenCredentialUri' => $jsonKey['token_uri'],
        ]);

        $accessToken = $oauth2->fetchAuthToken();

        if (!isset($accessToken['access_token'])) {
            $dataArr = [
                "status" => "error",
                "code" => Constants::badRequestStatusCode,
                "message" => "Error fetching OAuth2 access token."
            ];
            return $dataArr;
        }

        $dataArr = [
            "status" => "success",
            "code" => Constants::okStatusCode,
            "message" => "Token have been generated successfully",
            "token" => $accessToken['access_token']
        ];
        return $dataArr;
    }

    /**
     * Sending Message From FCM For Android & iOS By using topics subscribe
     */
    public function send_android_fcm_topics_subscribe($data)
    {
        $file = ps_constant::privateKeyFileNameForFCM;
        $filePath = base_path('storage/firebase/' . $file);

        if (!file_exists($filePath)) {
            $dataArr = [
                "status" => "error",
                "code" => Constants::notFoundStatusCode,
                "message" => "The Private Json File is not found"
            ];
            return $dataArr;
        }

        $jsonKey = json_decode(file_get_contents($filePath), true);

        //Google cloud messaging GCM-API url
        $url = $this->getUrlForFCM($jsonKey['project_id']);

        $backend_setting = BackendSetting::first();

        $prj_name = env('APP_URL');
        if (!str_ends_with($prj_name, '/')) {
            $prj_name = $prj_name . '/';
        }

        $click_action = "";

        if ($data['subscribe'] == 0 && $data['push'] == 1) {
            // push noti
            $click_action = $prj_name . "notification-list";

            $noti_arr = array(
                'title' => $data['message'],
                'body' => $data['desc']
            );

            $noti_data = array(
                'sound' => 'default',
                'message' => $data['message'],
                'flag' => ps_constant::broadcast,
                'click_action' => $click_action
            );

            $message_data = array(
                'topic' => $backend_setting->topics,
                'notification' => $noti_arr,
                'data' => $noti_data,
            );

            $fields = array(
                'message' => $message_data
            );
        } else {
            // subscribe noti
            // $noti_arr = array(
            //     'title' => __('site_name'),
            //     'body' => $message,
            //     'sound' => 'default',
            //     'message' => $message,
            //     'flag' => $flag,
            //     'click_action' => $click_action
            // );

            // $fields = array(
            //     'sound' => 'default',
            //     'notification' => $noti_arr,
            //     'registration_ids' => $registatoin_ids,
            //     'data' => array(
            //         'message' => $message,
            //         'flag' => $flag,
            //         'click_action' => $click_action
            //     )

            // );
            $click_action = $prj_name . 'fe_item?item_id=' . $data['item_id'];
            $noti_arr = array(
                'title' => __('site_name'),
                'body' => $data['message'],
            );

            $noti_data = array(
                'sound' => 'default',
                'message' => $data['message'],
                'item_id' => (string)$data['item_id'],
                'flag' => Constants::subscribeNotiFlag,
                'click_action' => $click_action
            );

            $message_data = array(
                'topic' => $data['subcategory_id'] . '_MB',
                'notification' => $noti_arr,
                'data' => $noti_data,
            );

            $fields = array(
                'message' => $message_data
            );
        }
        $tokenForFCM = !empty($this->getToken()['token']) ? $this->getToken()['token'] : '';

        $headers = array(
            'Authorization: Bearer ' . $tokenForFCM,
            'Content-Type: application/json'
        );
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));
        $result = curl_exec($ch);
        if ($result === FALSE) {
            die('Curl failed: ' . curl_error($ch));
        }
        curl_close($ch);
        return $result;
    }

    /**
     * Sending Message From FCM For Frontend By using topics subscribe
     */
    public function send_android_fcm_topics_subscribe_fe($data, $prj_name)
    {
        $backend_setting = BackendSetting::first();

        $file = ps_constant::privateKeyFileNameForFCM;
        $filePath = base_path('storage/firebase/' . $file);

        if (!file_exists($filePath)) {
            $dataArr = [
                "status" => "error",
                "code" => Constants::notFoundStatusCode,
                "message" => "The Private Json File is not found"
            ];
            return $dataArr;
        }

        $jsonKey = json_decode(file_get_contents($filePath), true);

        //Google cloud messaging GCM-API url
        $url = $this->getUrlForFCM($jsonKey['project_id']);

        if ($data['subscribe'] == 0 && $data['push'] == 1) {
            // push noti
            $noti_arr = array(
                'title' => $data['message'],
                'body' => $data['desc'],
            );

            $noti_data = array(
                'sound' => 'default',
                'message' => $data['message'],
                'flag' => ps_constant::feBroadcast,
                'click_action' => $prj_name . '/' . 'notification'
            );

            $message_data = array(
                'topic' => $backend_setting->topics_fe,
                'notification' => $noti_arr,
                'data' => $noti_data,
            );

            $fields = array(
                'message' => $message_data
            );
        } else {
            // subscribe noti

            // to get item name for FE click action
            $subscribeFlag = $data['subcategory_id'] . Constants::feSubscribeNotiFlag;
            $id = $data['item_id'];
            $title = Item::find($id)->title;
            $item_name = str_replace(' ', '%20', $title);
            $itm_name = str_replace(' ', '-', $title);
            $click_action = $prj_name . '/' . 'item/' . $itm_name . '?item_id=' . $data['item_id'] . '&item_name=' . $itm_name;

            $noti_arr = array(
                'title' => __('site_name'),
                'body' => $data['message'],
            );

            $noti_data = array(
                'sound' => 'default',
                'message' => $data['message'],
                'item_id' => (string)$id,
                'flag' => Constants::subscribeNotiFlag,
                'click_action' => $click_action
            );

            $message_data = array(
                'topic' => $subscribeFlag,
                'notification' => $noti_arr,
                'data' => $noti_data,
            );

            $fields = array(
                'message' => $message_data
            );
        }


        $tokenForFCM = !empty($this->getToken()['token']) ? $this->getToken()['token'] : '';

        $headers = array(
            'Authorization: Bearer ' . $tokenForFCM,
            'Content-Type: application/json'
        );
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));
        $result = curl_exec($ch);
        if ($result === FALSE) {
            die('Curl failed: ' . curl_error($ch));
        }
        curl_close($ch);
        return $result;
    }

    public function send_android_fcm($registatoin_id, $data, $platform_names)
    {
        $backend_setting = BackendSetting::first();

        $message = $data['message'];
        $flag = $data['flag'];

        if (isset($data['item_id'])) {
            $id = $data['item_id'];

            $item = Item::find($id);

            $title = $item->title;
            $item_name = str_replace(' ', '%20', $title);
            $item_approval_name = str_replace(' ', '-', $title);

            $price = $item->price;

            $currency_id = $item->currency_id;
            $cur = ItemCurrency::find($currency_id);
            $currency = $cur ? $cur->currency_symbol : '';

            $conds_img['img_parent_id'] = $id;
            $conds_img['img_type'] = "item";
            $conds_img['ordering'] = '1';
            $images = CoreImage::where($conds_img)->get();
            $img_path = count($images) > 0 ? $images[0]->img_path : '';

            if (count($images) == 0) {
                $conds_img1['img_parent_id'] = $id;
                $conds_img1['img_type'] = "item";

                $images1 = CoreImage::where($conds_img1)->get();

                if (count($images1) == 1) {
                    $img_path = $images1[0]->img_path;
                } else {
                    $img_path = count($images1) > 0 ? $images1[0]->img_path : '';
                }
            }

            // **** custom field *****
            // $condition_of_item_id = $item->condition_of_item_id;
            // $condition = Condition::find($condition_of_item_id)->name;
        }

        //to get prj name
        // $dyn_link_deep_url = $backend_setting->dyn_link_deep_url;
        // $prj_url = explode('/', $dyn_link_deep_url);
        // $i = count($prj_url) - 2;
        $prj_name = env('APP_URL');
        if (!str_ends_with($prj_name, '/')) {
            $prj_name = $prj_name . '/';
        }

        $click_action = "";

        foreach ($platform_names as $platform_name) {
            $currency_tmp =  '&currency=';
            $currency_tmp = htmlentities($currency_tmp);

            if (strtolower($platform_name) == "frontend" && $flag == Constants::chatNotiFlag) {
                //for chat chat?buyer_user_id=133&seller_user_id=1&item_id=192&chat_flag=CHAT_FROM_BUYER
                $click_action = $prj_name .  'chat?buyer_user_id=' . $data['buyer_user_id'] . '&seller_user_id=' . $data['seller_user_id'] . '&item_id=' . $data['item_id'] . '&chat_flag=' . $data['chat_flag'];
            } elseif (strtolower($platform_name) == "frontend" && $flag == Constants::reviewNotiFlag) {
                $click_action = $prj_name . 'review-list?user_id=' . $data['review_user_id'];
            } elseif (strtolower($platform_name) == "frontend" && $flag == Constants::approvalNotiFlag) {
                $click_action = $prj_name . 'fe_item?item_id=' . $data['item_id'];
            } elseif (strtolower($platform_name) == "frontend" && $flag == Constants::followNotiFlag) {
                $click_action = $prj_name . "profile";
            } elseif (strtolower($platform_name) == "frontend" && $flag == Constants::verifyBlueMarkNotiFlag) {
                $click_action = $prj_name . "profile";
            } elseif (strtolower($platform_name) == "android" || strtolower($platform_name) == "ios") {
                $click_action = ps_constant::flutterNotificationClick;
            } else if (strtolower($platform_name) == "frontend")
                $click_action = $prj_name . "";
            else {
                $click_action = ps_constant::flutterNotificationClick;
            }
        }

        if ($flag == Constants::approvalNotiFlag || $flag == Constants::verifyBlueMarkNotiFlag || $flag == Constants::followNotiFlag) {
            $noti_arr = array(
                'title' => __('site_name'),
                'body' => $message
            );

            $message_data = array(
                'token' => $registatoin_id,
                'notification' => $noti_arr,
                'data' => array(
                    'message' => $message,
                    'flag' => $flag,
                    'sound' => 'default',
                    'click_action' => $click_action
                )

            );

            $fields = array(
                'message' => $message_data
            );
        } elseif ($flag == Constants::reviewNotiFlag) {

            $rating = (string)$data['rating'];

            $noti_arr = array(
                'title' => __('site_name'),
                'body' => $message
            );

            $message_data = array(
                'token' => $registatoin_id,
                'notification' => $noti_arr,
                'data' => array(
                    'message' => $message,
                    'rating' => $rating,
                    'flag' => 'review',
                    'sound' => 'default',
                    'click_action' => $click_action
                )
            );

            $fields = array(
                'message' => $message_data
            );
        } else if ($flag == Constants::chatNotiFlag) {

            $message = $data['message'];
            $buyer_id = $data['buyer_user_id'];
            $seller_id = $data['seller_user_id'];
            $sender_name = $data['sender_name'];
            $item_id = $data['item_id'];
            $sender_profile_photo = $data['sender_profile_photo'];

            $noti_arr = array(
                'title' => __('site_name'),
                'body' => $message,
            );

            $message_data = array(
                'token' => $registatoin_id,
                'notification' => $noti_arr,
                'data' => array(
                    'message' => $message,
                    'flag' => $flag,
                    'buyer_id' => (string)$buyer_id,
                    'seller_id' => (string)$seller_id,
                    'item_id' => (string)$item_id,
                    'sender_name' => (string)$sender_name,
                    'sender_profile_photo' => (string)$sender_profile_photo,
                    'action' => "abc",
                    'sound' => 'default',
                    'click_action' => $click_action
                )
            );

            $fields = array(
                'message' => $message_data
            );
        }

        $file = ps_constant::privateKeyFileNameForFCM;
        $filePath = base_path('storage/firebase/' . $file);

        if (!file_exists($filePath)) {
            $dataArr = [
                "status" => "error",
                "code" => Constants::notFoundStatusCode,
                "message" => "The Private Json File is not found"
            ];
            return $dataArr;
        }

        $jsonKey = json_decode(file_get_contents($filePath), true);

        //Google cloud messaging GCM-API url
        $url = $this->getUrlForFCM($jsonKey['project_id']);

        // Update your Google Cloud Messaging API Key
        $tokenForFCM = !empty($this->getToken()['token']) ? $this->getToken()['token'] : '';

        $headers = array(
            'Authorization: Bearer ' . $tokenForFCM,
            'Content-Type: application/json'
        );
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));
        $result = curl_exec($ch);
        if ($result === FALSE) {
            die('Curl failed: ' . curl_error($ch));
        }
        curl_close($ch);

        return $result;
    }

    public function getBearerTokenForFCMFromApi()
    {
        $data = $this->getToken();

        if ($data['status'] == "error") {
            return responseMsgApi($data["message"], $data['code']);
        }

        $dataArr = [
            "bearer_token_for_fcm" => $data["token"]
        ];
        return responseDataApi($dataArr);
    }

    public function topicSubscribeForNotiFromApi($request)
    {
        $token = $request->token;
        $topic = $request->topic;
        $bearerToken = !empty($this->getToken()["token"]) ? $this->getToken()["token"] : '';
        $url = "https://iid.googleapis.com/iid/v1/" . $token . "/rel/topics/" . $topic;

        $responseData = Http::withHeaders([
            'Authorization' => 'Bearer ' . $bearerToken,
            'access_token_auth' => 'true'
        ])->post($url);

        $status = $responseData->status();
        if ($status !== 200) {
            return responseMsgApi("Subscribe topic process is failed.", Constants::badRequestStatusCode);
        } else {
            return responseMsgApi("Subscribe to " . $topic . " process is success.", Constants::okStatusCode, Constants::successStatus);
        }
    }
}
