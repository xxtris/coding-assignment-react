const BASE_URL = "http://localhost:4200";

export async function request<TResponse>(
  method: string,
  endpoint: string,
  body?: unknown,
  headers: Record<string, string> = {}
): Promise<TResponse> {
    const config = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        body: body ? JSON.stringify(body) : undefined
    };
    const res = await fetch(`${BASE_URL}${endpoint}`, config);
    if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.message || 'Unexpected erro')
    }

    return await res.json()
}