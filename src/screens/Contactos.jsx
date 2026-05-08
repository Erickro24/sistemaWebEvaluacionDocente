// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useForm } from 'react-hook-form';

const Contactos = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Datos del formulario:", data);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 font-sans text-gray-800">
      {/* Título Superior */}
      <div className="container3">
        <h1 className="text-center text-2xl font-bold text-red-800">Contactos</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* SECCIÓN IZQUIERDA: Información y Mapas */}
        <div className="md:col-span-2 space-y-8 bg-gray-900 text-white p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Escuela Maritima */}
            <div className="text-center">
              {/* FOTO: Asegúrate de que estudianm.jpg esté en la carpeta /public de tu proyecto */}
              <div className="mb-4 overflow-hidden rounded-lg bg-gray-800">
                <img 
                  src="./estudianm.jpg" 
                  alt="Escuela Marítima" 
                  className="mx-auto h-40 w-full object-cover" 
                  onError={(e) => { e.target.src = "https://placeholder.com"; }}
                />
              </div>

              <div className='linea'></div>
              <h2 className="font-bold text-lg">Escuela Marítima</h2>
              <p className="text-sm text-gray-400">Calle Juaristi Eguino Nro. 400 Ex- Escuela Naval Militar (lado de la Terminal de Buses de La Paz)</p>
              <p className="text-sm text-gray-400">La Paz, Bolivia</p>
              <p className="mt-2 text-red-400">Tel: 2282737</p>
              
              
              {/* MAPA DE GOOGLE (Corregido para Iframe) */}
              <div className="mt-4 h-64 bg-gray-700 rounded-lg overflow-hidden shadow-inner">
                <iframe 
                title="Ubicación Escuela Marítima"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15302.038693100261!2d-68.14280481083992!3d-16.500347401039896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f200a8819e29b%3A0x665fd1b4990f3ed0!2sUMAR%20-%20Escuela%20Mar%C3%ADtima!5e0!3m2!1ses-419!2sbo!4v1778194574168!5m2!1ses-419!2sbo" width="600" height="450"
                className="w-full h-full border-0"
                allowFullScreen="" 
                loading="lazy" 
                />
              </div>
            </div>

            {/* Puedes duplicar el bloque de arriba para otra sucursal si lo deseas */}

          </div>
        </div>

        {/* SECCIÓN DERECHA: Formulario */}
        <div className="bg-white p-6 shadow-lg rounded-lg text-black">
       
          <h2 className="text-xl font-bold mb-6 border-b pb-2">Información</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Nombre/Apellido *</label>
              <input 
                {...register("nombre", { required: "Este campo es obligatorio" })}
                className="w-full border p-2 rounded focus:ring-2 focus:ring-red-400 outline-none transition"
              />
              {errors.nombre && <span className="text-xs text-red-500">{errors.nombre.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Teléfono/Celular *</label>
              <input 
                {...register("telefono", { required: true })}
                className="w-full border p-2 rounded focus:ring-2 focus:ring-red-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Email *</label>
              <input 
                type="email"
                {...register("email", { required: true })}
                className="w-full border p-2 rounded focus:ring-2 focus:ring-red-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Consulta *</label>
              <textarea 
                {...register("consulta", { required: true })}
                rows="4"
                className="w-full border p-2 rounded focus:ring-2 focus:ring-red-400 outline-none"
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full bg-red-600 text-white px-6 py-3 rounded font-bold hover:bg-red-700 transition shadow-md"
            >
              ENVIAR CONSULTA
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contactos;
