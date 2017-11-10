window.fbAsyncInit = function() {
    FB.init({
        appId      : '1446633312052757',
        cookie     : true,  // enable cookies to allow the server to access 
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.8' // use graph api version 2.8
    });
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
};
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}
(document, 'script', 'facebook-jssdk'));
function loginFB(){
    FB.login(function(response){
        checkLoginState(response)
    },{scope: 'email'})
}
function logoutFB(){
    FB.logout(function(response){
        checkLoginState(response)
    })
}
function statusChangeCallback(response) {
    if (response.status === 'connected') {
        axios.post('http://localhost:3000/login/fb', {
            accessToken: response.authResponse.accessToken
        })
        .then(function (result) {
            localStorage.setItem('accessToken', result.data.newToken)                        
            testAPI();
        })
        .catch(function (error) {
            console.log(error);
        })
    } else {
        // The person is not logged into your app or we are unable to tell.
        localStorage.removeItem('accessToken')                        
        console.log("Please login!")
    }
}
function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}
// Load the SDK asynchronously
function testAPI() {
    FB.api('/me', function(response) {
        // console.log(response);
    })
}
// document.querySelector("#login").addEventListener('click', function(){
//     let token = localStorage.getItem('accessToken')
//     if(token) {
//         axios.post('http://localhost:3000/login/cekToken', {
//             accessToken: token
//         })
//         .then(function (result) {
//             console.log(result)
//         })
//         .catch(function (error) {
//             console.log(error);
//         })                
//     }
// });


$(function () {
    $('#fLogin').hide()
    $('#btn-up').hide()
    $('#btn-down').click(function(){
        $('#btn-up').show()
        $('#btn-down').hide()
        $('#fLogin').slideDown('slow')
    })
    $('#btn-up').click(function(){
        $('#btn-down').show()
        $('#btn-up  ').hide()
        $('#fLogin').slideUp('slow')
    })
    $('#wrapper .version strong').text('v' + $.fn.pignoseCalendar.ComponentVersion);
    function onSelectHandler(date, context) {
        var $element = context.element;
        var $calendar = context.calendar;
        var $date = $('#date');
        var text = '';

        if (date[0] !== null) {
            text += date[0].format('YYYY-MM-DD');
        }

        if (date[0] !== null && date[1] !== null) {
            text += ' ~ ';
        }
        else if (date[0] === null && date[1] == null) {
            text += 'nothing';
        }

        if (date[1] !== null) {
            text += date[1].format('YYYY-MM-DD');
        }
        $date.val(text);
        $('#main-task').modal('toggle')
    }
    $('.calendar').pignoseCalendar({
        select: onSelectHandler
    });
}); 