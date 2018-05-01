// Remember: no copy pasting!

// Controlled input. This is similar to what you did in react.
function addItemInputChanged() {
    setState({ addItemInput: event.target.value });
}

// Controlled input. This is similar to what you did in react.
function nameInputChanged() {
    setState({ listNameInput: event.target.value });
}

// Don't try to understand the body of this function. You just 
// need to understand what each parameter represents
function makeHTTPRequest(meth, url, body, cb) {
    fetch(url, {
        body: body,
        method: meth
    })
        .then(response => response.text())
        .then(responseBody => cb ? cb(responseBody) : undefined)
}

// We're going to try and stick with React's way of doing things
let state = {
    items: [],
    addItemInput: "", // The contents of the add item input box
    listNameInput: "", // The contents of the input box related to changing the list
    listName: "grocery list"
}

// Calling rerender changes the UI to reflect what's in the state

function rerender() {
    let inputElement = document.getElementById('itemInput');
    inputElement.value = state.addItemInput; // you can ignore this line

    let lne = document.getElementById('listNameInputChanged');
    lne.value = state.listNameInput; // you can ignore this line


    let listNameElement = document.getElementById('listName')
    listNameElement.innerText = state.listName;

    let d = document.getElementById("items");
    d.innerHTML = '';
    if (state.items[state.listName]) {
        state.items[state.listName].forEach(item => {
            let li = document.createElement("li");
            li.innerText = item;
            d.appendChild(li)
        })
    }
}

// Our good friend setState paying us a visit from ReactVille
function setState(newState) {
    if (newState.items !== undefined) state.items = newState.items;
    if (newState.addItemInput !== undefined) state.addItemInput = newState.addItemInput;
    if (newState.listNameInput !== undefined) state.listNameInput = newState.listNameInput;
    if (newState.listName !== undefined) state.listName = newState.listName;
    rerender();
}

function sendItemToServer(it, ln) {
    // This function is so short it could be inlined
    let cb = (itemsFromServer) => {
        let parsedItems = JSON.parse(itemsFromServer)
        setState({ items: parsedItems })
    }
    setState({ addItemInput: '' });
    makeHTTPRequest('POST',
        '/addItem',
        JSON.stringify({ item: it, listName: ln }),
        cb)
}

// When you submit the form, it sends the item to the server
function addItemSubmit() {
    event.preventDefault();

    sendItemToServer(state.addItemInput, state.listName)
}

function listNameSubmit() {
    event.preventDefault();
    setState({listName: state.listNameInput, listNameInput: '' });
}

// When the client starts he needs to populate the list of items
function populateItems() {
    let cb = itemsString => {
        let itemsParsed = JSON.parse(itemsString)
        setState({ items: itemsParsed })
    }

    makeHTTPRequest('POST', '/items', undefined, cb)
}

function removeThemAll() {
    function cb(items) {
        let parsedItems = JSON.parse(items);
        setState({ items: parsedItems });
    }
    let body = JSON.stringify({name: state.listName});
    makeHTTPRequest('POST', '/removeThem', body, cb)
}

function reverseThem() {
    function cb(stringFromServer) {
        let parsedItems = JSON.parse(stringFromServer);
        setState({ items: parsedItems });
    }
    let body = JSON.stringify({name: state.listName});
    makeHTTPRequest('POST', '/reverse', body, cb)
}

// We define a function and then call it right away. I did this to give the file a nice structure.
populateItems();
rerender();