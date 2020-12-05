
// Fetch call for the client side only to take action on URL
// DOM 

const searchForm = document.querySelector('.SearchForm')
const searchInput = document.querySelector('input')
const message1 = document.getElementById('message-1')
const message2 = document.getElementById('message-2')

searchForm.addEventListener('submit',(e)=>{
    
    const location = searchInput.value

    message1.textContent = "Loading..."
    message2.textContent = ''


    fetch('http://localhost:3000/weatherupdate?address='+location).then((response)=>{
            response.json().then((data)=>{
            
                if(data.error){
                message1.textContent = data.error
            }
            else{
                message1.textContent = data.location
                message2.textContent = data.forecast
            }
        }) 
    })
    e.preventDefault()
})

