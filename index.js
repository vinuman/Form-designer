let data = [
  {
    id: "c0ac49c5-871e-4c72-a878-251de465e6b4",
    type: "input",
    label: "Sample Label",
    placeholder: "Sample Placeholder",
  },
  {
    id: "146e69c2-1630-4a27-9d0b-f09e463a66e4",
    type: "select",
    label: "Sample Label",
    options: ["Sample Option", "Sample Option", "Sample Option"],
  },
  {
    id: "45002ecf-85cf-4852-bc46-529f94a758f5",
    type: "input",
    label: "Sample Label",
    placeholder: "Sample Placeholder",
  },
  {
    id: "680cff8d-c7f9-40be-8767-e3d6ba420952",
    type: "textarea",
    label: "Sample Label",
    placeholder: "Sample Placeholder",
  },
];

const saveFormBtn = document.querySelector(".nav-save");
saveFormBtn.addEventListener("click", saveForm);

function saveForm() {
  console.log("The saved form data is:", data);
}

let nextId = 0;
let divId = 0;

window.onload = function () {
  renderFormFromJson();
};

function renderFormFromJson() {
  const formContainer = document.getElementById("form-container");

  formContainer.innerHTML = "";

  data.forEach((item) => {
    const formElementContainer = createFormElementContainer(item);
    formContainer.appendChild(formElementContainer);
  });

  //drag and drop fnc
  const draggableElements = document.querySelectorAll(
    ".form-element-container"
  );
  draggableElements.forEach((element) => {
    element.addEventListener("dragstart", handleDragStart);
    element.addEventListener("dragover", handleDragOver);
    element.addEventListener("drop", handleDrop);
  });
}

function createFormElementContainer(item) {
  const formElementContainer = document.createElement("div");
  formElementContainer.className = "form-element-container";
  formElementContainer.draggable = true;
  formElementContainer.id = `div-${item.id}`; // Assign a unique ID based on the item's ID

  //label element
  const label = document.createElement("label");
  label.textContent = item.label;

  // div for form element and label
  const formElementWrapper = document.createElement("div");
  formElementWrapper.className = "formElementClass";

  // form element based on input type
  let formElement;
  if (item.type === "input") {
    formElement = document.createElement("input");
    formElement.type = "text";
    formElement.placeholder = item.placeholder;
  } else if (item.type === "select") {
    formElement = document.createElement("select");
    item.options.forEach((optionText) => {
      const option = document.createElement("option");
      option.textContent = optionText;
      formElement.appendChild(option);
    });
  } else if (item.type === "textarea") {
    formElement = document.createElement("textarea");
    formElement.placeholder = item.placeholder;
  }

  formElementWrapper.appendChild(label);
  formElementWrapper.appendChild(formElement);

  //  delete button and fnc
  const deleteBtn = document.createElement("span");
  deleteBtn.className = "delete-btn";
  deleteBtn.id = `delete-${item.id}`;
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = function () {
    data = data.filter((data) => data.id !== item.id);
    renderFormFromJson();
  };

  //edit button and fnc
  const editBtn = document.createElement("span");
  editBtn.className = "edit-btn";
  editBtn.id = `edit-${item.id}`;
  editBtn.textContent = "Edit";
  editBtn.onclick = function () {
    openModal(item.id, data);
  };

  formElementContainer.appendChild(formElementWrapper);
  formElementContainer.appendChild(editBtn);
  formElementContainer.appendChild(deleteBtn);

  return formElementContainer;
}

// Sidebar button fnc's
const inputBtn = document.getElementById("add-input");
inputBtn.addEventListener("click", function () {
  data.push({
    id: nextId++,
    type: "input",
    label: "Sample Label",
    placeholder: "Sample Placeholder",
  });
  renderFormFromJson();
});

const selectBtn = document.getElementById("add-select");
selectBtn.addEventListener("click", function () {
  data.push({
    id: nextId++,
    type: "select",
    label: "Sample Label",
    options: ["Sample Option", "Sample Option", "Sample Option"],
  });
  renderFormFromJson();
});

const textAreaBtn = document.getElementById("add-text");
textAreaBtn.addEventListener("click", function () {
  data.push({
    id: nextId++,
    type: "textarea",
    label: "Sample Label",
    placeholder: "Sample Placeholder",
  });
  renderFormFromJson();
});

//Home button fbcs(small screen)
const inputBtn1 = document.getElementById("add-input1");
inputBtn1.addEventListener("click", function () {
  data.push({
    id: nextId++,
    type: "input",
    label: "Sample Label",
    placeholder: "Sample Placeholder",
  });
  renderFormFromJson();
});

const selectBtn1 = document.getElementById("add-select1");
selectBtn1.addEventListener("click", function () {
  data.push({
    id: nextId++,
    type: "select",
    label: "Sample Label",
    options: ["Sample Option", "Sample Option", "Sample Option"],
  });
  renderFormFromJson();
});

const textAreaBtn1 = document.getElementById("add-text1");
textAreaBtn1.addEventListener("click", function () {
  data.push({
    id: nextId++,
    type: "textarea",
    label: "Sample Label",
    placeholder: "Sample Placeholder",
  });
  renderFormFromJson();
});

//Drag and drop fnc
function handleDragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}

function handleDragOver(event) {
  event.preventDefault();
}

function handleDrop(event) {
  event.preventDefault();
  const draggedElementId = event.dataTransfer.getData("text/plain");
  const draggedElement = document.getElementById(draggedElementId);

  const dropTarget = event.target.closest(".form-element-container");
  const dropTargetId = dropTarget.id;

  const mouseY = event.clientY - dropTarget.getBoundingClientRect().top;
  const insertAbove = mouseY < dropTarget.clientHeight / 2;
  const draggedIndex = data.findIndex(
    (item) => `div-${item.id}` === draggedElementId
  );
  const dropIndex = data.findIndex((item) => `div-${item.id}` === dropTargetId);

  // Adjust the drop index based on whether to insert above or below
  const adjustedDropIndex = insertAbove ? dropIndex : dropIndex + 1;

  // Splice the array to insert the dragged element at the adjusted drop index
  data.splice(adjustedDropIndex, 0, data.splice(draggedIndex, 1)[0]);

  renderFormFromJson();
}

// createInput fnc
function createInput(id, type, labelText, value) {
  const inputContainer = document.createElement("div");
  inputContainer.className = "modal-input-container";

  // Create label
  const label = document.createElement("label");
  label.textContent = labelText;

  // Create input element
  const inputElement = document.createElement("input");
  inputElement.type = type;
  inputElement.id = id;
  inputElement.value = value;

  // Append label and input to the container
  inputContainer.appendChild(label);
  inputContainer.appendChild(inputElement);

  return inputContainer;
}

function openModal(elementId, data) {
  const modal = document.getElementById("editModal");
  modal.style.display = "block";
  const modalContent = document.querySelector(".modal-content");

  modalContent.innerHTML = "";

  const selectedItem = data.find((item) => item.id === elementId);

  if (selectedItem) {
    const { type, label, placeholder, options } = selectedItem;
    const labelInput = createInput("editLabel", "text", "Label:", label);

    modalContent.appendChild(labelInput);

    if (type !== "select" && type !== "textarea") {
      const placeholderInput = createInput(
        "editPlaceholder",
        "text",
        "Placeholder:",
        placeholder
      );

      modalContent.appendChild(placeholderInput);
    }

    const optionsContainer = document.createElement("div");
    if (type === "select") {
      const optionsLabel = document.createElement("label");
      optionsLabel.textContent = "Options:";

      options.forEach((option, index) => {
        const optionInput = createInput(
          `editOption${index}`,
          "text",
          `Option ${index + 1}:`,
          option
        );

        optionsContainer.appendChild(optionInput);
      });

      modalContent.appendChild(optionsLabel);
      modalContent.appendChild(optionsContainer);
    }

    if (type === "textarea") {
      const placeholderInput = createInput(
        "editPlaceholder",
        "text",
        "Placeholder:",
        placeholder
      );

      modalContent.appendChild(placeholderInput);
    }

    //Save button and fnc
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save Changes";
    saveButton.className = "save-edit";
    saveButton.onclick = function () {
      function saveChanges(elementId, data) {
        const selectedItem = data.find((item) => item.id === elementId);

        if (selectedItem) {
          selectedItem.label = document.getElementById("editLabel").value;

          if (selectedItem.type !== "select") {
            selectedItem.placeholder =
              document.getElementById("editPlaceholder").value;
          }

          if (selectedItem.type === "select") {
            selectedItem.options = [];
            optionsContainer
              .querySelectorAll("label")
              .forEach((labelElement) => {
                const optionInput = labelElement.nextElementSibling;

                selectedItem.options.push(optionInput.value);
              });
          }
        }

        renderFormFromJson();

        closeModal();
      }

      saveChanges(elementId, data);
    };

    //cancel btn and fnc
    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.className = "cancel-edit";
    cancelButton.onclick = function () {
      closeModal();
    };

    modalContent.appendChild(saveButton);
    modalContent.appendChild(cancelButton);
  }

  // Add event listener to close the modal if clicked outside the modal content
  window.onclick = function (event) {
    if (event.target === modal) {
      closeModal();
    }
  };
}

function closeModal() {
  const modal = document.getElementById("editModal");
  modal.style.display = "none";
}
