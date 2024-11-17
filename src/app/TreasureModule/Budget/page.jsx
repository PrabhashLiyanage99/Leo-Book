"use client"
import React, { useEffect, useState } from "react";
import Layout from '../../MainLayout';
import { BsThreeDotsVertical } from "react-icons/bs";

const BudgetReport = () => {
  const [rows, setRows] = useState([]);
  const [newRow, setNewRow] = useState({
    id: "",
    date: "",
    description: "",
    quantity: "",
    rate: "",
  });

  const [selectedRowId, setSelectedRowId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // Handler to update form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRow({
      ...newRow,
      [name]: value,
    });
  };

  // Handler to add a new row to the table
  const handleAddRow = async () => {
    if (newRow.id && newRow.date && newRow.description) {
      try{
        const response = await fetch('http://localhost:5000/api/treasure', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(newRow)
        });
        if(!response.ok){
          throw new Error('Failed to add new budget detail');
        }

        const addedRow = await response.json();
        setRows([...rows, addedRow]);
        setNewRow({ id: "", date: "", description: "", quantity: "", rate: "" });
      } catch(error) {
        console.error ("Error adding new row", error);
      }
    }
  };

  const fetchDetailes = async () =>{
	try{
		const response = await fetch('http://localhost:5000/api/treasure');
		if(!response.ok){
			throw new Error('Failed fetch treasure Detailes');
		}
		const data = await response.json();
		setRows(data);
	}catch(error){
		console.error("Error fetching detailes:", error);
	}
  };

  useEffect(() => {
	fetchDetailes();
  },[]);

  const togglePopup = (id) => {
    setSelectedRowId(id);
    setShowPopup(!showPopup);
  };

  const handleDelete = async (id) => {
    try{
      const response = await fetch(`http://localhost:5000/api/treasure/${id}`, {
        method:'DELETE',
      });
      if(!response.ok) {
        throw new Error('Failed to delete row');
      }
      setRows(row.filter(row => row.itemId !== itemId));
    }catch(error){
      console.error("Error deleting row:",error);
    }
    setPopupIndex(null);
  };

  return (
	<Layout>
    <div className="container p-4 mx-auto text-gray-100 bg-gray-900">
      <h2 className="mb-4 text-2xl font-semibold">Budget Report</h2>

      {/* Add Row Form */}
      <div className="mb-6">
        <h3 className="text-xl mb-2">Add New Item</h3>
        <div className="grid grid-cols-6 gap-4 mb-4">
          <input
            type="text"
            name="id"
            placeholder="Item ID"
            value={newRow.id}
            onChange={handleInputChange}
            className="col-span-1 p-2 bg-gray-800 border-gray-600 text-gray-100"
          />
          <input
            type="date"
            name="date"
            value={newRow.date}
            onChange={handleInputChange}
            className="col-span-1 p-2 bg-gray-800 border-gray-600 text-gray-100"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newRow.description}
            onChange={handleInputChange}
            className="col-span-2 p-2 bg-gray-800 border-gray-600 text-gray-100"
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={newRow.quantity}
            onChange={handleInputChange}
            className="col-span-1 p-2 bg-gray-800 border-gray-600 text-gray-100"
          />
          <input
            type="number"
            name="rate"
            placeholder="Rate"
            value={newRow.rate}
            onChange={handleInputChange}
            className="col-span-1 p-2 bg-gray-800 border-gray-600 text-gray-100"
          />
        </div>
        <button
          onClick={handleAddRow}
          className="p-2 bg-green-600 rounded hover:bg-green-700"
        >
          Add Row
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-3">Item ID</th>
              <th className="p-3">Date</th>
              <th className="p-3">Description</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Price</th>
              <th className="p-3">Amount</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800">
            {rows.map((row, index) => (
              <tr key={index} className="border-b border-gray-700">
                <td className="px-3 py-2">{row.itemId}</td>
                <td className="px-3 py-2">{new Date (row.date).toISOString().split('T')[0]}</td>
                <td className="px-3 py-2">{row.description}</td>
                <td className="px-3 py-2">{row.queantity}</td>
                <td className="px-3 py-2">{row.price}</td>
				        <td className="px-3 py-2">{row.amount}</td>
                <BsThreeDotsVertical onClick={() => togglePopup(row.id)} className="cursor-pointer"/>
                  {showPopup && selectedRowId === row.id && (
                    <div className="absolute bg-gray-700 p-2 rounded shadow-md right-0 z-10">
                      <button 
                      className="block w-full text-left text-white hover:bg-gray-600 px-2 py-1"
                      onClick={() => handleDelete(row.id)}
                      >Delete</button>
                    </div>
                  )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
	</Layout>
  );
};

export default BudgetReport;
