console.log('Client part')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message = document.querySelector('#message-1')
const error = document.querySelector('#message-2')
weatherForm.addEventListener(('submit'),(e) =>{
    e.preventDefault()
    message.textContent = 'loading.......'
    error.textContent = ''

    fetch('http://localhost:3000/weather?address='+search.value).then((response) => {
    response.json().then((data) => {
        if(data.error){
            message.textContent = ''
            error.textContent = data.error
        }
        else{
            message.textContent = data.location
            error.textContent = data.forcast

        }

    })
  
})
})