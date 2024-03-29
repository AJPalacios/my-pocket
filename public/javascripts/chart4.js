const ctx4 = document.getElementById('canvas4').getContext('2d')

const drawGraph4 = () => {
  return fetch('https://my-pocket.herokuapp.com/diarios/list-for-chart')
  .then(result => result.json())
  .then(diarios => {
    console.log(diarios)
    cantidad = []
    labels = []
    for(i = 0; i < diarios.length; i++){
      cantidad.push(diarios[i].cantidad)
      labels.push(diarios[i].concepto)
    }
    
    console.log(cantidad)
    var myChart = new Chart(ctx4, {
    type: 'line',
    data: {
        labels,
        datasets: [{

            data: cantidad,

            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        legend: {
            display: false
        }
    }
    
});
  })
}
    
drawGraph4()