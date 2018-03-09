var storage = sessionStorage;

$(document).ready(function () {
    checkingLoggedInStatus();

    // Semantic UI Tabs
    $('.tabular.menu .item').tab();
    // Semantic UI Dropdown
    $('.ui.dropdown').dropdown();
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

function checkingLoggedInStatus() {
    if (storage['auth']) {
        $('#loginButton').hide();
        createLoggedInSection();
    }
}

function createLoggedInSection() {
    loggedInDiv = 
        '<div class="mobile-item custom-mobile-hide right menu" hidden>' + 
            '<div class="ui dropdown item">' + 
                '<div class="text text-white custom-font-thin">' + 
                    '<img src="https://unsplash.it/100/100?image=1005" alt="Howard" class="ui avatar image"> Howard Wang</div>' + 
                    '<i class="dropdown icon text-white"></i>' + 
                '<div class="menu">' + 
                    '<a id="logoutButton" class="item custom-font-thin">登出</a>' + 
                '</div>' + 
            '</div>' + 
        '</div>';

    $('.ui.secondary.stackable.menu').append(loggedInDiv);

    $('logoutButton').click(function() {
        if (storage['auth']) {
            logoutUrl = "http://localhost:8080/member/auth";
            $.ajax({
                url : logoutUrl + "/" + storage['auth'],
                type : 'DELETE',
                contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
                success : function(data) {
                    if (data.status == 200) {
                        alert('success');
                        storage['userId'].clear();
                        storage['auth'].clear();
                        window.location.assign("http://localhost:9000/index.html");
                    } else {
                        alert('logout not successful');
                        return false;
                    }
                }
            });
        }
    });
}