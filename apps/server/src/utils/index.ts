export const get4RandomChars = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let randomstring = ''
  for (let i = 0; i < 4; i++) {
    const rnum = Math.floor(Math.random() * chars.length)
    randomstring += chars.substring(rnum, rnum + 1)
  }
  return randomstring
}

export const getRandomNumberInRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}
