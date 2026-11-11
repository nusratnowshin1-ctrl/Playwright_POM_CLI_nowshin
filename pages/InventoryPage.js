
class InventoryPage {
  constructor(page) {
    this.page = page;

    this.pageTitle = page.locator('.title');
    this.productList = page.locator('.inventory_list');
  }

  async isLoaded() {
    const titleVisible = await this.pageTitle.isVisible();
    const listVisible = await this.productList.isVisible();

    if (!titleVisible || !listVisible) {
      return false;
    }

    const titleText = await this.pageTitle.innerText();

    return titleText.trim() === 'Products';
  }
}

module.exports = InventoryPage;
