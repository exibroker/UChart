import { init, registerIndicator, getFigureClass } from 'ulacharts'

registerIndicator({
  name: 'customIndicatorDraw',
  shortName: 'Volume',
  zLevel: -1,
  figures: [],
  calc: dataList => dataList.reduce((prev, data) => {
    prev[data.timestamp] = { volume: data.volume, close: data.close, open: data.open }
    return prev
  }, {}),
  createTooltipDataSource: ({ indicator, crosshair }) => {
    const result = indicator.result
    const data = result[crosshair.kLineData.timestamp]
    if (data) {
      const color = data.open < data.close ? 'rgb(224, 152, 199)' : 'rgb(143, 211, 232)'
      return {
        legends: [
          { title: '', value: { text: data.volume, color } }
        ]
      }
    }
    return {}
  },
  draw: ({ ctx, chart, indicator, bounding, xAxis }) => {
    const { realFrom, realTo } = chart.getVisibleRange()
    const { gapBar, halfGapBar } = chart.getBarSpace()
    const dataList = chart.getDataList()
    const { result } = indicator
    let maxVolume = 0
    for (let i = realFrom; i < realTo; i++) {
      const kLineData = dataList[i]
      if (kLineData) {
        const data = result[kLineData.timestamp]
        if (data) {
          maxVolume = Math.max(maxVolume, data.volume)
        }
      }
    }
    const totalHeight = bounding.height * 0.4
    const Rect = getFigureClass('rect')
    for (let i = realFrom; i < realTo; i++) {
      const kLineData = dataList[i]
      if (kLineData) {
        const data = result[kLineData.timestamp]
        if (data) {
          const height = Math.round(data.volume / maxVolume * totalHeight)
          const color = data.open < data.close ? 'rgba(224, 152, 199, 0.6)' : 'rgba(143, 211, 232, 0.6)'
          new Rect({
            name: 'rect',
            attrs: {
              x: xAxis.convertToPixel(i) - halfGapBar,
              y: bounding.height - height,
              width: gapBar,
              height
            },
            styles: { color }
          }).draw(ctx)
        }
      }
    }
    return true
  }
})

const chart = init('custom-indicator-draw-chart')

chart.createIndicator('customIndicatorDraw', false, { id: 'candle_pane' })

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
