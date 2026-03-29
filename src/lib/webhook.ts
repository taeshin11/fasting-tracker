const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxqK-fVdNxNIDHp6LRuQgbDU3MF98I7PZ0sdZnKFhFUxknvKPiWmoEIwCoKbJRS3UI0ew/exec';

async function post(data: Record<string, unknown>): Promise<void> {
  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch { /* silent fail */ }
}

export async function trackFastStart(protocol: string, customWindow?: { fast: number; eat: number }): Promise<void> {
  const sessionCount = parseInt(localStorage.getItem('fasting_session_count') || '0') + 1;
  localStorage.setItem('fasting_session_count', String(sessionCount));
  await post({
    event_type: 'fast_start',
    row: [
      new Date().toISOString(),
      protocol,
      customWindow ? `${customWindow.fast}:${customWindow.eat}` : '',
      navigator.userAgent,
      `${window.screen.width}x${window.screen.height}`,
      document.referrer,
      sessionCount,
      '',
    ],
  });
}

export async function trackFastComplete(startTime: string, durationMin: number, protocol: string, completed: boolean): Promise<void> {
  await post({
    event_type: 'fast_complete',
    row: [
      new Date().toISOString(),
      startTime,
      durationMin,
      protocol,
      completed,
    ],
  });
}

export async function trackVisitor(): Promise<{ today: number; total: number } | null> {
  await post({
    event_type: 'visitor',
    row: [
      new Date().toISOString(),
      window.location.pathname,
      navigator.userAgent,
      document.referrer,
    ],
  });
  try {
    const res = await fetch(WEBHOOK_URL + '?type=visitor');
    return await res.json();
  } catch { return null; }
}
