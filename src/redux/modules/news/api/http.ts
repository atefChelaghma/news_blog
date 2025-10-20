export async function fetchFromAPI(
  url: string,
  params: Record<string, string>
): Promise<unknown> {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) searchParams.append(key, value);
  });

  const fullUrl = `${url}?${searchParams.toString()}`;
  const response = await fetch(fullUrl, {
    credentials: 'omit',
    mode: 'cors',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

const isDev = import.meta.env.DEV;

export const getBaseURL = (service: string, originalURL: string) => {
  if (isDev) {
    return `/api/${service}`;
  }
  return originalURL;
};
