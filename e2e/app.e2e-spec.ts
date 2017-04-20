import { TransInterPage } from './app.po';

describe('trans-inter App', () => {
  let page: TransInterPage;

  beforeEach(() => {
    page = new TransInterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
