$(this).ready(function () {
    // 連結網頁元素
    bindDom();

    // 設定表格檢查條件
    setformValidationRules();

    // 按submit按鈕開始動作
    signupButton.click(function (e) {
        e.preventDefault();
        // 檢查表格
        if ($(formValidated).form('is valid')) {
            alert('validated');
            // 檢查權限以動態調整Navbar
            // authenticate();

            // 註冊
            // signupAjax();
        } else {
            alert('fail');
        }
    })
});

function bindDom() {
    signupForm = $('#signupForm')
    signupName = $('#signupName');
    signupCellphone = $('#signupCellphone');
    signupPassword = $('#signupPassword');
    ConfirmPassword = $('#confirmPassword');
    signupEmail = $('#signupEmail');
    signupButton = $('#signupButton');
}

function setformValidationRules() {
    formValidated = $('.ui.form').form({
        fields: {
            name: {
                identifier: 'signupName',
                rules: [
                    {
                        type: 'empty',
                        prompt: '請輸入您的大號'
                    }
                ]
            },
            cellphone: {
                identifier: 'signupCellphone',
                rules: [
                    {
                        type: 'empty',
                        prompt: '要提供電話，店家才找得到你R'
                    },
                    {
                        type: 'regExp[/^09\d{2}-?\d{3}-?\d{3}$/]',
                        prompt: '這號碼好像不太對喔'
                    }
                ]
            },
            password: {
                identifier: 'signupPassword',
                rules: [
                    {
                        type: 'empty',
                        prompt: '請輸入別人不好猜，但還能記得住的密碼'
                    },
                    {
                        type: 'minLength[6]',
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
            email: {
                identifier: 'signupEmail',
                rules: [
                    {
                        type: 'empty',
                        prompt: '拜偷給一下信箱啦'
                    },
                    {
                        type: 'regExp[/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$/]',
                        prompt: '真的有這個信箱嗎'
                    }
                ]
            }
        }
    });
}

// function authenticate() {

//     $.get('http://localhost:8080/member/auth', {
//         userName : signupName.val(),
//         userCellphone : signupCellphone.val()
//     }, function(data) {
//         // 若已登入則直接跳到store/landing.html
//         if (data == "signin success") {
//             window.location.assign("http://localhost:9000/store/landing.html");
//         }
//     });
    
// }

// function signupAjax() {
//     signupButton.click(function (e) {
//         e.preventDefault();
//         $.ajax({
//             type: "POST",
//             url: "http://localhost:8080/member/signup",
//             data: {
//                 userName: signupName.val(),
//                 userCellphone: signupCellphone.val(),
//                 userPassword: signupPassword.val(),
//                 userEmail: signupEmail.val()
//             },
//             success: function (data) {
//                 console.log(data);
//                 if (data == "signup success") {
//                     console.log("user has been successfully created.");
//                     window.location.assign("http://localhost:9000/store/landing.html");
//                 } else {
//                     window.location.assign()
//                 }
//             }
//         });
//     });
// }