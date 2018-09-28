const ctx5 = document.getElementById('canvas5').getContext('2d')

Chart.defaults.scale.gridLines.display = false
Chart.scaleService.updateScaleDefaults('linear', {
    ticks: {
        min: 0
    }
});

const drawGraph2 = () => {
    
  return fetch('http://localhost:3000/metas/list-for-chart')
  .then(result => result.json())
  .then(metas => {
    console.log(metas[0].cantidad)
    cantidad = []
    labels = []
    for(i = 0; i < metas.length; i++){
      cantidad.push(metas[i].cantidad)
      labels.push(metas[i].concepto)
    }
    
    console.log(cantidad)
    var myChart = new Chart(ctx5, {
    type: 'horizontalBar',
    data: {
        labels,
        datasets: [{
            data: cantidad,
            backgroundColor: [
                '#FF6283',
                '#009DF8',
                '#FFCC6A',
                '#3DC0BF',
                '#C9CBCF',
                '#FFB880'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,

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
    
drawGraph5()