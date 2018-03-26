var storage = sessionStorage;
var UID = storage['auth'];
var authUrl = "http://localhost:8080/member/auth/";
var loginUrl = "http://localhost:9000/auth/login.html";
var landingUrl = "http://localhost:9000/store/landing.html";
var getOrdersUrl = "http://localhost:8080/store/order/";
var noOrderDiv = "<div class='text-white'>無訂單</div>";

$(document).ready(function() {
    checkLoginStatus();
    setOrders();
});

function checkLoginStatus() {
    if (UID) {
        $.get(authUrl + UID, {}, function(data) {
            if (data.status != 200) {
                storage.clear();
                window.location.assign(loginUrl);
            }
        });
    } else {
        storage.clear();
        window.location.assign(loginUrl);
    }
}

function setOrders() {
    if (storage['storeId']) {
        $.get(getOrdersUrl + storage['storeId'], {}, function(data) {
            if (data.status == 200) {
                console.log(data.orderPayload);
                storage['orderPayload'] = data.orderPayload;
                splitPayload();
                showOrders();
            }
        })
    } else {
        window.location.assign(landingUrl);
    }
}

function splitPayload() {
    if (storage['orderPayload'] != "null") {
        var orderPayload = jQuery.parseJSON(storage['orderPayload']);
        storage['orderedOrders'] = JSON.stringify(orderPayload.ordered);
        storage['unfinishedOrders'] = JSON.stringify(orderPayload.unfinished);
        storage['finishedOrders'] = JSON.stringify(orderPayload.finished);
    }
}

function showOrders() {
    $('div.item.text-white').click(function(e) {
        e.stopPropagation();
        var orderType = $(this).attr('data-tab');
        alert(orderType);
        if (orderType == "ordered") {
            showOrderedOrder();
        } else if (orderType == "unfinished") {
            showUnfinishedOrder();
        } else if (orderType == "finished") {
            showFinishedOrder();
        }
    });
}

function showOrderedOrder() {
    var orderedOrderStackableDiv = $('div.ui.tab[data-tab="ordered"] > div.ui.stackable.grid');
    if (orderedOrderStackableDiv.children().length > 0) {
        while(orderedOrderStackableDiv.children().length >= 1) {
            orderedOrderStackableDiv.children().remove();
        }
    }
    var orderedOrders = jQuery.parseJSON(storage['orderedOrders'])[0].ordered_orders;
    console.log(orderedOrders);
    if (orderedOrders.length > 0) {
        for (var key = 0; key < orderedOrders.length; key++) {
            var orderedOrder = orderedOrders[key];
            var orderNote = orderedOrder.orderNote;
            if (orderNote == null) {
                orderNote = "";
            }
            var orderedOrderRowDiv =
                "<div class=' row orderRow' data-order='" + orderedOrder.orderId + "'>" +
                    "<div class='four wide center aligned column'>" + 
                        "<div class='row'>" +
                            "<p class='ui horizontal bulleted list>" +
                                "<span class='item text-white'>" + orderedOrder.orderUserName + "</span>" +
                                "<span class='item text-white'>" + orderedOrder.orderTime + "</span>" +
                            "</p>" +
                        "</div>" +
                        "<div class='row'>" +
                            "<span class='text-warning'>" + orderedOrder.orderUserCellphone + "</span>" +
                        "</div>" +
                        "<div class='row'>" +
                            "<span class='text-warning'>" + orderNote + "</span>" +
                        "</div>" +
                    "</div>" + 
                    "<div class='eight wide column orderDetail' data-order='" + orderedOrder.orderId + "'>" + 
                    "</div>" + 
                    "<div class='four wide center aligned column'>" + 
                        "<button class='large ui button warning' data-order='" + orderedOrder.orderId + "'>確認接單</button>" +
                    "</div>" + 
                "</div>";
            orderedOrderStackableDiv.append(orderedOrderRowDiv);
            for (var detailKey = 0; detailKey < orderedOrder.orderDetails.length; detailKey++) {
                var orderedOrderDetail = orderedOrder.orderDetails[detailKey];
                var orderedOrderDetailRowDiv = 
                    "<div class='row'>" +
                        "<div class='ui horizontal bulleted list'>" +
                            "<span class='item text-white'>" + orderedOrderDetail.foodName + "</span>" +
                            "<span class='item text-white'>" + orderedOrderDetail.orderQuantity + "</span>" +
                            "<span class='item text-warning'>NT&dollar;" + orderedOrderDetail.foodPrice + "</span>" +
                        "</div>" +
                    "</div>";
                $('div.orderDetail[data-order="' + orderedOrder.orderId + '"]').append(orderedOrderDetailRowDiv);
            }
        }
    } else {
        $('div.ui.tab[data-tab="ordered"').append(noOrderDiv);
    }
}

function showUnfinishedOrder() {
    var unfinishedOrders = jQuery.parseJSON(storage['unfinishedOrders'])[0].unfinished_orders;
    var unconfirmedStoreOrders = jQuery.parseJSON(storage['unfinishedOrders'])[1].unconfirmed_store_orders;
    console.log(unfinishedOrders);

}

function showFinishedOrder() {
    var unconfirmedUserOrders = jQuery.parseJSON(storage['finishedOrders'])[0].unconfirmed_user_orders;
    var finishedOrders = jQuery.parseJSON(storage['finishedOrders'])[1].finished_orders;
    console.log(finishedOrders);
    for (var key = 0; key < finishedOrders.length; key++) {
        period = setPeriodText(finishedOrders[key].orderTakeoutPeriod);
        var finishedOrderRowDiv = 
            "<div class='row orderRow' data-order='" + finishedOrders[key].orderId + "'>" +
                "<div class='four wide center aligned column'>" +
                    "<div class='row'>" +
                        "<p class='ui horizontal bulleted list'>" +
                            "<span class='item text-white'>" + finishedOrders[key].orderUserName +
                            "</span>" +
                            "<span class='item text-white'>" + period +
                            "</span>" +
                        "</p>" + 
                    "</div>" +
                    "<div class='row'>" +
                        "<span class='text-watning'>" + finishedOrders[key].orderUserCellphone + "</span>" +
                    "</div>" +
                    "<div class='row'>" +
                    "<span class='text-watning'>" + finishedOrders[key].orderNote + "</span>" +
                    "</div>" +
                "</div>" +
                "<div class='eight wide column'>" +
                "</div>" +
                "<div class='four wide center aligned column'>" +
                    "<p class='text-white'>" + finishedOrders[key].orderConfirmUserName + "</p>" +
                    "<button data-order='" + finishedOrders[key].orderId + "' class='large ui button warning'>出貨完成</button>" +
                "</div>" + 
            "</div>";
    }
}

function setPeriodText(period) {
    switch (period) {
        case "A":
        return "0000-0100";
        break;
        case "B":
        return "0100-0200";
        break;
        case "C":
        return "0200-0300";
        break;
        case "D":
        return "0300-0400";
        break;
        case "E":
        return "0400-0500";
        break;
        case "F":
        return "0500-0600";
        break;
        case "G":
        return "0600-0700";
        break;
        case "H":
        return "0700-0800";
        break;
        case "I":
        return "0800-0900";
        break;
        case "J":
        return "0900-1000";
        break;
        case "K":
        return "1000-1100";
        break;
        case "L":
        return "1100-1200";
        break;
        case "M":
        return "1200-1300";
        break;
        case "N":
        return "1300-1400";
        break;
        case "O":
        return "1400-1500";
        break;
        case "P":
        return "1500-1600";
        break;
        case "Q":
        return "1600-1700";
        break;
        case "R":
        return "1700-1800"
        break;
        case "S":
        return "1800-1900";
        break;
        case "T":
        return "1900-2000";
        break;
        case "U":
        return "2000-2100";
        break;
        case "V":
        return "2100-2200";
        break;
        case "W":
        return "2200-2300";
        break;
        case "X":
        return "2300-0000";
        break;
        default:
        return "";
        break;
    }
}