const apiURL = '/api'

export class Api {
  static async get(url: string) {
    const req = await fetch(`${apiURL}/${url}`)
    return req.json()
  }

  static async post(url: string, body: any) {
    const req = await fetch(`${apiURL}/${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    return req.json()
  }

  static async patch(url: string, body: any) {
    const req = await fetch(`${apiURL}/${url}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    return req.json()
  }
}
