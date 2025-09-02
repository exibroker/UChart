import { init } from 'ulacharts'

const chart = init('createIndicator-paneOptions-basic-chart')
chart.createIndicator('VOL', false, { height: 200, dragEnabled: false })

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
