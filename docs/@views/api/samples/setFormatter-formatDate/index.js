import { init, utils } from 'ulacharts'

const chart = init('setFormatter-formatDate-chart')

chart.setFormatter({
  formatDate: ({
    dateTimeFormat,
    timestamp,
    type
  }) => {
    switch (type) {
      case 'tooltip': {
        return utils.formatDate(dateTimeFormat, timestamp, 'YYYY-MM-DD HH:mm')
      }
      case 'crosshair': {
        return utils.formatDate(dateTimeFormat, timestamp, 'YYYY-MM-DD')
      }
      case 'xAxis': {
        return utils.formatDate(dateTimeFormat, timestamp, 'MM-DD')
      }
    }
    return utils.formatDate(dateTimeFormat, timestamp, 'MM-DD HH:mm')
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
