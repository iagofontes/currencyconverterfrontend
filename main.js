loadCurrencies();
// var element = document.getElementById("form1")
// element.addEventListener("submit", function(evt) {
//     evt.preventDefault();
//     submitForm(evt);
// });

function submitForm($event) {
    $event.preventDefault();
    console.log($event.target.moeda_base.value)
    const dto = {
        "base_currency": $event.target.moeda_base.value,
        "destination_currency": $event.target.moeda_destino.value,
        "amount": parseFloat($event.target.valor_conversao.value)
    }
    console.log(JSON.stringify(dto));
    fetch(
        "http://localhost:8080/convert",
        {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dto)
        }
    )
    .then((response) => response.json(), (err) => console.error(err))
    .then((apiResponse) => console.log(apiResponse), (errApi) => console.error(errApi));

}

function loadCurrencies() {
    let currencies = [];

    var selectMoedaBase = document.getElementById("moeda_base");
    var selectMoedaDestino = document.getElementById("moeda_destino");

    fetch("http://localhost:8080/symbols")
        .then(
            (response) => {
                return response.json()
            },
            (err) => console.error(err)
        )
        .then(
            (apiResponse) => {
                console.log(apiResponse)
                currencies = apiResponse;
            },
            (apiError) => console.error(apiError)
        )
        .finally(() => {
            currencies.forEach(currency => {
                option = document.createElement('option');
                option.setAttribute('value', currency.symbol);
                option.appendChild(document.createTextNode(currency.symbol + " - " + currency.country));
                selectMoedaBase.appendChild(option);
            });
            currencies.forEach(currency => {
                option = document.createElement('option');
                option.setAttribute('value', currency.symbol);
                option.appendChild(document.createTextNode(currency.symbol + " - " + currency.country));
                selectMoedaDestino.appendChild(option);
            });
        });

}
