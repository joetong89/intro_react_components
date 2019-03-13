"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// class Header extends React.Component {

// 	render() {
// 		return (
// 			<div>
// 				<h1>{ this.props.title} </h1>
// 				{ this.props.children }
// 			</div>
// 		);
// 	}
// }

var Header = function Header(props) {
	return React.createElement(
		"div",
		null,
		React.createElement(
			"h1",
			null,
			props.title
		)
	);
};

Header.defaultProps = {
	title: "default title"
};

var Body = function (_React$Component) {
	_inherits(Body, _React$Component);

	function Body(props) {
		_classCallCheck(this, Body);

		var _this = _possibleConstructorReturn(this, (Body.__proto__ || Object.getPrototypeOf(Body)).call(this, props));

		_this.saySomething = _this.saySomething.bind(_this);
		_this.onSubmitForm = _this.onSubmitForm.bind(_this);

		_this.state = {
			message: "Woohoo!",
			blah: "blah, blaj",
			players: []
		};
		return _this;
	}

	_createClass(Body, [{
		key: "onSubmitForm",
		value: function onSubmitForm(e) {
			e.preventDefault();

			var newPlayer = {
				name: e.target.elements.name.value,
				age: e.target.elements.age.value,
				skillLevel: e.target.elements.skillLevel.value
			};

			this.props.handleAddPlayer(newPlayer);
		}
	}, {
		key: "saySomething",
		value: function saySomething() {
			var _this2 = this;

			alert(this.props.welcomeMessage);

			this.setState(function (prevState) {
				return {
					message: _this2.props.welcomeMessage
				};
			});
		}
	}, {
		key: "renderPlayers",
		value: function renderPlayers() {
			var _this3 = this;

			return this.props.players.map(function (player) {
				return React.createElement(
					"div",
					{ key: player.name },
					React.createElement(
						"h1",
						null,
						player.name
					),
					React.createElement(
						"h2",
						null,
						"Skill Level: ",
						player.skillLevel
					),
					React.createElement(
						"p",
						null,
						"Age: ",
						player.age
					),
					React.createElement(
						"button",
						{ type: "button", onClick: function onClick() {
								_this3.props.handleDeletePlayer(player);
							} },
						"Delete"
					)
				);
			});
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"p",
					null,
					"This is the body. "
				),
				React.createElement(
					"button",
					{ type: "button", onClick: this.saySomething },
					" Say Something"
				),
				React.createElement(
					"h5",
					null,
					this.state.message
				),
				this.props.players.length <= 0 && React.createElement(
					"p",
					null,
					"No players are available"
				),
				this.props.players.length >= 0 && React.createElement(
					"div",
					null,
					this.renderPlayers()
				),
				React.createElement(
					"button",
					{ type: "button", onClick: this.props.handleDeleteAllPlayer },
					"Delete All Players"
				),
				React.createElement(
					"form",
					{ onSubmit: this.onSubmitForm },
					React.createElement(
						"label",
						null,
						"Name:"
					),
					React.createElement("input", { type: "text", name: "name", placehoder: "Name" }),
					" ",
					React.createElement("br", null),
					React.createElement(
						"label",
						null,
						"Age:"
					),
					React.createElement("input", { type: "text", name: "age", placehoder: "Age" }),
					" ",
					React.createElement("br", null),
					React.createElement(
						"label",
						null,
						"Skill Level:"
					),
					React.createElement("input", { type: "text", name: "skillLevel", placeholder: "Skill Level" }),
					React.createElement("br", null),
					React.createElement("input", { type: "submit", value: "Submit" })
				)
			);
		}
	}]);

	return Body;
}(React.Component);

var FreeAgentTracker = function (_React$Component2) {
	_inherits(FreeAgentTracker, _React$Component2);

	function FreeAgentTracker(props) {
		_classCallCheck(this, FreeAgentTracker);

		var _this4 = _possibleConstructorReturn(this, (FreeAgentTracker.__proto__ || Object.getPrototypeOf(FreeAgentTracker)).call(this, props));

		_this4.handleAddPlayer = _this4.handleAddPlayer.bind(_this4);
		_this4.handleDeletePlayer = _this4.handleDeletePlayer.bind(_this4);
		_this4.handleDeleteAllPlayer = _this4.handleDeleteAllPlayer.bind(_this4);

		_this4.state = {
			players: []
		};
		return _this4;
	}

	_createClass(FreeAgentTracker, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var players = JSON.parse(localStorage.getItem('freeagentplayers'));
			if (players) {
				this.setState(function (prevState) {
					return {
						players: players
					};
				});
			}
		}
	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate(prevProps, prevState) {
			localStorage.setItem('freeagentplayers', JSON.stringify(this.state.players));
		}
	}, {
		key: "handleAddPlayer",
		value: function handleAddPlayer(player) {
			if (!player.name) {
				return "Please enter a player name";
			}

			this.setState(function (prevState) {
				return {
					players: prevState.players.concat(player)
				};
			});
		}
	}, {
		key: "handleDeletePlayer",
		value: function handleDeletePlayer(playerToDelete) {
			this.setState(function (prevState) {
				return {
					players: prevState.players.filter(function (player) {
						return !(player.name == playerToDelete.name && player.skillLevel == playerToDelete.skillLevel && player.age == playerToDelete.age);
					})
				};
			});
		}
	}, {
		key: "handleDeleteAllPlayer",
		value: function handleDeleteAllPlayer() {
			this.setState(function (prevState) {
				return {
					players: []
				};
			});
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					Header,
					{ title: "This is the title" },
					React.createElement(
						"h2",
						null,
						"This is from children"
					)
				),
				React.createElement(Body, {
					welcomeMessage: "Hey There!!!!!",
					players: this.state.players,
					handleAddPlayer: this.handleAddPlayer,
					handleDeletePlayer: this.handleDeletePlayer,
					handleDeleteAllPlayer: this.handleDeleteAllPlayer
				})
			);
		}
	}]);

	return FreeAgentTracker;
}(React.Component);

ReactDOM.render(React.createElement(FreeAgentTracker, null), document.getElementById('app'));
