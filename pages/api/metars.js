export async function connectToMetars() {
    const url = 'https://aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&hoursBeforeNow=3&mostRecent=true&stationString=PHNL%20KSEA'
    const xml_response = await fetch(url)
    const xmlText = await xml_response.text()

    var metarsData = xmlText.substring(
        xmlText.lastIndexOf("<raw_text>") + 10,
        xmlText.lastIndexOf("</raw_text>"))
    
    var metarsTime = xmlText.substring(
        xmlText.lastIndexOf("<observation_time>") + 18,
        xmlText.lastIndexOf("</observation_time>"))

    return { data: metarsData, time: metarsTime }
}