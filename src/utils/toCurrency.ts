const toCurrency = (value?: string | number): string => {
  if(!value) {
    return '0';
  }

  if(typeof value === 'string') {
    return Number.parseFloat(value).toFixed(2).toString();
  }

  return Number.parseFloat(value.toString()).toFixed(2).toString();
}

export { toCurrency }
