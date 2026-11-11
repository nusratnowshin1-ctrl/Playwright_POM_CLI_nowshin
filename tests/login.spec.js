
const { test, expect } = require('@playwright/test');

const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');

const users = require('../data/users.json');

for (const user of users) {

  test(`Login test: ${user.username} - ${user.expected}`, async ({ page }) => {

    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await page.goto('/');

    await loginPage.login(user.username, user.password);

    if (user.expected === 'success') {

      await expect(page).toHaveURL(/inventory\.html/);

      expect(await inventoryPage.isLoaded()).toBe(true);

    } else if (user.expected === 'error') {

      await expect(loginPage.errorMessage).toBeVisible();

      const error = await loginPage.getErrorMessage();

      expect(error).not.toBe('');

    }

  });

}
