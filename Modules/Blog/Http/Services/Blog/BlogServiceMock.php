<?php

namespace Modules\Blog\Http\Services\Blog;

use App\Http\Contracts\Blog\BlogServiceInterface;
use App\Http\Services\PsService;

class BlogServiceMock extends PsService implements BlogServiceInterface
{
    public function prepareDataForCreate() {}

    // public function prepareDataForEdit($id);

    public function prepareDataForIndex($conds, $row) {}

    public function saveBlog($blogData, $blogImage) {}

    public function updateBlog($id, $blogData, $blogId, $blogImage) {}

    public function deleteBlog($id) {}

    public function getBlog($id, $relation = null)
    {
        return 1;
    }

    public function getBlogs($relation = null, $status = null, $limit = null, $offset = null, $noPagination = null, $pagPerPage = null, $conds = null) {}

    public function togglePublishStatus($id) {}
}
