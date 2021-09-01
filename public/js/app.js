

const weatherForm = document.querySelector('form')
const search =document.querySelector('input')
const messageOne = document.querySelector('#p1')
const messageTwo = document.querySelector('#p2')
// messageOne.textContent='from client side java script'
weatherForm.addEventListener('submit', (e)=>{

    e.preventDefault()
    const location  = search.value
    messageOne.textContent='loading...'
    messageTwo.textContent = ''
    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
    response.json().then(data=>{
        if(data.error){
             messageOne.textContent = data.error
        }else{
            messageOne.textContent = `tempratue:${data.forecast.temprature},feelsLike:${data.forecast.feelslike}`
            messageTwo.textContent = data.location;
        console.log(data);
        }
    })
})
   
})