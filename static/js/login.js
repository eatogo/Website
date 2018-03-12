var storage = sessionStorage;
var UID = storage['auth'];
var authUrl = "http://localhost:8080/member/auth";
var storeLandingUrl = "http://localhost:9000/store/landing.html";
var loginButton = $('#loginButton');
var loginForm = $('.ui.form');
var loginUrl = "http://localhost:8080/member/login";
var loginCellphone = $('#userCellphone');
var loginPassword = $('#userPassword');
var errorMessageDiv = $('.ui.error.message');

$(document).ready(function () {
    checkLoginStatus();
    setFormValidationRules();
    setSubmitButtonClickEventListener();
});

function checkLoginStatus() {
    if (UID) {
        $.get(authUrl + "/" + UID, {}, function(data) {
            if (data.status == 200) {
                storage['userName'] = data.user.userName;
                storage['userAvatar'] = data.user.userAvatar;
                window.location.assign(storeLandingUrl);
            }
        })
    }
}

function setFormValidationRules() {
    $('.ui.form').form({
        fields: {
            userCellphone: {
                identifier: 'userCellphone',
                rules: [
                    {
                        type: 'empty',
                        prompt: '拜偷，給一下手機啦！'
                    },
                    {
                        type: 'regExp',
                        value: '/^[09]{2}[0-9]{2}-[0-9]{6}$/',
                        prompt: '這組號碼長相不太對喔，應該是09xx-xxxxxx'
                    }
                ]
            },
            userPassword: {
                identifier: 'userPassword',
                rules: [
                    {
                        type: 'empty',
                        prompt: '沒有密碼，我們該怎麼辦？'
                    }
                ]
            }
        },
        inline : true,
        on: 'blur'
    });
}

function setSubmitButtonClickEventListener() {
    loginButton.click(function (e) {
        e.preventDefault();
        if(loginForm.form('is valid')) {
            $.ajax({
                url : loginUrl + "/" + loginCellphone.val() + "/" + loginPassword.val(),
                type : 'GET',
                contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function(data) {
                    if (data.status == 200) {
                        clearErrorMessage();
                        storage['userId'] = data.auth.userId;
                        storage['auth'] = data.auth.userUuid;
                        storage['userName'] = data.user.userName;
                        storage['userAvatar'] = data.user.userAvatar;
                        window.location.assign(storeLandingUrl);
                    } else {
                        setErrorMessage();
                        return false;
                    }
                }
            });
        }
    });
}

function setErrorMessage() {
    if (errorMessageDiv.html() == "") {
        errorMessageDiv.toggle();
        errorMessageDiv.html('沒有辦法登入唷！');
    }
}

function clearErrorMessage() {
    if (errorMessageDiv.html() != "") {
        errorMessageDiv.toggle();
        errorMessageDiv.html('');
    }
}