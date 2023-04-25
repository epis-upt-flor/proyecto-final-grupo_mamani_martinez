const https = require('https')
function SendMessageText(data) {
    const options = {
        host : "graph.facebook.com",
        path : "/v16.0/108584732197107/messages",
        method : "POST",
        body : data,
        headers : {
            "Content-Type" : "application/json",
            Authorization : "Bearer EAALFJ2ZA604MBAGPMDQqUGTlFYZBoIUAEKwzGuWY8cITvfI0VQSdxAOVTiFZA9wTGUZBQP1OluQxa0wj6MDuBucI1Pujc3LTRU5bSRyV9JZCTp8lF0y16wdHGZBGXdc5NWp3ZAnl4R0KK49uO7fGotaDVWLxVR2CBz3ywYoR6Qmw5rTFQv6bsZAr",
        }
    }
    const req = https.request(options,res=>{
        res.on("data",d=>{
            process.stdout.write(d)
        })
    })
    req.on("ERROR",error=>{
        console.log("error")
    })
    req.write(data)
    req.end()
}

module.exports = {SendMessageText}