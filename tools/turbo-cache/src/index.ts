interface Env {
  TURBO_CACHE_BUCKET: R2Bucket
  TURBO_TOKEN: string
}

const ARTIFACT_PATH = /^\/v8\/artifacts\/([a-f0-9]{16,})$/

const OCTET_HEADERS = {
  'Content-Type': 'application/octet-stream',
  'Cache-Control': 'public, max-age=31536000, immutable',
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (request.method === 'GET' && (url.pathname === '/' || url.pathname === '/health')) {
      return json({ ok: true })
    }

    if (!isAuthorized(request, env.TURBO_TOKEN)) {
      return json({ error: 'unauthorized' }, 401)
    }

    if (request.method === 'GET' && url.pathname === '/v8/artifacts/status') {
      return json({ status: 'enabled' })
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204 })
    }

    const match = ARTIFACT_PATH.exec(url.pathname)
    if (!match) {
      return json({ error: 'not found' }, 404)
    }

    const key = `artifact:${match[1]}`

    switch (request.method) {
      case 'GET':
      case 'HEAD': {
        const object = await env.TURBO_CACHE_BUCKET.get(key)
        if (object === null) {
          return new Response(null, { status: 404, headers: OCTET_HEADERS })
        }
        return new Response(request.method === 'HEAD' ? null : object.body, {
          status: 200,
          headers: OCTET_HEADERS,
        })
      }
      case 'PUT': {
        const body = await request.arrayBuffer()
        try {
          await env.TURBO_CACHE_BUCKET.put(key, body)
        } catch (error) {
          console.error('failed to store artifact', error)
          return json({ error: 'storage failure' }, 500)
        }
        return json({ ok: true }, 200)
      }
      case 'DELETE': {
        await env.TURBO_CACHE_BUCKET.delete(key)
        return json({ ok: true }, 200)
      }
      default:
        return json({ error: 'method not allowed' }, 405)
    }
  },
}

function isAuthorized(request: Request, token: string): boolean {
  if (!token) {
    return false
  }
  const header = request.headers.get('authorization')
  if (!header || !header.startsWith('Bearer ')) {
    return false
  }
  const candidate = header.slice('Bearer '.length)
  if (candidate.length !== token.length) {
    return false
  }
  let diff = 0
  for (let i = 0; i < token.length; i++) {
    diff |= token.charCodeAt(i) ^ candidate.charCodeAt(i)
  }
  return diff === 0
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}
