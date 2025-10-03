import { getRoles, getRoleById, createRole, updateRoleById, deleteRoleById } from "../model/roles-model.js";

// Obtener todos los roles
export const getAllRoles = async (req, res) => {
    try {
        const roles = await getRoles();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener rol por ID
export const getRole = async (req, res) => {
    try {
        const role = await getRoleById(req.params.id);
        if (!role) {
            return res.status(404).json({ message: "No se encuentra el rol con ese ID" });
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo rol
export const createNewRole = async (req, res) => {
    try {
        const { nombre_rol } = req.body;
        if (!nombre_rol) {
            return res.status(400).json({ message: "El nombre del rol es obligatorio" });
        }
        const newRole = await createRole(nombre_rol);
        res.status(201).json({ message: "Rol creado con éxito", role: newRole });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un rol
export const updateRole = async (req, res) => {
    try {
        const { nombre_rol } = req.body;
        const updated = await updateRoleById(req.params.id, nombre_rol);
        if (!updated) {
            return res.status(404).json({ message: "Rol no encontrado" });
        }
        res.status(200).json({ message: "Rol actualizado con éxito" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un rol
export const deleteRole = async (req, res) => {
    try {
        const deleted = await deleteRoleById(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: "Rol no encontrado" });
        }
        res.status(200).json({ message: "Rol eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
