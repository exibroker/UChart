import { init } from 'ulacharts'

const chart = init('createIndicator-object-chart')
chart.createIndicator({
  name: 'MA',
  shouldOhlc: false,
  precision: 1,
  calcParams: [10, 30],
  styles: {
    lines: [
      { color: '#8fd3e8' },
      { color: '#edafda' }
    ]
  }
})

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
