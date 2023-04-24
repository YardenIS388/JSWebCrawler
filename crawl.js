const {JSDOM} =require('jsdom')

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
    getURLsFromHTML
}