import { init, registerIndicator } from 'ulacharts'

registerIndicator({
  name: 'customIndicatorTooltip',
  shortName: 'Tooltip',
  series: 'price',
  figures: [{
    key: 'close',
    title: 'close: ',
    type: 'line'
  }],
  calc: dataList => dataList.reduce((prev, data) => {
    prev[data.timestamp] = { close: data.close }
    return prev
  }, {}),
  createTooltipDataSource: ({ indicator, crosshair }) => {
    const result = indicator.result
    const data = result[crosshair.kLineData.timestamp]
    if (data) {
      return {
        legends: [
          { title: 'CLOSE: ', value: data.close },
          { title: 'random: ', value: Math.round(Math.random() * 10) }
        ]
      }
    }
    return {}
  }
})

const chart = init('custom-indicator-tooltip-chart')

chart.createIndicator('customIndicatorTooltip')

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
