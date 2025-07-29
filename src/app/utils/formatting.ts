export const formatPhoneNumber = (number: number) => {
  return number.toString().replace(/(\d{3})(\d{3})(\d+)/g, "($1) $2-$3")
}