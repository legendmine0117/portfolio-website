fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    let quotes = [...data]
    let btn = document.getElementById('button')
    let output = document.getElementById('output')
    btn.addEventListener('click', function(){
    let randomeNum = Math.floor(Math.random()*quotes.length)
    output__Quotes.innerHTML = quotes[randomeNum]['text']
    output__Author.innerHTML= quotes[randomeNum]['author']
})
  });
