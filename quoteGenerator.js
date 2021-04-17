const quotes_api_url = "https://type.fit/api/quotes"
async function getQuotes(){
    const response = await fetch(quotes_api_url)
    const data = await response.json()
    const quotes = [...data]
    
    let btn = document.getElementById('button')

    btn.addEventListener('click', function(){
    let randomeNum = Math.floor(Math.random()*quotes.length)
    output__Quotes.innerHTML = quotes[randomeNum]['text']
    output__Author.innerHTML= quotes[randomeNum]['author']
})
}

getQuotes()


