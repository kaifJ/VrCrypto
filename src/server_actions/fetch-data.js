export default fetchData = async url => {
    let data = await fetch(url)
    return data
}