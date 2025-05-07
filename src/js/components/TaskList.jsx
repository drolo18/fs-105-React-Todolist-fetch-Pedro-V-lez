import React from "react";
import "./../../styles/TaskList.css"

export const TaskList = ({ tasks, removeTask }) => {
    return (
        <div className=" w-50 h-75 justify-content-center">
           {tasks.map((task, index) => (
                <div  key={index} className="d-flex justify-content-between border task-item" >
                    <p className="ms-5">{task}</p>
                    <button className="me-2 h-50 delete-btn" onClick={() => removeTask(index)} >
                        x
                    </button>
                </div>
            ))}
        </div>
    )
}