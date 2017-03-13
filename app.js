var Redux = require('redux');
var React = require('react');
var ReactDOM = require('react-dom');

// action creator
var addTodoActions = function(text){
	return {
		type: 'add_todo',
		text: text
	};
};

// reducers
var todoReducer = function(state, action){
	
	if(typeof state === 'undefined'){
		return [];
	}
	
	switch(action.type){
		case 'add_todo':
			return state.slice(0).concat({
				text: action.text,
				completed: false
			});
			break;
		case 'delete_todo':
			state.splice(action.index, 1);
			return state;
			break;
		default:
			return state;
	}
};


var store = Redux.createStore(todoReducer);

var App = React.createClass({
	getInitialState: function(){
		return {
			items: store.getState()
		};
	},
	componentDidMount: function(){
		var unsubscribe = store.subscribe(this.onChange);
	},
	onChange: function(){
		this.setState({
			items: store.getState()
		});
	},
	handleAdd: function(){
		var input = ReactDOM.findDOMNode(this.refs.todo);
		var value = input.value.trim();

		if(value)
			store.dispatch(addTodoActions(value));

		input.value = '';
	},
	handleDelete: function(e){
		store.dispatch({type:"delete_todo", index: e.target.getAttribute('data-index')});
	},
	render: function(){
		return (
			<div>
				<input ref="todo" type="text" placeholder="输入todo项" style={{marginRight:'10px'}} />
				<button onClick={this.handleAdd}>点击添加</button>
				<ul>
					{this.state.items.map((item, index) =>
						<li key={Math.random()}>{item.text}<i onClick={this.handleDelete} data-index={index}>-kkk</i></li>
						)}
				</ul>
			</div>			
			);
	}
});

ReactDOM.render(
	<App />, 
	document.getElementById('container')
	);

