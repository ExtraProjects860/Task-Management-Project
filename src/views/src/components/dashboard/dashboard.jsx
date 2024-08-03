import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Sidebar from "../sidebar/sidebarNoted";
import useRootClass from "../../useRootClass";
import { FiClock } from "react-icons/fi";
import { getTasksList } from "./dashboardApi";

const Dashboard = () => {
  const [tasksLists, setTasksLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasksLists = async () => {
      try {
        const data = await getTasksList();
        if (Array.isArray(data.tasksLists)) {
          setTasksLists(data.tasksLists);
        } else {
          console.error("Unexpected format for tasksLists:", data.tasksLists);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      }
    };

    fetchTasksLists();
  }, []);

  useRootClass("root-special-style");
  const name = localStorage.getItem("name");

  return (
    <div className="dashboard">
      <Sidebar taskLists={tasksLists} />
      <header className="header">
        <h1>Bem vindo, {name}</h1>
      </header>
      <main className="content">
        <section className="recent-access">
          <h2 className="text-recent-access">
            <FiClock style={{ marginRight: "3px" }} /> Últimas listas
          </h2>
          {loading ? (
            <p>Carregando...</p>
          ) : (
            tasksLists.length > 0 ? (
              tasksLists.map((lista) => (
                <div key={lista.idTaskList} className="card">
                  <div className="card-header">
                    <img src="./check.png" alt="Icon" className="card-icon" />
                  </div>
                  <div className="card-content">
                  <h3>{lista.taskListName}</h3>
                    <p>{lista.taskListDescription}</p>
                    {lista.tasks.length > 0 && (
                      <ul>
                        {lista.tasks.map((task, index) => (
                          <li key={index}>{task}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>Nenhuma task list disponível.</p>
            )
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
