import React, { Component } from "react";
import token from "./contracts/D_Token.json";
import tokenSale from './contracts/TokenSale.json';
import getWeb3 from "./getWeb3";


import "./App.css";


class App extends Component {
    state = { loaded: false, tokenSaleAddress: null };

    componentDidMount = async() => {
        try {
            // Get network provider and web3 instance.
            this.web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            this.accounts = await this.web3.eth.getAccounts();

            // Get the contract instance.
            this.networkId = await this.web3.eth.net.getId();

            this.tokeninstance = new this.web3.eth.Contract(
                token.abi,
                token.networks[this.networkId] && token.networks[this.networkId].address,
            );

            this.tokenSaleinstance = new this.web3.eth.Contract(
                tokenSale.abi,
                tokenSale.networks[this.networkId] && tokenSale.networks[this.networkId].address,
            );

            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            this.setState({ loaded: true, tokenSaleAddress: tokenSale.networks[this.networkId].address });
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    };


    render() {
        if (!this.state.loaded) {
            return <div > Loading Web3, accounts, and contract... </div>;
        }
        return ( <div className = 'continer' >
             <p> To Buy Token: { this.state.tokenSaleAddress } </p>
       </div>
        );
    }
}
export default App;
