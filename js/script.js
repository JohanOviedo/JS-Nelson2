let registeredUser = { email: "", password: "" };
let tasks = [];

function validateRegisterForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    let valid = true;

    if (!name) {
        document.getElementById("nameError").innerText = "El nombre es obligatorio.";
        valid = false;
    } else {
        document.getElementById("nameError").innerText = "";
    }

    if (!email) {
        document.getElementById("emailError").innerText = "El correo es obligatorio.";
        valid = false;
    } else {
        document.getElementById("emailError").innerText = "";
    }

    if (!password || password.length < 6) {
        document.getElementById("passwordError").innerText = "La contraseña debe tener al menos 6 caracteres.";
        valid = false;
    } else {
        document.getElementById("passwordError").innerText = "";
    }

    if (valid) {
        registeredUser = { email, password };
        alert("Registro completado.");
        document.getElementById("registerFormContainer").style.display = "none";
        document.getElementById("loginFormContainer").style.display = "block";
    }
}

function validateLoginForm() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (email === registeredUser.email && password === registeredUser.password) {
        alert("Inicio de sesión exitoso.");
        document.getElementById("loginFormContainer").style.display = "none";
        document.getElementById("taskContainer").style.display = "block";
    } else {
        document.getElementById("loginEmailError").innerText = "Correo o contraseña incorrectos.";
    }
}

function addTask() {
    const taskInput = document.getElementById("taskInput").value;
    const priority = document.getElementById("priority").value;
    if (taskInput) {
        tasks.push({ text: taskInput, priority, status: 'En espera', completed: false });
        displayTasks();
        document.getElementById("taskInput").value = "";
    } else {
        alert("Por favor, ingresa una tarea.");
    }
}

function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const row = document.createElement("tr");

        const taskCell = document.createElement("td");
        taskCell.innerText = task.text;

        const priorityCell = document.createElement("td");
        priorityCell.innerText = task.priority;

        const statusCell = document.createElement("td");
        statusCell.innerText = task.status;
        if (task.completed) {
            statusCell.classList.add("completed");
        }

        const actionsCell = document.createElement("td");
        actionsCell.innerHTML = `
            <button class="status-button" onclick="toggleCompletion(${index})">Completada</button>
            <button class="status-button delete" onclick="deleteTask(${index})">Eliminar</button>
        `;

        row.appendChild(taskCell);
        row.appendChild(priorityCell);
        row.appendChild(statusCell);
        row.appendChild(actionsCell);

        taskList.appendChild(row);
    });
}

function toggleCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    tasks[index].status = tasks[index].completed ? 'Realizada' : 'En espera';
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

function logout() {
    alert("Cerrando sesión...");
    document.getElementById("taskContainer").style.display = "none";
    document.getElementById("loginFormContainer").style.display = "block";
}
