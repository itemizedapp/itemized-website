import { test, expect } from '@playwright/test';
import { PAGES } from './pages';

test.use({ javaScriptEnabled: false });

test('mobile navigation works without JavaScript', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  const menu = page.locator('details.nav-menu');
  await expect(menu).not.toHaveAttribute('open', '');
  await menu.locator('summary').click();
  await expect(menu).toHaveAttribute('open', '');
  await expect(menu.getByRole('link', { name: 'Self-Host' })).toBeVisible();
});

for (const route of PAGES) {
  test(`renders main content without JavaScript: ${route}`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator('main#main h1')).toBeVisible();
  });
}
