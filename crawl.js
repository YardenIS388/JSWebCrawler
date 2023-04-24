const {JSDOM} =require('jsdom')



async function crawlPage(currentURL){
    console.log(`started crawl at: ${currentURL}`)

    try{
        const resp = await fetch(currentURL)
        if(resp.status > 399){
            console.log(`error in fetch with status code ${resp.status} on page: ${currentURL}`)
            return
        }
        const contentType = resp.headers.get("content-type")
        if(!contentType.includes('text/html')){
            console.log(`the content type does not equal a valid html, content type: ${contentType} on page: ${currentURL} `)
            return
        }
        console.log(await resp.text())
    }catch(error){
        console.log(`there is an error with the fetch: \n ${error.message} \n  on page: ${currentURL}`)
    }
   
}

function getURLsFromHTML(htmlBody, baseURL) {

    const urls = []
    const dom = new JSDOM(htmlBody)

    const linkElements = dom.window.document.querySelectorAll('a')

    for (const linkElement of linkElements ){
        if(linkElement.href.slice(0,1) === '/'){
            try{
                const urlObject = new URL(`${baseURL}${linkElement.href}`)
                urls.push(urlObject.href)
            }catch(error){
                console.log(`there is an error with the realtive url: ${error.message}`)
            }
           
        }else{
            try{
                const urlObject = new URL(linkElement.href)
                urls.push(urlObject.href)
            }catch(error){
                console.log(`there is an error with the absolute url: ${error.message}`)
            }
        }
        
    }

    return urls
}

function normalizeURL(urlString) {
    // this function should make the url work with this application 
    //using the built in url constructor
    const urlObject = new URL(urlString)
    const hostPath = `${urlObject.hostname}${urlObject.pathname}`

    //hostPath.slice(-1) return the last charecter of the string
    if(hostPath.length > 0 && hostPath.slice(-1) == '/'){
        //return the string minus the last charecter
        return hostPath.slice(0,-1)
    }

    return hostPath
}

module.exports ={
    normalizeURL,
    getURLsFromHTML,
    crawlPage

}