var basicMoney = $("#from");
var convertTo = $("#to");
var coursesTable = $("#courses");

var opt, money;

$.getJSON("http://api.nbp.pl/api/exchangerates/tables/A/?format=json", (result) => {
    money = result[0].rates;
    var pln = {
        code: "PLN",
        currency: "polski zloty",
        mid: 1.0
    }
    money[money.length] = pln;
    money.sort((a, b) => {
        if(a.currency < b.currency) return -1;
        if(a.currency > b.currency) return 1;
        return 0;
    })

    for(var i = 0; i < money.length; i++) {
        coursesTable.append("<tr><td>" + money[i].currency + "</td><td>" +  money[i].code + "</td><td>" + money[i].mid + "</td></tr>")

        basicMoney.append($('<option>', {
            value: i,
            text: money[i].currency
        }));

        convertTo.append($('<option>', {
            value: i,
            text: money[i].currency
        }));
    }
});

var amountField = $("#amount");
amountField.change(() => {
    if(amountField.val() < 0)
        amountField.val(1);
    convert();
})


basicMoney.change(convert);
convertTo.change(convert);

function convert() {
    var selectedBasicMoney = basicMoney.val();
    var selectedConvertMoney = convertTo.val();
    if(selectedBasicMoney && selectedConvertMoney) {
        var value = (money[selectedBasicMoney].mid / money[selectedConvertMoney].mid) * amountField.val();
        $('#result').val(value);
    }
}

var showTable = $("#showTable");
showTable.on("click", () => {
    coursesTable.fadeToggle();
})