Scenario('home', ({I}) => {
    I.amOnPage('http://localhost:5000/');
});
Scenario('Test create', ({I}) => {
    I.amOnPage('http://localhost:5000/');
    I.fillField('new', 'Test2');
    I.click('Create');
    locate('body')
        .inside(locate('td').withText('Test'))
});

Scenario('Test Done todo', ({I}) => {
    I.amOnPage('http://localhost:5000/');
    I.fillField('new', 'Test2');
    I.click('Create');
    locate('body')
        .inside(locate('td').withText('Test'))
    I.click('Done');
    locate('body')
        .inside(locate('td').withText('Test'))
});