$(this).ready(function () {
    // Semantic UI Dropdown
    $('.ui.dropdown').dropdown();
    // Semantic UI Tabs
    $('.tabular.menu .item').tab();
});

// Collapsable Navbar
$('.ui.toggle.icon').click(function () {
    $('.mobile-item').toggleClass('custom-mobile-hide', 1000, 'easeInOut');
    $('.ui.toggle.icon').toggleClass('custom-collapse-navbar-button-top');
    if ($('.ui.main.container').css('padding-top') == '120px') {
        $('.ui.main.container').attr('style', 'padding-top: 296px !important');
    } else {
        $('.ui.main.container').attr('style', 'padding-top: 120px !important');
    }
});

// TWZipcode
if ($('#twzipcode').length > 0) {
    $("#twzipcode").twzipcode({
        countySel: "臺北市", // 城市預設值, 字串一定要用繁體的 "臺", 否則抓不到資料
        districtSel: "大安區", // 地區預設值
        zipcodeIntoDistrict: true, // 郵遞區號自動顯示在地區
        css: ["city menu field", "menu field"], // 自訂 "城市"、"地區" class 名稱 
        countyName: "storeCity", // 自訂城市 select 標籤的 name 值
        districtName: "storeArea" // 自訂地區 select 標籤的 name 值
    });
}