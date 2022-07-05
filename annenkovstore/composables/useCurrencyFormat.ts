import { ref } from 'vue'

export function useCurrencyFormat(value) {
  if (typeof value !== 'number') {
    return value
  }
  return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}