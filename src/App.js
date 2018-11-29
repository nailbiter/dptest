import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NameForm from './NameForm.js'

class App extends Component {
	state = {
		data: null,
	};
	componentDidMount(){
		this.callBackendAPI()
			.then(res => this.setState({ data: res.express }))
			.catch(err => console.log(err));
	}
	callBackendAPI = async () => {
		const response = await fetch('/express_backend');
		const body = await response.json();

		if (response.status !== 200) {
			throw Error(body.message) 
		}
		return body;
	};
	post = async (url,data) => {
		let xhr = new XMLHttpRequest();
		xhr.open('post', url);
		xhr.setRequestHeader('Content-type', 'application/json');
		xhr.responseType = 'json';
		xhr.addEventListener('load', () => {
			if (xhr.status === 200) {
				console.log('success: %s',JSON.stringify(this.xhr.response));
				return this.xhr.response;
			} else {
				console.log('error');
			}
		});
		console.log('going to send %s to %s',JSON.stringify(data),url);
		await xhr.send(JSON.stringify(data));
	}
	onSubmit = (val) => {
		console.log('name submitted 1: %s',val);
		fetch('/save_message',{
				method: 'POST',
				body:JSON.stringify({
					message:val,
				}),
				headers: {"Content-Type": "application/json"},
		})
			.then(res => console.log('success: %s',JSON.stringify(res)))
			.catch(err => console.log(err));
	}
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
					<p className="App-intro">{this.state.data}</p>
					<NameForm onSubmit={this.onSubmit}/>
        </header>
      </div>
    );
  }
}

export default App;
