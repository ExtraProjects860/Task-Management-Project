import React from 'react';
import './dashboard.css';
import Sidebar from '../sidebar/sidebarNoted';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <header className="header">
        <h1>Bem vindo, Fulano</h1>
      </header>
      <main className="content">
        <section className="recent-access">
          <h2>Acessos recentes</h2>
          <div className="boards-list">
            <div className="board">
              <div className="board-icon">✓</div>
              <p>Projeto x</p>
            </div>
            <div className="board">
              <div className="board-icon">✓</div>
              <p>Board 3</p>
            </div>
            <div className="board">
              <div className="board-icon">✓</div>
              <p>Board 2</p>
            </div>
            <div className="board">
              <div className="board-icon">✓</div>
              <p>Board 4</p>
            </div>
            <div className="board">
              <div className="board-icon">✓</div>
              <p>Task List</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
