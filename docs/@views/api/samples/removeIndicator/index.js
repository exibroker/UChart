import { init } from 'ulacharts'

const chart = init('removeIndicator-chart')
chart.createIndicator('MA', false, { id: 'candle_pane' })
chart.createIndicator('VOL')

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
  chart.removeIndicator({ name: 'MA' })
}, 5000)
