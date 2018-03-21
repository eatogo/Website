var storage = sessionStorage;
var UID = storage['auth'];
var authUrl = "http://localhost:8080/member/auth/";
var loginUrl = "http://localhost:9000/auth/login.html";
var getLikesUrl = "http://localhost:8080/store/statistic/likes/";
var getFavoritesUrl = "http://localhost:8080/store/statistic/favorites/";

$(document).ready(function() {
    checkLoginStatus();
    setLikes();
    setFavorites();
});

function checkLoginStatus() {
    if (UID) {
        $.get(authUrl + UID, {}, function(data) {
            if (data.status != 200) {
                storage.clear();
                window.location.assign(loginUrl);
            }
        })
    } else {
        storage.clear();
        window.location.assign(loginUrl);
    }
}

function setLikes() {
    $.get(getLikesUrl + storage['storeId'], {}, function(data) {
        if (data.likes != null) {
            $('#likesDiv').text(formatNumber(data.likes));
        } else {
            $('#likesDiv').text(0);
        }
    })
}

function formatNumber(num) {
    num = num.toString().replace(/\$|\,/g,'');
    if(isNaN(num))
        num = "0";
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++) {
        num = num.substring(0,num.length-(4*i+3)) + ',' +
            num.substring(num.length-(4*i+3));
    }
    return num;
}

function setFavorites() {
    $.get(getFavoritesUrl + storage['storeId'], {}, function(data) {
        if (data.favorites != null) {
            $('#favoritesDiv').text(formatNumber(data.favorites));
        } else {
            $('#favoritesDiv').text(0);
        }
    })
}