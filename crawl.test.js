const {normalizeURL, getURLsFromHTML} = require('./crawl.js')
const {test, expect} = require('@jest/globals')

test('normalizeURL strip protocol', ()=>{
    const input = 'https://blog.boot.dev/path'
    const actual  = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
}) 

test('normalizeURL trim ending ', ()=>{
    const input = 'https://blog.boot.dev/path/'
    const actual  = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
}) 

test('normalizeURL capitals ', ()=>{
    const input = 'https://BLog.boot.dev/path/'
    const actual  = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
}) 

test('normalizeURL strip http ', ()=>{
    const input = 'http://blog.boot.dev/path/'
    const actual  = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
}) 

test('getURLsFromHTML absolute ', ()=>{
    const inputHTMLBody = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <a href="http://blog.boot.dev/path/">
            This is a blog
        </a>
    </body>
    </html>`
    const inputBaseURL = "https://blog.boot.dev/path"
    const actual  = getURLsFromHTML(inputHTMLBody ,inputBaseURL )
    const expected = ["http://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
}) 

test('getURLsFromHTML relative ', ()=>{
    const inputHTMLBody = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <a href="/path/">
            This is a blog
        </a>
    </body>
    </html>`
    const inputBaseURL = "https://blog.boot.dev"
    const actual  = getURLsFromHTML(inputHTMLBody ,inputBaseURL )
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
}) 

test('getURLsFromHTML multiple ', ()=>{
    const inputHTMLBody = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <a href="/path/">
            This is a blog
        </a>
        <a href="/path2/">
            This is a blog
        </a>
        <a href="https://blog.boot.dev/path3/">
        This is a blog
    </a>
    </body>
    </html>`
    const inputBaseURL = "https://blog.boot.dev"
    const actual  = getURLsFromHTML(inputHTMLBody ,inputBaseURL )
    const expected = ["https://blog.boot.dev/path/","https://blog.boot.dev/path2/","https://blog.boot.dev/path3/"]
    expect(actual).toEqual(expected)
}) 

test('getURLsFromHTML invalid ', ()=>{
    const inputHTMLBody = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <a href="invalid">
            This is a blog
        </a>
    </body>
    </html>`
    const inputBaseURL = "https://blog.boot.dev"
    const actual  = getURLsFromHTML(inputHTMLBody ,inputBaseURL )
    const expected = []
    expect(actual).toEqual(expected)
}) 