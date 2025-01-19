<?php

namespace Modules\Core\Http\Services;

use App\Http\Services\PsService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Modules\Core\Constants\Constants;
use Modules\Core\Entities\Vendor\VendorApplication;
/**
 * @deprecated
 */
class VendorApplicationService extends PsService
{
    protected $userService, $vendorService;

    public function __construct(UserService $userService, VendorService $vendorService)
    {
        $this->userService = $userService;
        $this->vendorService = $vendorService;
    }

    public function store($request)
    {
        DB::beginTransaction();
        try{
            $vendorApplication = new VendorApplication();
            $vendorApplication->vendor_id = $request->vendor_id;
            $vendorApplication->user_id = $request->login_user_id;
            $vendorApplication->document = $this->storeDocument($request);
            $vendorApplication->cover_letter = $request->cover_letter;
            $vendorApplication->added_user_id = $request->login_user_id;
            $vendorApplication->save();

            DB::commit();
            return $vendorApplication;
        }catch(\Throwable $e){
            DB::rollBack();
            return ['error' => $e->getMessage()];
        }
    }

    public function update($request)
    {
        $vendorApplication = $this->getVendorApplication($request->id);

        DB::beginTransaction();
        try{
            //if file exist delete old document
            if(isset($request->document) || !empty($request->document)){
                $oldFile = public_path() . '/document/' . $vendorApplication->document;
                if(is_file($oldFile)) {
                    unlink($oldFile);
                }
                $vendorApplication->document = $this->storeDocument($request);
            }


            $vendorApplication->vendor_id = $request->vendor_id;
            $vendorApplication->user_id = $request->login_user_id;
            $vendorApplication->cover_letter = $request->cover_letter;
            $vendorApplication->updated_user_id = Auth::user()->id;
            $vendorApplication->save();

            DB::commit();
            return $vendorApplication;
        }catch(\Throwable $e){
            DB::rollBack();
            return ['error' => $e->getMessage()];
        }
    }

    // public function submitApplication($request)
    // {
    //     return $this->store($request);
    // }

    // public function updateApplication($request)
    // {
    //     $vendor = $this->vendorService->updateFromApi($request);

    //     if(!isset($vendor['error'])){
    //         $vendorApplication = $this->update($request);

    //         return $vendor;
    //     }
    //     return $vendor;
    // }

    public function storeDocument($request)
    {
        if($request->file('document')){
            $document = $request->file('document');
            $fileName = uniqid() . "_." . $document->getClientOriginalExtension();
            $document->move(public_path() . '/document', $fileName);

            return $fileName;
        }
    }

    public function getVendorApplication($id = null, $vendorId = null)
    {
        $appliction = VendorApplication::when($id !== null, function($query) use($id){
            $query->where(VendorApplication::id, $id);
        })->when($vendorId !== null, function($query) use($vendorId){
            $query->where(VendorApplication::vendorId, $vendorId);
        })->first();

        return $appliction;
    }

    public function destroy($id)
    {
        $appliction = $this->getVendorApplication($id, null);

        $appliction->delete();

        $dataArr = [
            'status' => Constants::success
        ];

        return $dataArr;
    }

    public function downloadDocument($applicationId = null, $vendorId = null)
    {
        $application = $this->getVendorApplication($applicationId, $vendorId);

        $file_exist = File::exists(public_path() . '/document/' . $application->document);
        if ($file_exist) {
            $file = public_path('document/'.$application->document);
            return response()->download($file);
        }
    }

}
