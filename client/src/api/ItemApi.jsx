import axiosInstance from '../utils/axionInstance'; // Import the axiosInstance with interceptor

// Create a new task
// Create a new supplier
export const createItem = async (ItemData) => {
    console.log(ItemData, "Creating supplier with the following data:");

    try {
        const response = await axiosInstance.post('/items/additem', ItemData);
        console.log('Supplier created successfully:', response.data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error while creating supplier:', error.response ? error.response.data : error.message);
        return { success: false, message: error.response ? error.response.data.message : error.message };
    }
};
export const fetchItem = async () => {
    try {
        const response = await axiosInstance.get('/items/all');
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error while fetching suppliers:', error);
        return { success: false, message: error.message };
    }
};

// Edit an existing supplier


export const editItem = async (itemId, updatedData) => {
    // console.log(taskId, updatedTaskData, "Updating task");
    
    try {
        const response = await axiosInstance.put(`/items/${itemId}`, updatedData);
        console.log('Task updated successfully:', response.data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error updating task:', error.response ? error.response.data : error.message);
        return { success: false, message: error.response ? error.response.data.message : error.message };
    }
};

// Delete a supplier
export const deleteItem = async (id) => {
    try {
        await axiosInstance.delete(`/items/${id}`);
        return { success: true };
    } catch (error) {
        console.error('Error while deleting supplier:', error.response ? error.response.data : error.message);
        return { success: false, message: error.response ? error.response.data.message : error.message };
    }
};