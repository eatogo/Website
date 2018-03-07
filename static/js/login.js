var storage = sessionStorage;

$(document).ready(function () {
    // binding DOM
    loginCellphone = $('#userCellphone');
    loginPassword = $('#userPassword');
    UID = storage['auth'];
    errorMessageDiv = $('.ui.error.message');

    setFormValidationRules();

    // setting submit button click event listener
    $('.large.ui.button.submitButton').click(function (e) {
        e.preventDefault();
        
        loginUrl = "http://localhost:8080/member/login";
        authUrl = "http://localhost:8080/member/auth";
        
        if( $('.ui.form').form('is valid')) {
            // form is valid
            if (!UID) {
                // UID not exists
                $.ajax({
                    url : loginUrl + "/" + loginCellphone.val() + "/" + loginPassword.val(),
                    type : 'GET',
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
    });
});

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