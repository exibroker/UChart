import { init } from 'ulacharts'

const chart = init('createIndicator-paneOptions-axis-chart')
chart.createIndicator(
  'MA',
  false,
  {
    id: 'candle_pane',
    axis: {
      createTicks: ({ defaultTicks }) => {
        return defaultTicks.map(
          ({ coord, value, text }) => ({ coord, value, text: `$${text}` })
        )
      }
    }
  }
)

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
