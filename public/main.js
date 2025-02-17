const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageAside = document.querySelector('#message')

update.addEventListener('click', _ =>{
    // send put request here
    fetch('/quotes', {
        method: 'put',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'Darth Vader', 
            quote: 'I find your lack of faith disturbing.',
        }),
    })
    .then(res => {
        if(res.ok) return res.json()
    })
    .then(response => {
        //console.log(response)
        window.location.reload(true) //immediate updates the DOM to see changes
    })
})

deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Darth Vader'
      })
    })
    .then(res => {
        if(res.ok) return res.json()
    })
    .then(response => {
        if(response === 'No quote to delete') {
          messageAside.textContent = 'No Darth Vader quote to delete'
        }else {
          window.location.reload(true)
        }
    })
    .catch(console.error)
})