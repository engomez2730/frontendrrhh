const calculateMonths = (date1,date2) =>{
    return (date1 - date2) / (1000 * 3600 * 24 * 30);
}

const calculateYears = (date1,date2) =>{
    return parseInt((date1 - date2) / (1000 * 60 * 60 * 24 * 30 * 12))
}
export const vacaciones = (createdAt) =>{

    const meses = calculateMonths(new Date(),new Date(createdAt))
    const years = calculateYears(new Date(),new Date(createdAt))
    if(meses < 5){
        return 'No tiene derechos a vacaciones'
    }else if(meses >= 5 && meses < 6){
        return  6
    }else if(meses >= 6 && meses < 7){
        return  7
    }else if(meses >= 7 && meses <8){
        return  8
    }else if(meses >= 8 && meses <9){
        return 9
    }else if(meses >= 9 && meses <10){
        return 10
    }else if(meses >= 10 && meses <11){
        return 11
    }else if(meses >= 11 && meses <=12){
        return  12
    }else if(meses >= 12 && meses <13){
        return 14
    }else{
        return  18
    }
}

