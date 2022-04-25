async function main() {

    // const res = await fetch('https://api.twelvedata.com/time_series?symbol=GME, MSFT, DIS, BNTX&interval=1day&format=JSON&apikey=8cd853489812405ebc52a081acb5fc19')


    // const result = await res.json()
    const { GME, MSFT, DIS, BNTX } = mockData;
    // const { GME, MSFT, DIS, BNTX } = result;
    const stocks = [GME, MSFT, DIS, BNTX];

    // stock charts 
    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');
    console.log(timeChartCanvas)

    // creating different color lines for each stock
    function getColor(stock) {
        if (stock === "GME") {
            return 'rgba(61, 161, 61, 0.7)'
        }
        if (stock === "MSFT") {
            return 'rgba(209, 4, 25, 0.7)'
        }
        if (stock === "DIS") {
            return 'rgba(18, 4, 209, 0.7)'
        }
        if (stock === "BNTX") {
            return 'rgba(166, 43, 158, 0.7)'
        }
    }

    // reversing the order of dates from descending to ascending 
    stocks.forEach(stock => stock.values.reverse())
        // displaying chart 
    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            // labels set for each datetime in mockdata
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map(stock => ({
                label: stock.meta.symbol,
                // graphing each stocks highest price of the day for each day
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
            }))
        }
    });

    // looking though value.high and returning the highest price for each stock
    function findHighest(values) {
        let highest = 0;
        values.forEach(value => {
            if (parseFloat(value.high) > highest) {
                highest = value.high
            }
        })
        console.log(highest)
        return highest
    }

    // finding average price of each stock by adding value.high and dividing by values.length
    function findAverage(values) {
        let total = 0;
        values.forEach(value => {
            total += parseFloat(value.high)
        })

        return total / values.length
    }

    // highest price bar graph
    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
                label: "Highest",

                backgroundColor: stocks.map(stock => getColor(stock.meta.symbol)),
                borderColor: stocks.map(stock => getColor(stock.meta.symbol)),
                data: stocks.map(stock => (
                    findHighest(stock.values)

                )),
            }]

        }
    });

    // pie chart for average price
    new Chart(averagePriceChartCanvas.getContext('2d'), {
        type: 'pie',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
                label: "Highest",
                backgroundColor: stocks.map(stock => getColor(stock.meta.symbol)),
                borderColor: stocks.map(stock => getColor(stock.meta.symbol)),
                data: stocks.map(stock => (
                    findAverage(stock.values)
                )),
            }]

        }
    })
}


main()