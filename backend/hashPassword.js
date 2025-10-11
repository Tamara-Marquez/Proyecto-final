import bcrypt from 'bcryptjs';
import pool from './SRC/config/bd.js'

async function hashearContraseñas() {
    try {
        // 1. Obtener todos los usuarios con contraseñas en texto plano
        const [usuarios] = await pool.query('SELECT id_usuario, password FROM usuarios');
        
        console.log(`📋 Encontrados ${usuarios.length} usuarios`);

        // 2. Hashear cada contraseña
        for (const usuario of usuarios) {
            // Verificar si ya está hasheada (los hash de bcrypt empiezan con $2a$ o $2b$)
            if (usuario.password.startsWith('$2a$') || usuario.password.startsWith('$2b$')) {
                console.log(`✅ Usuario ${usuario.id_usuario}: Ya tiene hash`);
                continue;
            }

            // Hashear la contraseña
            const hashedPassword = await bcrypt.hash(usuario.password, 10);
            
            // Actualizar en la base de datos
            await pool.query(
                'UPDATE usuarios SET password = ? WHERE id_usuario = ?',
                [hashedPassword, usuario.id_usuario]
            );
            
            console.log(`🔐 Usuario ${usuario.id_usuario}: Contraseña hasheada exitosamente`);
        }

        console.log('🎉 Todas las contraseñas han sido hasheadas');
        process.exit(0);
        
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

hashearContraseñas();