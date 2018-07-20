export const normalizePhone = value => {
    if (!value) {
      return value
    }
  
    const onlyNums = value.replace(/[^\d]/g, '')
    if (onlyNums.length <= 3) {
      return onlyNums
    }
    if (onlyNums.length <= 7) {
      return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`
    }
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 10)}`
  }
  
export const normalizeDosesPerDay = value => {
  if (value > 9)
    return 9;

  if (value < 1)
    return 1;
  
  return value;
}
