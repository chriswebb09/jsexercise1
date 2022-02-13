var clients = [
    "Shake Shack",
    "Toast",
    "Computer Science Department",
    "Teacher's College",
    "Starbucks",
    "Subsconsious",
    "Flat Top",
    "Joe's Coffee",
    "Max Caffe",
    "Nussbaum & Wu",
    "Taco Bell",
];

var used_clients = [];

const user_name = "Michael G. Scott";
const url_element = "https://icones.pro/wp-content/uploads/2021/08/icone-x-noir.png";

function show() {
    var listHeader = document.getElementById("sale-list-header");
    if (listHeader.style.display === "none") {
        listHeader.style.display = "";
    }
}

function hide() {
    var listHeader = document.getElementById("sale-list-header");
    listHeader.style.display = "none";
}

function removeClientAndUpdateList(client) {
    clients = clients.filter(item => item !== client);
    $('#client-text-form').autocomplete({
        source: clients
    });
}

function clearEntry() {
    $('#client-text-form').val("");  
    $('#reams-text-form').val("");
}

function addSaleItem(client, reams) {
    $('#sale-list').append("<div class='sale-item row'><div class='entry-text col-sm-3 text-left'>" + user_name + "</div><div class='entry-text col-sm-4 text-left'>" + client + "</div><div class='entry-text col-sm-1'>" + reams + "</div><div class='col-sm-2'></div><div class='col-sm-1'><button type='button' class='delete-button btn btn-warning'><img src='" + url_element + "' width='20'/></button></div></div>");
}

$(document).ready(function() {
    hide();

    $('#client-text-form').autocomplete({
        source: clients
    });

    $(document).on("click", "#submit-button", function() {
        var client = $('#client-text-form').val();
        var reams = $('#reams-text-form').val();
        clients = clients.filter(item => item !== client);
        removeClientAndUpdateList(client);
        show();
        addSaleItem(client, reams);
        clearEntry();
    });
    
    $(document).on("click", ".delete-button", function() {
        var parent = $(this).parent().parent();
        var entryText = parent.find('.entry-text');
        var item = entryText[1];
        clients.push($(item).text());
        $('#client-text-form').autocomplete({
            source: clients
        });
        parent.remove();
    });
});

