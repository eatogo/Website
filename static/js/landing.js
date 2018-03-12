var storage = sessionStorage;
var UID = storage['auth'];
var loginUrl = "http://localhost:9000/auth/login.html";
var navbar = $('.ui.secondary.stackable.menu');
var loggedInDiv = 
    '<div class="mobile-item custom-mobile-hide right menu" hidden>' + 
        '<div class="ui dropdown item">' + 
            '<div id="userImgDiv" class="text">' + 
                '<img id="userImg" class="ui avatar image">' +
            '</div>' + 
            '<i class="dropdown icon text-white"></i>' + 
            '<div class="menu">' + 
                '<a id="logoutButton" class="item custom-font-thin">登出</a>' + 
            '</div>' + 
        '</div>' + 
    '</div>';
var defaultAvatar = "/static/images/defaultAvatar.png";
var logoutUrl = "http://localhost:8080/member/auth";
var indexUrl = "http://localhost:9000/index.html";
var navbarMenuIcon = $('.ui.toggle.icon');
var navbarMenuItem = $('.mobile-item');
var mainContainer = $('.ui.main.container');

$(document).ready(function() {
    checkLoginStatus();
});

function checkLoginStatus() {
    if (UID) {
        createLoggedInSection();
    } else {
        window.location.assign(loginUrl);
    }
}

function createLoggedInSection() {
    navbar.append(loggedInDiv);
    setLoggedInDivInfo();
    setLogoutButtonClickEventListener();
}

function setLoggedInDivInfo() {
    var userImg = $('#userImg');
    userImg.attr('alt', storage['userName']);
    if (storage['userAvatar'] == 'null') {
        userImg.attr('src', defaultAvatar);
    } else {
        userImg.attr('src', storage['userAvatar']);
    }
    var userNameSpan = "<span class='text-warning'> " + storage['userName'] + "</span>";
    var userImgDiv = $('#userImgDiv');
    userImgDiv.append(userNameSpan);
}

function setLogoutButtonClickEventListener() {
    var logoutButton = $('#logoutButton');
    logoutButton.click(function() {
        $.ajax({
            url : logoutUrl + "/" + UID,
            type : 'DELETE',
            contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
            success : function(data) {
                if (data.status == 200) {
                    storage.removeItem('userId');
                    storage.removeItem('auth');
                    storage.removeItem('userName');
                    storage.removeItem('userAvatar');
                    window.location.assign(indexUrl);
                } else {
                    alert('logout unsuccessful');
                    return false;
                }
            }
        });
    });
}

function setCollapsableNavbarMenu() {
    navbarMenuIcon.click(function () {
        navbarMenuItem.toggleClass('custom-mobile-hide');
        navbarMenuIcon.toggleClass('custom-collapse-navbar-button-top');
        if (mainContainer.css('padding-top') == '120px') {
            mainContainer.attr('style', 'padding-top: 296px !important');
        } else {
            mainContainer.attr('style', 'padding-top: 120px !important');
        }
    });
}