export const optimizeRoute = async (data) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5001);

  try {
    const response = await fetch('http://localhost:5001/api/optimize', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(
      error.name === 'AbortError' 
        ? 'Request timed out' 
        : 'Failed to connect to server'
    );
  }
};