export type AdminCollectionKey = 'dailyLogs' | 'workflows' | 'agents' | 'products';

const fallbackAdminEmails = ['cklaozhao@gmail.com'];

export function getLibuAdminEmails() {
  const envValue = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env?.VITE_LIBU_ADMIN_EMAILS;
  const envEmails = (envValue ?? '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  return Array.from(new Set([...fallbackAdminEmails, ...envEmails]));
}

export function isLibuAdminEmail(email?: string | null) {
  if (!email) return false;
  return getLibuAdminEmails().includes(email.trim().toLowerCase());
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function splitLines(value: string) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

export function joinLines(value?: string[]) {
  return (value ?? []).join('\n');
}

export function sortAdminItems(collectionKey: AdminCollectionKey, items: Record<string, unknown>[]) {
  return [...items].sort((a, b) => {
    if (collectionKey === 'dailyLogs') {
      return String(b.date ?? '').localeCompare(String(a.date ?? ''));
    }

    const left = String(a.name ?? a.title ?? a.id ?? '');
    const right = String(b.name ?? b.title ?? b.id ?? '');
    return left.localeCompare(right);
  });
}

export function getAdminItemTitle(collectionKey: AdminCollectionKey, item: Record<string, unknown>) {
  switch (collectionKey) {
    case 'dailyLogs':
      return String(item.title ?? item.date ?? item.id ?? 'Untitled log');
    case 'workflows':
      return String(item.title ?? item.id ?? 'Untitled workflow');
    case 'agents':
      return String(item.name ?? item.id ?? 'Untitled agent');
    case 'products':
      return String(item.name ?? item.id ?? 'Untitled product');
  }
}

export function getAdminItemMeta(collectionKey: AdminCollectionKey, item: Record<string, unknown>) {
  switch (collectionKey) {
    case 'dailyLogs':
      return String(item.date ?? '');
    case 'workflows':
      return `${Array.isArray(item.steps) ? item.steps.length : 0} steps`;
    case 'agents':
      return String(item.role ?? '');
    case 'products':
      return String(item.category ?? item.link ?? '');
  }
}
