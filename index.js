let jsonData = [
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

let nextId = 0;
let divId = 0;

window.onload = function () {
  renderFormFromJson();
};

function renderFormFromJson() {
  const formContainer = document.getElementById("form-container");

  // Clear existing content
  formContainer.innerHTML = "";

  // Inside the renderFormFromJson function
  jsonData.forEach((item) => {
    const formElementContainer = document.createElement("div");
    formElementContainer.className = "form-element-container";
    formElementContainer.draggable = true;
    formElementContainer.id = `div-${item.id}`; // Assign a unique ID based on the item's ID

    // Create label element
    const label = document.createElement("label");
    label.textContent = item.label;

    // Create a div to wrap the form element and label
    const formElementWrapper = document.createElement("div");
    formElementWrapper.className = "formElementClass";

    // Create form element based on type
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

    // Append form element and label to the wrapper
    formElementWrapper.appendChild(label);
    formElementWrapper.appendChild(formElement);

    // Create delete button
    const deleteBtn = document.createElement("span");
    deleteBtn.className = "delete-btn";
    deleteBtn.id = `delete-${item.id}`; // Assign a unique ID based on the item's ID
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function () {
      jsonData = jsonData.filter((data) => data.id !== item.id);
      renderFormFromJson();
    };

    const editBtn = document.createElement("span");
    editBtn.className = "edit-btn";
    editBtn.id = `edit-${item.id}`;
    editBtn.textContent = "Edit";
    editBtn.onclick = function () {
      openModal(item.id, jsonData);
    };

    // Append elements to formElementContainer
    formElementContainer.appendChild(formElementWrapper);
    formElementContainer.appendChild(editBtn);
    formElementContainer.appendChild(deleteBtn);

    // Append formElementContainer to form container
    formContainer.appendChild(formElementContainer);
  });
}

// Add click event handlers to sidebar buttons
const inputBtn = document.getElementById("add-input");
inputBtn.addEventListener("click", function () {
  jsonData.push({
    id: nextId++,
    type: "input",
    label: "Sample Label",
    placeholder: "Sample Placeholder",
  });
  renderFormFromJson();
});

const selectBtn = document.getElementById("add-select");
selectBtn.addEventListener("click", function () {
  jsonData.push({
    id: nextId++,
    type: "select",
    label: "Sample Label",
    options: ["Sample Option", "Sample Option", "Sample Option"],
  });
  renderFormFromJson();
});

const textAreaBtn = document.getElementById("add-text");
textAreaBtn.addEventListener("click", function () {
  jsonData.push({
    id: nextId++,
    type: "textarea",
    label: "Sample Label",
    placeholder: "Sample Placeholder",
  });
  renderFormFromJson();
});

// Define the createInput function
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

function openModal(elementId, jsonData) {
  const modal = document.getElementById("editModal");
  modal.style.display = "block";
  const modalContent = document.querySelector(".modal-content");

  // Clear existing content
  modalContent.innerHTML = "";

  // Get the JSON data object for the given element ID
  const selectedItem = jsonData.find((item) => item.id === elementId);

  if (selectedItem) {
    // Extract data from the selected item
    const { type, label, placeholder, options } = selectedItem;

    // Create label input
    const labelInput = createInput("editLabel", "text", "Label:", label);

    // Append label input to modal content
    modalContent.appendChild(labelInput);

    // If the element type is not "select" or "textarea", create a placeholder input
    if (type !== "select" && type !== "textarea") {
      const placeholderInput = createInput(
        "editPlaceholder",
        "text",
        "Placeholder:",
        placeholder
      );

      // Append placeholder input to modal content
      modalContent.appendChild(placeholderInput);
    }

    // If the element type is "select", create input fields for options
    const optionsContainer = document.createElement("div");
    if (type === "select") {
      const optionsLabel = document.createElement("label");
      optionsLabel.textContent = "Options:";

      // Create a container to hold multiple option input fields

      // Create input fields for each option
      options.forEach((option, index) => {
        const optionInput = createInput(
          `editOption${index}`,
          "text",
          `Option ${index + 1}:`,
          option
        );

        optionsContainer.appendChild(optionInput);
      });

      // Append options label and container to modal content
      modalContent.appendChild(optionsLabel);
      modalContent.appendChild(optionsContainer);
    }

    // If the element type is "textarea", create a placeholder input
    if (type === "textarea") {
      const placeholderInput = createInput(
        "editPlaceholder",
        "text",
        "Placeholder:",
        placeholder
      );

      // Append placeholder input to modal content
      modalContent.appendChild(placeholderInput);
    }

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save Changes";
    saveButton.className = "save-edit";
    saveButton.onclick = function () {
      function saveChanges(elementId, jsonData) {
        const modalContent = document.querySelector(".modal-content");

        // Get the JSON data object for the given element ID
        const selectedItem = jsonData.find((item) => item.id === elementId);

        if (selectedItem) {
          // Update the selected item based on the input values
          selectedItem.label = document.getElementById("editLabel").value;

          // Check if the element type is not "select" before updating placeholder
          if (selectedItem.type !== "select") {
            selectedItem.placeholder =
              document.getElementById("editPlaceholder").value;
          }

          // If the element type is "select", update the options
          if (selectedItem.type === "select") {
            selectedItem.options = [];
            optionsContainer
              .querySelectorAll("label")
              .forEach((labelElement) => {
                // Get the corresponding option input field
                const optionInput = labelElement.nextElementSibling;

                // Push the value of the option input field to selectedItem.options
                selectedItem.options.push(optionInput.value);
              });
          }
        }

        // Re-render the form with the updated data
        renderFormFromJson();

        // Close the modal after saving changes
        closeModal();
      }

      saveChanges(elementId, jsonData);
    };

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.className = "cancel-edit";
    cancelButton.onclick = function () {
      closeModal();
    };

    // Append Save Changes and Cancel buttons to modal content
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
