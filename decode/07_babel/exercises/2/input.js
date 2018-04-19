var rootdiv = document.getElementById('root');
// var elem = React.createElement(
//   'ul',
//   null,
//   React.createElement(
//     'li',
//     null,
//     'cheese'
//   ),
//   React.createElement(
//     'li',
//     null,
//     'bacon2'
//   ),
//   React.createElement(
//     'li',
//     null,
//     'milk'
//   )
// );
var elem = <ul><li>cheese</li><li>bacon</li><li>milk</li></ul>

ReactDOM.render(elem, rootdiv);
