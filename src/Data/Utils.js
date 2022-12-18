export const formatNumbers = (number) =>{
    console.log(number)
    return String(number).replace(/(.)(?=(\d{3})+$)/g,'$1,')
}