export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const dns = await import('node:dns');
    try {
      dns.setServers(['8.8.8.8', '1.1.1.1']);
      console.log('Global DNS successfully overridden to 8.8.8.8 & 1.1.1.1');
    } catch (error) {
      console.error('Failed to set global DNS servers:', error);
    }
  }
}
