export function formatMoneyDecimal(number: any, fix = 0, option = 'decimal') {
  let style: string
  if (['USD', 'RUB'].includes(option)) {
    style = 'currency'
  } else if (['kilogram', 'meter', 'percent'].includes(option)) {
    style = 'unit'
  } else {
    style = ''
  }

  const newStyle: string = style
  const option2 = {
    newStyle, //  unit currency percent decimal
    [newStyle]: option,
    maximumFractionDigits: fix,
    minimumFractionDigits: fix,
  }
  return number ? new Intl.NumberFormat('ru-RU', option2).format(number) : '0'
}
export const changeNumberFormat = (number: number) => {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
