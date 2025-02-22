<?php

namespace Modules\Core\Http\Services;

use App\Http\Services\PsService;
use Modules\Core\Entities\Vendor\Vendor;
use Modules\Core\Constants\Constants;
use Modules\Core\Entities\Vendor\VendorUserPermission;
use Modules\StoreFront\VendorPanel\Http\Services\VendorPaymentService;
use Modules\Core\Transformers\Backend\Model\Vendor\VendorWithKeyResource;
use Modules\StoreFront\VendorPanel\Http\Services\VendorOrderStatusService;
use Modules\StoreFront\VendorPanel\Http\Services\VendorPaymentStatusService;
use Modules\Core\Transformers\Backend\Model\Vendor\VendorApplicationWithKeyResource;

/**

 * @deprecated

 */
class VendorApprovalService extends PsService
{
    protected $vendorService, $vendorPaymentService, $vendorPaymentStatusService, $vendorOrderStatusService;

    public function __construct(VendorService $vendorService, VendorPaymentStatusService $vendorPaymentStatusService, VendorPaymentService $vendorPaymentService, VendorOrderStatusService $vendorOrderStatusService)
    {
        $this->vendorService = $vendorService;
        $this->vendorPaymentService = $vendorPaymentService;
        $this->vendorPaymentStatusService = $vendorPaymentStatusService;
        $this->vendorOrderStatusService = $vendorOrderStatusService;
    }

    public function index($request)
    {
        $row = $request->input('row') ?? Constants::dataTableDefaultRow;
        $relation = ['logo', 'banner_1', 'banner_2', 'vendorBranch'];

        // check permission start
        $checkPermission = $this->checkPermission(Constants::viewAnyAbility, Vendor::class, "admin.index");
        // check permission end

        $conds['order_by'] = null;
        $conds['order_type'] = null;
        $conds['searchterm'] = $request->input('search') ?? '';
        $conds['added_date_range'] = $request->input('added_date_filter') == "all" ? null : $request->added_date_filter;

        if ($request->sort_field) {
            $conds['order_by'] = $request->sort_field;
            $conds['order_type'] = $request->sort_order;
        }

        $applications = $this->vendorService->getVendors(null, Constants::vendorPendingStatus, $relation, $row, $conds);
        $vendorApplications = VendorWithKeyResource::collection($applications);

        $columnAndColumnFilter = $this->vendorService->takingForColumnAndFilterOption(Constants::vendorPendingStatus);
        $showVendorCols = $columnAndColumnFilter['showCoreField'];
        $columnProps = $columnAndColumnFilter['arrForColumnProps'];
        $columnFilterOptionProps = $columnAndColumnFilter['arrForColumnFilterProps'];

        if($conds['order_by']){
            $dataArr = [
                'checkPermission' => $checkPermission,
                'vendorApplications' => $vendorApplications,
                'sort_field' => $conds['order_by'],
                'sort_order' => $request->sort_order,
                'showVendorCols' => $showVendorCols,
                'showCoreAndCustomFieldArr' => $columnProps,
                'hideShowFieldForFilterArr' => $columnFilterOptionProps,
            ];
        }else{
            $dataArr = [
                'checkPermission' => $checkPermission,
                'vendorApplications' => $vendorApplications,
                'showVendorCols' => $showVendorCols,
                'showCoreAndCustomFieldArr' => $columnProps,
                'hideShowFieldForFilterArr' => $columnFilterOptionProps,
            ];
        }

        return $dataArr;

    }

    public function show($id)
    {
        $relation = ['owner'];
        $vendor = new VendorWithKeyResource($this->vendorService->getVendor($id, $relation));
        $application = new VendorApplicationWithKeyResource($this->vendorService->getVendorApplication(null, $id));

        $dataArr = [
            'vendor' => $vendor,
            'application' => $application,
        ];

        return $dataArr;
    }

    public function disableOrPendingOrRejectStatusChange($id, $request)
    {
        $vendor = $this->vendorService->getVendor($id);
        if ($request->status == 'accept') {
            $vendor->status = Constants::vendorAcceptStatus;
            $msg = __('core__be_item_accepted');

            //give permission
            $vendorId = $vendor->id;
            $vendorUserPermission = VendorUserPermission::where('user_id',$vendor->owner_user_id)->first();

            if($vendorUserPermission){
                $vendorRoleObj = json_decode($vendorUserPermission->vendor_and_role);
                if(isset($vendorRoleObj->$vendorId)){
                    if (!str_contains($vendorRoleObj->$vendorId, Constants::vendorOwnerRole)) {
                        $vendorRoleObj->$vendorId = $vendorRoleObj->$vendorId . ',' . Constants::vendorOwnerRole;
                    }
                }else{
                    $vendorRoleObj->$vendorId = Constants::vendorOwnerRole;
                }

                $vendorUserPermission->vendor_and_role = json_encode($vendorRoleObj);
                $vendorUserPermission->update();

            }else{
                $vendorRoleObj = new \stdClass();
                $vendorRoleObj->$vendorId = Constants::vendorOwnerRole;
                $vendorUserPermission = new VendorUserPermission();
                $vendorUserPermission->user_id = $vendor->owner_user_id;
                $vendorUserPermission->vendor_and_role = json_encode($vendorRoleObj);
                $vendorUserPermission->save();
            }
            //add payment
            $data = new \stdClass();
            $data->vendor_id = $vendor->id;
            $this->vendorPaymentService->setVendorPayments($data);
            $this->vendorPaymentStatusService->setPaymentStatuses($vendor->id);
            $this->vendorOrderStatusService->setOrderStatuses($vendor->id);

            $flag = Constants::success;
        } elseif ($request->status == 'reject') {
            $vendor->status = Constants::vendorRejectStatus;
            $msg = __('core__be_item_rejected');
            $flag = Constants::danger;
        }
        if ($request->status == 'disable') {
            $vendor->status = Constants::vendorPendingStatus;
            $msg = __('core__be_item_disabled');
            $flag = Constants::warning;
        }
        $vendor->update();

        $dataArr = [
            'msg' => $msg,
            'flag' => $flag,
        ];
        return $dataArr;
    }

    public function disableOrPendingOrRejectDestroy($id)
    {
        //delete in vendor table
        $vendor = $this->vendorService->getVendor($id);

        //delete in vendor_infos table
        $productRelations = $this->vendorService->getValuesForCustomizeField('', $id);

        $title = $vendor->name;
        $this->vendorService->destroy($id);

        $this->vendorService->deleteCustomizeFieldData($productRelations);

        $dataArr = [
            'msg' => __('core__be_delete_success', ['attribute' => $title]),
            'flag' => Constants::danger,
        ];

        return $dataArr;
    }

    public function downloadDocument($id)
    {
        $dataArr = $this->vendorService->downloadDocument(null, $id);

        return $dataArr;
    }

}
