$(document).ready(function () {
    // binding DOM
    loginCellphone = $('#userCellphone');
    loginPassword = $('#userPassword');

    $('.large.ui.button.submit').click(function (e) {
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/member/login?userCellphone=" + loginCellphone.val() + "&userPassword=" + loginPassword.val()
        }).then(function (data) {
            console.log(data);
            if (data.status == 200) {
                window.location.assign("http://localhost:9000/store/landing.html");
            } else {

            }
        })
    });
});