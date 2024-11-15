const participants = [];
let drawResults = {};

function addParticipant() {
  const nameInput = document.getElementById("nameInput");
  const name = nameInput.value.trim();

  if (name && !participants.includes(name)) {
    participants.push(name);
    updateParticipantList();
    nameInput.value = "";
  } else if (participants.includes(name)) {
    alert("Este nombre ya está en la lista.");
  } else {
    alert("Por favor, ingresa un nombre válido.");
  }
}

function updateParticipantList() {
  const list = document.getElementById("participantList");
  list.innerHTML = "";
  participants.forEach(participant => {
    const li = document.createElement("li");
    li.textContent = participant;
    const viewButton = document.createElement("button");
    viewButton.textContent = "Ver Amigo Secreto";
    viewButton.onclick = () => showSecretFriend(participant);
    li.appendChild(viewButton);
    list.appendChild(li);
  });
}

function generateDraw() {
  if (participants.length < 2) {
    alert("Se necesitan al menos 2 participantes para el sorteo.");
    return;
  }

  if (localStorage.getItem("drawResults")) {
    alert("El sorteo ya ha sido generado. Cada participante puede ver su amigo secreto.");
    document.getElementById("instruction").style.display = "block";
    drawResults = JSON.parse(localStorage.getItem("drawResults"));
    return;
  }

  const shuffled = [...participants];
  shuffleArray(shuffled);

  drawResults = {};
  for (let i = 0; i < participants.length; i++) {
    const giver = participants[i];
    const receiver = shuffled[i];

    // Asegurarse de que nadie sea su propio amigo secreto
    if (giver === receiver) {
      generateDraw();
      return;
    }

    drawResults[giver] = receiver;
  }

  localStorage.setItem("drawResults", JSON.stringify(drawResults));
  alert("Sorteo generado con éxito. Cada participante puede ver su amigo secreto.");
  document.getElementById("instruction").style.display = "block";
}

function showSecretFriend(participant) {
  if (!localStorage.getItem("drawResults")) {
    alert("El sorteo no ha sido generado aún.");
    return;
  }

  const storedResults = JSON.parse(localStorage.getItem("drawResults"));
  const receiver = storedResults[participant];
  
  if (receiver) {
    alert(`Hola ${participant}, te toca regalarle a: ${receiver}`);
  } else {
    alert("Este participante no está en el sorteo.");
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
