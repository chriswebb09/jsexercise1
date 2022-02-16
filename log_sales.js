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

var sales = [
    {
        "salesperson": "James D. Halpert",
        "client": "Shake Shack",
        "reams": 100
    },
    {
        "salesperson": "Stanley Hudson",
        "client": "Toast",
        "reams": 400
    },
    {
        "salesperson": "Micheal. G Scott",
        "client": "Computer Science Department",
        "reams": 1000
    }
];

var used_clients = [];

const user_name = "Michael Scotland";
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

function addSaleItem(sale) {
    $('#sale-list').append("<div class='sale-item row'><div class='entry-text col-sm-3 text-left'>" + sale["salesperson"] + "</div><div class='entry-text col-sm-4 text-left'>" + sale["client"] + "</div><div class='entry-text col-sm-1'>" + sale["reams"] + "</div><div class='col-sm-2'></div><div class='col-sm-1'><button type='button' class='delete-button btn btn-warning'><img src='" + url_element + "' width='20'/></button></div></div>");
}

function updateSales(saleslist) {
    console.log(saleslist);
    $('#sale-list').empty();
    $.each(sales, function(index, sale) {
        addSaleItem(sale);
    });
}

function addToSales(sales, salesperson, client, reams) {
    var newSale = {
        "salesperson":  salesperson,
        "client": client,
        "reams": reams
    };
    sales.push(newSale);
    updateSales(sales);
}

function isEmpty(str) {
    return (!str || str.length === 0 );
}

function enterContent() {
    var client = $('#client-text-form').val();
    var reams = $('#reams-text-form').val();
    
    if (isEmpty(client)) {
        alert("You must enter a client name.");
        document.getElementById("client-text-form").focus();
        return;
    }
    
    if (isEmpty(reams)) {
        alert("You must enter a value");
        document.getElementById("reams-text-form").focus();
        return;
    }

    if (isNaN(parseInt(reams))) {
        alert("Entry must be a number");
        document.getElementById("reams-text-form").focus();
        return;
    }

    if (!clients.includes(client)) {
        clients.push(client);
        $('#client-text-form').autocomplete({
            source: clients
        });
    }
    show();
    addToSales(sales, user_name, client, reams);
    clearEntry();
    document.getElementById("client-text-form").focus();
}

$(document).ready(function() {
    updateSales(sales);
    $('#client-text-form').autocomplete({
        source: clients
    });

    $(document).on("click", "#submit-button", function() {
        enterContent();
    });

    $(document).on('keypress',function(e) {
        if(e.which == 13) {
            var hasFocus = $('#reams-text-form').is(':focus');
            if (hasFocus) {
                enterContent();
            }
        }
    });
    
    $(document).on("click", ".delete-button", function() {
        var parent = $(this).parent().parent();
        var entryText = $(parent).find('.entry-text');
        var salesperson = entryText[0].innerHTML;
        var client = entryText[1].innerHTML;
        var reams = entryText[2].innerHTML;
        var combined = "" + salesperson + client + reams;
        sales = sales.filter(sale => "" + sale["salesperson"] + sale["client"] + sale["reams"] != combined);
        updateSales(sales);
        var emptyList = $("#sale-list").html() === "";
        if (emptyList) {
            hide();
        }
    });
});


