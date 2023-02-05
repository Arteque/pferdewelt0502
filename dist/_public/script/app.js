document.addEventListener("readystatechange", (e) => {
    if(e.target.readyState === "complete"){
        initApp()
    }
})

//Init
const initApp = () => {
    let maxChars = 100
    let searchTerm = "Pferderassen"
    let limit = 100
    const url = `https://de.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchTerm}&gsrlimit=${limit}&prop=pageimages|extracts&exchars=${maxChars}&exintro&explaintext&exlimit=max&format=json&origin=*`
    const searchString = encodeURI(url)
    return searchString
}

let dataArr = []
fetch(initApp())
.then(result => result.json())
.then(data => {
    let pages = Object.entries(data.query.pages)

    pages.forEach(page => {
        console.log(page[1])
        let pageData = {
            'title': page[1].title,
            'index': page[1].index,
            'pageid':page[1].pageid,
            'pageimagesrc':page[1].thumbnail,
        }
        dataArr.push(pageData)
        
    })
    console.log(dataArr)
   document.body.innerHTML = "<ul>"+dataArr.map((item)=>{
    if(item.title !== "Liste von Pferderassen" || item.title !== "XX"){
        return `<li>${item.title} | ${item.pageimagesrc}</li>`
    }
    
   }).join("")+"</ul>"
})


