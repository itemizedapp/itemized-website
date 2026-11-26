import { test, expect } from '@playwright/test';
import { PAGES } from './pages';

const WIDTHS = [320, 768, 1280] as const;

for (const width of WIDTHS) {
  for (const route of PAGES) {
    test(`no horizontal overflow at ${width}px: ${route}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      expect(overflow).toBeLessThanOrEqual(1);
    });
  }
}
