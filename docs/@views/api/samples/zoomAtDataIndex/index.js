import { init } from 'ulacharts'

const chart = init('zoomAtDataIndex-chart')

chart.setSymbol({ ticker: 'TestSymbol' })
chart.setPeriod({ span: 1, type: 'day' })
chart.setDataLoader({
  getBars: ({
    callback
  }) => {
    fetch('https://ulacharts.com/datas/kline.json')
      .then(res => res.json())
      .then(dataList => {
        callback(dataList)
      })
  }
})

setTimeout(() => {
  chart.zoomAtDataIndex(0.8, chart.getDataList().length - 50, 200)
}, 5000)
