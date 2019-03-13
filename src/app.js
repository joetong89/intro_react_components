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

const Header = (props) => {
	return (
		<div>
			<h1>{props.title}</h1>
		</div>
	);
};

Header.defaultProps = {
	title: "default title"
}

class Body extends React.Component {

	constructor(props) {
		super(props);

		this.saySomething = this.saySomething.bind(this);
		this.onSubmitForm = this.onSubmitForm.bind(this);

		this.state={
			message: "Woohoo!",
			blah: "blah, blaj",
			players:[],
		};
	}

	onSubmitForm(e) {
		e.preventDefault();

		const newPlayer = {
			name: e.target.elements.name.value,
			age: e.target.elements.age.value,
			skillLevel: e.target.elements.skillLevel.value,
		}

		this.props.handleAddPlayer(newPlayer);
	}
	
	saySomething() {
		alert(this.props.welcomeMessage);

		this.setState((prevState) => {
			return {
				message: this.props.welcomeMessage,
			}
		});
	}

	renderPlayers() {
		return this.props.players.map( (player) => 
			<div key={player.name}>
				<h1>{player.name}</h1>
				<h2>Skill Level: {player.skillLevel}</h2>
				<p>Age: {player.age}</p>
				<button type="button" onClick={() => {this.props.handleDeletePlayer(player)}}>Delete</button>
			</div> 
		);
	}

	render() {
		return (
			<div>
				<p>This is the body. </p>
				<button type="button" onClick={this.saySomething}> Say Something</button>
				<h5>{this.state.message}</h5>
				{this.props.players.length <=0 && <p>No players are available</p>}
				{this.props.players.length >=0 && <div>{this.renderPlayers()}</div>}
				<button type="button" onClick={this.props.handleDeleteAllPlayer}>Delete All Players</button>

				<form onSubmit={this.onSubmitForm}>
					<label>Name:</label>
					<input type="text" name="name" placehoder="Name"/> <br/>
					<label>Age:</label>
					<input type="text" name="age" placehoder="Age"/> <br/>
					<label>Skill Level:</label>
          			<input type="text" name="skillLevel" placeholder="Skill Level" /><br/>
          			<input type="submit" value="Submit"/>
				</form>
			</div>
			
		);
	}
}

class FreeAgentTracker extends React.Component {

	constructor(props) {
		super(props);

		this.handleAddPlayer = this.handleAddPlayer.bind(this);
		this.handleDeletePlayer = this.handleDeletePlayer.bind(this);
		this.handleDeleteAllPlayer = this.handleDeleteAllPlayer.bind(this);

		this.state = {
			players: [],
		};
	}

	componentDidMount() {
		const players = JSON.parse(localStorage.getItem('freeagentplayers'));
		if (players) {
			this.setState( (prevState) => {
				return {
					players: players,
				}
			});
		}
	}

	componentDidUpdate(prevProps, prevState) {
		localStorage.setItem('freeagentplayers', JSON.stringify(this.state.players));
	}

	handleAddPlayer(player) {
		if (!player.name) {
			return "Please enter a player name";
		}

		this.setState((prevState) => {
			return {
				players: prevState.players.concat(player),
			}
		});
	}

	handleDeletePlayer(playerToDelete) {
		this.setState( (prevState) => {
			return {
				players: prevState.players.filter( (player) => {
					return !(player.name == playerToDelete.name 
						&& player.skillLevel == playerToDelete.skillLevel
						&& player.age == playerToDelete.age); 
				}),
			}
		});
	}

	handleDeleteAllPlayer() {
		this.setState( (prevState) => {
			return {
				players:[],
			}
		});
	}
    
    render() {
        return (
            <div>
            	<Header title={"This is the title"}>
            		<h2>This is from children</h2>
            	</Header>
            	<Body 
            		welcomeMessage="Hey There!!!!!" 
            		players={this.state.players} 
            		handleAddPlayer={this.handleAddPlayer} 
            		handleDeletePlayer={this.handleDeletePlayer}
            		handleDeleteAllPlayer={this.handleDeleteAllPlayer}
            	/>
            </div>
        );
    }
}

ReactDOM.render(<FreeAgentTracker />, document.getElementById('app'));