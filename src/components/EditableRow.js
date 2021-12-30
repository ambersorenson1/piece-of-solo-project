import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          name="medicationName"
          required="required"
          placeholder="Enter a medication name..."
          value={editFormData.medicationName}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          name="dosage"
          required="required"
          placeholder="Enter the dosage amount..."
          value={editFormData.dosage}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          name="timeOfMeds"
          required="required"
          placeholder="Enter time of medication..."
          value={editFormData.timeOfMeds}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;