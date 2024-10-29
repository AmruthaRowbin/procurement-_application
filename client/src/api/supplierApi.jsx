import axiosInstance from '../utils/axionInstance'; // Import the axiosInstance with interceptor

// Create a new task
// Create a new supplier
export const createSupplier = async (supplierData) => {
    console.log(supplierData, "Creating supplier with the following data:");

    try {
        const response = await axiosInstance.post('/suppliers/create', supplierData);
        console.log('Supplier created successfully:', response.data);
        return { success: true, message: 'Supplier created successfully', data: response.data };
    } catch (error) {
        console.error('Error while creating supplier:', error.response ? error.response.data : error.message);
        return { success: false, message: error.response ? error.response.data.message : error.message };
    }
};
export const fetchSuppliers = async () => {
    try {
        const response = await axiosInstance.get('/suppliers/all');
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error while fetching suppliers:', error);
        return { success: false, message: error.message };
    }
};

// Edit an existing supplier


export const editSupplier = async (supplierId, updatedData) => {
    // console.log(taskId, updatedTaskData, "Updating task");
    
    try {
        const response = await axiosInstance.put(`/suppliers/${supplierId}`, updatedData);
        console.log('Task updated successfully:', response.data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error updating task:', error.response ? error.response.data : error.message);
        return { success: false, message: error.response ? error.response.data.message : error.message };
    }
};

// Delete a supplier
export const deleteSupplier = async (id) => {
    try {
        await axiosInstance.delete(`/suppliers/delete/${id}`);
        return { success: true };
    } catch (error) {
        console.error('Error while deleting supplier:', error.response ? error.response.data : error.message);
        return { success: false, message: error.response ? error.response.data.message : error.message };
    }
};