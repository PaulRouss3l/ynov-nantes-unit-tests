Feature('Ynov Nantes');

Scenario('Test Ynov Nantes Land Page', async ({ I }) => {
    I.amOnPage('https://www.ynov-nantes.com/');
    I.click('.search-cta a.cta');

    I.see('Que recherchez-vous ?','div');
    I.fillField('input.searchfield', 'info');

    await I.grabTextFrom('.results-list .search-preview-cursus');
    I.see('Bachelor Informatique','.results-list .search-preview-cursus .preview-title .tile-title')

});
