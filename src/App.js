import React, { useState } from 'react';
import blockchain from './data'
import './App.css';

function App() {
  let [user, setUser] = useState('Brian');

  function extractTransactions(blockchain) {
    const transactions = [];

    Object.keys(blockchain.chain).map(key => {
      blockchain.chain[key].transactions.map(transaction => {
          transactions.push(transaction)
      })
    });

    return transactions;
  }

  function caculateBalance(transactions, user) {
    let balance = transactions.reduce((acc, transaction) => {
      if (transaction.recipient === user) {
        return acc + parseFloat(transaction.amount)
      } else if (transaction.sender === user) {
        return acc - parseFloat(transaction.amount)
      } else {
        return acc
      }
    }, 0);

    return balance;
  }

  const transactions = extractTransactions(blockchain);

  const handleChange = e => {
    setUser(e.target.value);
  }

  return (
    <div className="App">
      <h2>Wallet</h2>
      {/* * Allow the user to enter, save, or change the `id` used for the program */}
      <select name="user" id="user" value={user} onChange={handleChange} >
        <option value="Brian">Brian</option>
        <option value="Beej">Beej</option>
        <option value="Brady">Brady</option>
        <option value="Elissa">Elissa</option>
        <option value="Tom">Tom</option>
      </select>
      <h2>Balance</h2>
      {/* * Display the current balance for that user */}
      <p>{user} has a balance of LC{caculateBalance(transactions, user)}</p>
      <h2>Transactions</h2>
      {/* * Display a list of all transactions for this user, including sender and recipient */}
      <div style={{ display:"flex", justifyContent:"space-around", fontWeight:"bold" }}>
          <div>Sender</div>
          <div>Recipient</div>
          <div>Amount</div>
        </div>
      <div>
        <Transactions transactions={transactions.filter(transaction => transaction.sender === user || transaction.recipient === user)} user={user} />
      </div>
    </div>
  );
}

function Transactions({ transactions, user }) {
  return transactions
    .map(transaction => (
        <div style={{ display:"flex", justifyContent:"space-around" }}>
          <div>{transaction.sender === '0' ? 'Block reward' : transaction.sender }</div>
          <div>{transaction.recipient}</div>
          <div>LC{transaction.amount}</div>
        </div>
      )
  )
}

export default App;
