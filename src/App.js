import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";

const App = () => {
  const [medications, setMedications] = useState(data);
  const [addFormData, setAddFormData] = useState({
    medicationName: "",
    dosage: "",
    timeOfMeds: "",
  });

  const [editFormData, setEditFormData] = useState({
    medicationName: "",
    dosage: "",
    timeOfMeds: "",
  });

  const [editMedicationId, setEditMedicationId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newMedication = {
      id: nanoid(),
      medicationName: addFormData.medicationName,
      dosage: addFormData.dosage,
      timeOfMeds: addFormData.timeOfMeds,
    };

    const newMedications = [...medications, newMedication];
    setMedications(newMedications);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedMedication = {
      id: editMedicationId,
      medicationName: editFormData.medicationName,
      dosage: editFormData.dosage,
      timeOfMeds: editFormData.timeOfMeds,
    };

    const newMedications = [...medications];

    const index = medications.findIndex((medication) => medication.id === editMedicationId);

    newMedications[index] = editedMedication;

    setMedications(newMedications);
    setEditMedicationId(null);
  };

  const handleEditClick = (event, medication) => {
    event.preventDefault();
    setEditMedicationId(medication.id);

    const formValues = {
      medicationName: medication.medicationName,
      dosage: medication.dosage,
      timeOfMeds: medication.timeOfMeds,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditMedicationId(null);
  };

  const handleDeleteClick = (medicationId) => {
    const newMedications = [...medications];

    const index = medications.findIndex((medication) => medication.id === medicationId);

    newMedications.splice(index, 1);

    setMedications(newMedications);
  };

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Medication Name</th>
              <th>Dosage</th>
              <th>Time of Meds</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {medications.map((medication) => (
              <Fragment>
                {editMedicationId === medication.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    medication={medication}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add a Medication</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="medicationName"
          required="required"
          placeholder="Enter a medication name..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="dosage"
          required="required"
          placeholder="Enter the dosage amount..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="timeOfMeds"
          required="required"
          placeholder="Enter time of medication..."
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default App;