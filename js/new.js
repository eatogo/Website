$(document).ready(function() {
    defaultSignIn();

    $('#switchButton').click(function () {
        switchSignInSignUp();
    });
});

function defaultSignIn() {
    $('#nameGroup').hide();
    $('#emailGroup').hide();
    $('#passwordAgainGroup').hide();
}

function switchSignInSignUp() {
    if ($('#switchButton').html() == 'Sign Up') {
        $('#switchButton').text('Sign In');
        $('.info-wrapper').css('top', '23%');
        $('#signInFormLabel').text('Sign Up');
    } else {
        $('#switchButton').text('Sign Up');
        $('.info-wrapper').css('top', '30%');
        $('#signInFormLabel').text('Sign In');
    }
    $('#nameGroup').toggle();
    $('#emailGroup').toggle();
    $('#passwordAgainGroup').toggle();
}