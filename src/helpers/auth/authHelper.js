const isTokenIncluded = (req) => {
    if(req.headers['authorization'] == null)
        return false;
    return (req.headers['authorization']
        .startsWith("Bearer "))
}

const getAccessToken = (req) => {
    const authorization = req.headers['authorization']
    const token = authorization.split(" ")[1]
    return token
}

module.exports = { isTokenIncluded, getAccessToken }