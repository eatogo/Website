var storage = sessionStorage;

$(document).ready(function () {
    // 連結網頁元素
    signupName = $('#signupName');
    signupCellphone = $('#signupCellphone');
    signupPassword = $('#signupPassword');
    ConfirmPassword = $('#confirmPassword');
    signupEmail = $('#signupEmail');
    UID = storage['auth'];
    errorMessageDiv = $('.ui.error.message');

    // 設定表格檢查條件
    setformValidationRules();

    // 按submit按鈕開始動作
    $('#signupButton').click(function (e) {
        e.preventDefault();

        signupUrl = "http://localhost:8080/member/signup";
        authUrl = "http://localhost:8080/member/auth";

        // 檢查表格
        if ($('.ui.form').form('is valid')) {
            // form is valid
            if (!UID) {
                // UID not exists
                $.ajax({
                    url : signupUrl,
                    type : 'POST',
                    data: {
                        userName : signupName.val(),
                        userCellphone : signupCellphone.val(),
                        userPassword : signupPassword.val(),
                        userEmail : signupEmail.val()
                    },
                    contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
                    success: function(data) {
                        if (data.status == 200) {
                            clearErrorMessage();
                            alert('success');
                            storage['userId'] = data.auth.userId;
                            storage['auth'] = data.auth.userUuid;
                            window.location.assign("http://localhost:9000/store/landing.html");
                        } else {
                            setErrorMessage();
                            return false;
                        }
                    }
                });
            } else {
                // UID already exists
                $.get(authUrl + "/" + UID
                    , {}, function(data) {
                    if (data.status == 200) {
                        window.location.assign("http://localhost:9000/store/landing.html");
                    } else {
                        setErrorMessage();
                        return false;
                    }
                })
            }
        }
    })
});

function setformValidationRules() {
    $('.ui.form').form({
        fields: {
            signupName: {
                identifier: 'signupName',
                rules: [
                    {
                        type: 'empty',
                        prompt: '請輸入您的大號'
                    }
                ]
            },
            signupCellphone: {
                identifier: 'signupCellphone',
                rules: [
                    {
                        type: 'empty',
                        prompt: '要提供電話，店家才找得到你R'
                    },
                    {
                        type: 'regExp',
                        value: '/^[09]{2}[0-9]{2}-[0-9]{6}$/',
                        prompt: '這號碼好像不太對喔'
                    }
                ]
            },
            signupPassword: {
                identifier: 'signupPassword',
                rules: [
                    {
                        type: 'empty',
                        prompt: '請輸入別人不好猜，但還能記得住的密碼'
                    },
                    {
                        type: 'minLength[3]',
                        prompt: '密碼起碼{ruleValue}個字，別人比較不好猜吧'
                    }
                ]
            },
            confirmPassword: {
                identifier: 'confirmPassword',
                rules: [
                    {
                        type: 'match[signupPassword]',
                        prompt: '兩次輸入的密碼好像不太一樣'
                    }
                ]
            },
            signupEmail: {
                identifier: 'signupEmail',
                rules: [
                    {
                        type: 'empty',
                        prompt: '拜偷給一下信箱啦'
                    },
                    {
                        type: 'regExp',
                        value: '/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$/',
                        prompt: '真的有這種信箱嗎'
                    }
                ]
            }
        },
        inline : true,
        on: 'blur'
    });
}

function setErrorMessage() {
    if (errorMessageDiv.html() == "") {
        errorMessageDiv.toggle();
        errorMessageDiv.html('註冊失敗了orz，請稍後再試');
    }
}

function clearErrorMessage() {
    if (errorMessageDiv.html() != "") {
        errorMessageDiv.toggle();
        errorMessageDiv.html('');
    }
}