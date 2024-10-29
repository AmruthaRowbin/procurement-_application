import axiosInstance from '../utils/axionInstance'; // Import the axiosInstance with interceptor

// Create a new task
// Create a new supplier
export const createOrder = async (orderData,supplierId) => {
    console.log(orderData, "Creating supplier with the following data:");

    try {
        const response = await axiosInstance.post('/purchase-orders/additem', orderData,supplierId);
        console.log('Supplier created successfully:', response.data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error while creating supplier:', error.response ? error.response.data : error.message);
        return { success: false, message: error.response ? error.response.data.message : error.message };
    }
};
export const fetchOrders = async () => {
    try {
        const response = await axiosInstance.get('/purchase-orders/all');
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error while fetching suppliers:', error);
        return { success: false, message: error.message };
    }
};

// Edit an existing supplier


export const editOrder = async (orderId, orderData) => {
    // console.log(taskId, updatedTaskData, "Updating task");
    console.log(orderId,orderData,"apiiiiiiiiiiiiiiiiiiiiiiiiii")
    
    try {
        const response = await axiosInstance.put(`/purchase-orders/${orderId}`, orderData);
        console.log('Task updated successfully:', response.data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error updating task:', error.response ? error.response.data : error.message);
        return { success: false, message: error.response ? error.response.data.message : error.message };
    }
};

// Delete a supplier
export const deleteOrder = async (id) => {
    try {
        await axiosInstance.delete(`/purchase-orders/${id}`);
        return { success: true };
    } catch (error) {
        console.error('Error while deleting supplier:', error.response ? error.response.data : error.message);
        return { success: false, message: error.response ? error.response.data.message : error.message };
    }
};