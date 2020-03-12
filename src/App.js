import React, { useState } from 'react';
import blockchain from './data'
import './App.css';

function App() {
  const [user, setUser] = useState('Beej');

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

  return (
    <div className="App">
      <h2>Wallet</h2>
      {/* * Allow the user to enter, save, or change the `id` used for the program */}
      <h2>Balance</h2>
      {/* * Display the current balance for that user */}
      <p>{user} has a balance of LC{caculateBalance(transactions, user)}</p>
      <h2>Transactions</h2>
      {/* * Display a list of all transactions for this user, including sender and recipient */}
      <div>
        <Transactions transactions={transactions.filter(transaction => transaction.sender === user || transaction.recipient === user)} user={user} />
      </div>
    </div>
  );
}

function Transactions({ transactions, user }) {
  return transactions
    .map(transaction => (
        <div style={{ display:"flex", justifyContent:"space-around"}}>
          <div>{transaction.sender}</div>
          <div>{transaction.recipient}</div>
          <div>LC{transaction.amount}</div>
        </div>
      )
  )
}

export default App;
