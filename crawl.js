function normalizeURL(urlString){
    // this function should make the url work with this application 
    //using the built in url constructor
    const urlObject = new URL(urlString)
    const hostPath = `${urlObject.hostname}${urlObject.pathname}`

    //hostPath.slice(-1) return the last charecter of the string
    if(hostPath.length > 0 && hostPath.slice(-1) == '/'){
        //return the string minus the last charecter
        console.log(hostPath)
        return hostPath.slice(0,-1)
    }

    return hostPath
}

module.exports ={
    normalizeURL
}