<?php

namespace App\Http\Services;

use App\Config\ps_config;
use App\Http\Contracts\Category\CategoryServiceInterface;
use App\Http\Contracts\Category\SubcategoryServiceInterface;
use App\Http\Contracts\Configuration\BackendSettingServiceInterface;
use App\Http\Services\PsService;
use Carbon\Carbon;
use Modules\Blog\Entities\Blog;
use Modules\Core\Entities\Item;
use Modules\Core\Entities\Subcategory;
use Modules\Core\Entities\Vendor\Vendor;
use Spatie\Sitemap\SitemapGenerator;
use Spatie\Sitemap\SitemapIndex;
use Spatie\Sitemap\Tags\Sitemap;
use Spatie\Sitemap\Tags\Url;

class SiteMapService extends PsService
{
    protected $blogSiteMapUrl, $itemSiteMapUrl, $categorySiteMapUrl, $subCategorySiteMapUrl, $vendorSiteMapUrl;

    public function __construct(
        protected BackendSettingServiceInterface $backendSettingService,
        protected CategoryServiceInterface $categoryService,
        protected SubcategoryServiceInterface $subcategoryService
    ) {
        $this->blogSiteMapUrl = getUrl() . ps_config::siteMapFolder . "/blog-sitemap.xml";
        $this->itemSiteMapUrl = getUrl() . ps_config::siteMapFolder . "/item-sitemap.xml";
        $this->categorySiteMapUrl = getUrl() . ps_config::siteMapFolder . "/category-sitemap.xml";
        $this->subCategorySiteMapUrl = getUrl() . ps_config::siteMapFolder . "/subcategory-sitemap.xml";
        $this->vendorSiteMapUrl = getUrl() . ps_config::siteMapFolder . "/vendor-sitemap.xml";
    }

    public function generateSitemap()
    {
        $backendSetting = $this->backendSettingService->get();
        $vendorSetting = $backendSetting->vendor_setting;
        $sitemapIndex = SitemapIndex::create();

        $sitemapIndex->add(Sitemap::create('blog-sitemap.xml')->setUrl($this->blogSiteMapUrl, Carbon::now()));
        $sitemapIndex->add(Sitemap::create('item-sitemap.xml')->setUrl($this->itemSiteMapUrl, Carbon::now()));
        $sitemapIndex->add(Sitemap::create('category-sitemap.xml')->setUrl($this->categorySiteMapUrl, Carbon::now()));
        $sitemapIndex->add(Sitemap::create('subcategory-sitemap.xml')->setUrl($this->subCategorySiteMapUrl, Carbon::now()));
        if ($vendorSetting == 1) {
            $sitemapIndex->add(Sitemap::create('vendor-sitemap.xml')->setUrl($this->vendorSiteMapUrl, Carbon::now()));
        }

        $sitemapIndex->writeToFile(public_path('allsitemap.xml'));

        return redirect(url(config("app.url") . '/allsitemap.xml'));
    }

    public function redirectToView()
    {
        $sitemapContent = $this->buildSitemapContent();
        file_put_contents(public_path('sitemap.html'), $sitemapContent);
        //$sitemapUrl = url('sitemap.html');
        //return redirect(url('/sitemap.html'));

        $baseUrl = getUrl();
        return redirect(url($baseUrl . 'sitemap.html'));
    }

    private function buildSitemapContent()
    {
        $routes = [
            $this->blogSiteMapUrl,
            $this->itemSiteMapUrl,
            $this->categorySiteMapUrl,
            $this->subCategorySiteMapUrl,
            $this->vendorSiteMapUrl,
        ];

        $html = '<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>HTML Sitemap</title>
                </head>
                <body>
                    <h1>HTML Sitemap</h1>
                    <ul>';

        foreach ($routes as $route) {
            $url = $route;
            $html .= "<li><a href=\"$url\">$url</a></li>";
        }

        $html .= '</ul>
                </body>
                </html>';

        return $html;
    }

    protected function modifiedDate($object)
    {
        if ($object->updated_at) {
            $lastModificationDate = Carbon::createFromFormat('Y-m-d H:i:s', $object->updated_date);
        } else {
            $lastModificationDate = Carbon::now();
        }
        return $lastModificationDate;
    }

    public function blogMap()
    {
        $blogIndexSitemap = SitemapGenerator::create("")->getSitemap();
        //$blogIndexSitemap->add(Sitemap::create(route('blog.index'))->setUrl(route('blog.index'), Carbon::now()));
        $blogIndexSitemap->add(
            Url::create("blog")
                ->setLastModificationDate(Carbon::now())
        );

        // Add URLs for individual blog pages
        $blogs = Blog::all();
        foreach ($blogs as $blog) {
            $blogDetailUrl = "blog-detail?blogId=" . rawurlencode($blog->id) . "&blogName=" . rawurlencode($blog->name);

            //$blogIndexSitemap->add(Sitemap::create($blogDetailUrl)->setUrl($blogDetailUrl, Carbon::now()));
            $blogIndexSitemap->add(
                Url::create($blogDetailUrl)
                    ->setLastModificationDate(Carbon::now())
            );
        }
        $blogIndexSitemap->writeToFile(public_path('sitemaps/blog-sitemap.xml'));
        return redirect(url($this->blogSiteMapUrl));
    }

    public function itemMap()
    {
        $itemIndexSitemap = SitemapGenerator::create("")->getSitemap();
        //$itemIndexSitemap->add(Sitemap::create(route('item.index'))->setUrl(route('item.index'), Carbon::now()));
        $itemIndexSitemap->add(
            Url::create("item-list")
                ->setLastModificationDate(Carbon::now())
        );

        // Add URLs for individual tag pages
        $items = Item::with('category')->get();
        //dd($items);
        foreach ($items as $item) {
            $url = "item_list?cat_id=" . rawurlencode($item->category_id) . "&cat_name=" . rawurlencode($item->category->name) . "&status=1";
            $itemIndexSitemap->add(
                Url::create($url)
                    ->setLastModificationDate(Carbon::now())
            );
        }
        $itemIndexSitemap->writeToFile(public_path('sitemaps/item-sitemap.xml'));
        return redirect(url($this->itemSiteMapUrl));
    }

    public function categoryMap()
    {
        $IndexSitemap = SitemapGenerator::create("")->getSitemap();
        //$IndexSitemap->add(Sitemap::create(route('category.index'))->setUrl(route('category.index'), Carbon::now()));
        $IndexSitemap->add(
            Url::create("category")
                ->setLastModificationDate(Carbon::now())
        );

        // Add URLs for individual tag pages
        $categories = $this->categoryService->getAll();
        foreach ($categories as $category) {
            $url = "subcategory?cat_id=" . rawurlencode($category->id) . "&cat_name=" . rawurlencode($category->name) . "&status=1";
            //$IndexSitemap->add(Sitemap::create($url)->setUrl($url, Carbon::now()));
            $IndexSitemap->add(
                Url::create($url)
                    ->setLastModificationDate(Carbon::now())
            );
        }
        $IndexSitemap->writeToFile(public_path('sitemaps/category-sitemap.xml'));
        return redirect(url($this->categorySiteMapUrl));
    }

    public function subcatMap()
    {
        $IndexSitemap = SitemapGenerator::create("")->getSitemap();
        //$IndexSitemap->add(Sitemap::create(route('subcategory.index'))->setUrl(route('subcategory.index'), Carbon::now()));
        $IndexSitemap->add(
            Url::create("subcategory")
                ->setLastModificationDate(Carbon::now())
        );

        // Add URLs for individual tag pages
        $relation = ['category'];
        $sub_cats = $this->subcategoryService->getAll(relation: $relation);
        foreach ($sub_cats as $subcategory) {
            $category = $subcategory->category;
            $url = "item-list?cat_id=" . rawurlencode($category?->id) . "&cat_name=" . rawurlencode($category?->name) . "&sub_cat_id=" . rawurlencode($subcategory->id) . "&sub_cat_name=" . rawurlencode($subcategory->name) . "&status=1";

            //$IndexSitemap->add(Sitemap::create($url)->setUrl($url, Carbon::now()));
            $IndexSitemap->add(
                Url::create($url)
                    ->setLastModificationDate(Carbon::now())
            );
        }
        $IndexSitemap->writeToFile(public_path('sitemaps/subcategory-sitemap.xml'));
        return redirect(url($this->subCategorySiteMapUrl));
    }

    public function vendorMap()
    {
        $IndexSitemap = SitemapGenerator::create("")->getSitemap();
        //$IndexSitemap->add(Sitemap::create(route('vendor.index'))->setUrl(route('vendor.index'), Carbon::now()));
        $IndexSitemap->add(
            Url::create("vendor-filter")
                ->setLastModificationDate(Carbon::now())
        );


        // Add URLs for individual tag pages
        $vendors = Vendor::all();
        foreach ($vendors as $vendor) {

            $url = "vendor-info?vendorId=" . rawurlencode($vendor->id);

            // Add the URL to the sitemap with the desired change frequency and priority
            //$IndexSitemap->add(Sitemap::create($url)->setUrl($url, Carbon::now()));
            $IndexSitemap->add(
                Url::create($url)
                    ->setLastModificationDate(Carbon::now())
            );
        }

        $IndexSitemap->writeToFile(public_path('sitemaps/vendor-sitemap.xml'));
        return redirect(url($this->vendorSiteMapUrl));
    }
}
