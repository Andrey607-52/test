const inputOne = document.getElementById('input1')
const inputTwo = document.querySelector('#input2')
const btn = document.getElementById('btn')
const output = document.getElementById('output')




btn.addEventListener('click', (e) =>{
    e.preventDefault()
    const numberOrNan1 = Number(inputOne.value)
    const numberOrNan2 = Number(inputTwo.value)
    let result = ''

    if (isNaN(numberOrNan1) && isNaN(numberOrNan2)) {
        result = 'Ошибки в обоих полях'
    }
    if (isNaN(numberOrNan1) && !isNaN(numberOrNan2)) {
        result = 'Ошибка в 1 инпуте'
    }
    if (!isNaN(numberOrNan1) && isNaN(numberOrNan2)) {
        result = 'Ошибка во 2 инпуте'
    }
    if (!isNaN(numberOrNan1) && !isNaN(numberOrNan2)) {
        result = `Результат = ${numberOrNan1 + numberOrNan2}`
    }

    output.innerText = result
})
