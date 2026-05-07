
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // Sincronizamos con los campos que usas en el componente: username, password, rol
    formData: {
        username: '',
        password: 'esma2026',
        rol: '',
    },
    isLoggedIn: false, 
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        // CORRECCIÓN: Ahora puede recibir un objeto completo o un campo específico
        updateForm(state, action) {
            const { field, value } = action.payload;
            
            // Si mandas { field: 'formData', value: {...} } como haces en tu componente
            if (field === 'formData') {
                state.formData = { ...state.formData, ...value };
            } else {
                // Si mandas un campo individual
                state.formData[field] = value;
            }
        },
        
        resetForm(state) {
            state.formData = initialState.formData;
        },

        login: (state) => {
            state.isLoggedIn = true;
        },

        logout: (state) => {
            state.isLoggedIn = false;
            // Opcional: limpiar datos al cerrar sesión
            state.formData = initialState.formData;
        },
    }
});

export const { updateForm, resetForm, login, logout } = formSlice.actions;
export default formSlice.reducer;
