var rootdiv = document.getElementById('root');
// var elem = React.createElement(
//     "div",
//     null,
//     React.createElement(
//         "a",
//         { href: "www.google.com2" },
//         "Google.com"
//     ),
//     React.createElement(
//         "div",
//         { id: "somedivid" },
//         "some div"
//     )
// );
var elem = <div>
    <a href = "www.google.com">Google.com</a>
    <div id = "somedivid">some div</div>
    </div>

ReactDOM.render(elem, rootdiv);
