export default async function handler(req, res) {
  try {
    const { url } = req.query

    if (!url) {
      return res.json({
        status: false,
        message: "Instagram URL required"
      })
    }

    // simple scraper API source
    const api = "https://snapinsta.app/action.php"

    const response = await fetch(api, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      body: "url=" + encodeURIComponent(url)
    })

    const text = await response.text()

    // extract video link
    let match = text.match(/https?:\/\/[^"]+\.mp4/g)

    if (match && match.length > 0) {
      return res.json({
        status: true,
        result: [{ url: match[0] }]
      })
    } else {
      return res.json({
        status: false,
        message: "Video not found"
      })
    }

  } catch (err) {
    return res.json({
      status: false,
      error: err.toString()
    })
  }
}
