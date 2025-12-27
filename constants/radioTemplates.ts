export interface RadioTemplate {
  id: string;
  name: string;
  category: 'jingle' | 'spot' | 'identification' | 'transition' | 'closing';
  template: string;
  variables: string[];
  description: string;
}

export const RADIO_TEMPLATES: RadioTemplate[] = [
  // JINGLES DE ENTRADA
  {
    id: 'jingle_1',
    name: 'Bienvenida Estándar',
    category: 'jingle',
    template: '¡Buenas {tiempo}, estás escuchando {radio_name}! La radio que te acompaña todo el día.',
    variables: ['tiempo', 'radio_name'],
    description: 'Jingle de bienvenida clásico para cualquier hora'
  },
  {
    id: 'jingle_2', 
    name: 'Bienvenida Energética',
    category: 'jingle',
    template: '¡Hola! Aquí {radio_name}, donde la música no para y la energía nunca se acaba.',
    variables: ['radio_name'],
    description: 'Jingle dinámico y enérgico'
  },
  {
    id: 'jingle_3',
    name: 'Bienvenida Nocturna',
    category: 'jingle',
    template: 'Buenas noches desde {radio_name}, la compañía perfecta para estos momentos.',
    variables: ['radio_name'],
    description: 'Jingle suave para programación nocturna'
  },

  // SPOTS PROMOCIONALES
  {
    id: 'spot_1',
    name: 'Promoción de Evento',
    category: 'spot',
    template: 'No te pierdas {evento} este {fecha} en {lugar}. ¡Solo en {radio_name}!',
    variables: ['evento', 'fecha', 'lugar', 'radio_name'],
    description: 'Spot para promocionar eventos'
  },
  {
    id: 'spot_2',
    name: 'Promoción Comercial',
    category: 'spot',
    template: '{marca} te invita a {promocion}. ¡Aprovecha esta oportunidad única!',
    variables: ['marca', 'promocion'],
    description: 'Spot para promociones comerciales'
  },
  {
    id: 'spot_3',
    name: 'Llamada a la Acción',
    category: 'spot',
    template: 'Llama ahora al {telefono} y participa en {concurso}. ¡Tú puedes ser el ganador!',
    variables: ['telefono', 'concurso'],
    description: 'Spot para concursos y participación'
  },

  // IDENTIFICACIONES
  {
    id: 'id_1',
    name: 'Identificación Clásica',
    category: 'identification',
    template: 'Este es el sonido de {radio_name}, la radio que te entiende.',
    variables: ['radio_name'],
    description: 'Identificación elegante y profesional'
  },
  {
    id: 'id_2',
    name: 'Identificación Musical',
    category: 'identification',
    template: '{radio_name}, donde cada canción cuenta una historia.',
    variables: ['radio_name'],
    description: 'Identificación con enfoque musical'
  },
  {
    id: 'id_3',
    name: 'Identificación Comunitaria',
    category: 'identification',
    template: 'Desde {ciudad}, {radio_name} conecta corazones y comunidades.',
    variables: ['ciudad', 'radio_name'],
    description: 'Identificación para radios comunitarias'
  },

  // TRANSICIONES
  {
    id: 'trans_1',
    name: 'Transición Musical',
    category: 'transition',
    template: 'Y así suena {radio_name}, continuamos con más música para ti.',
    variables: ['radio_name'],
    description: 'Transición entre canciones'
  },
  {
    id: 'trans_2',
    name: 'Transición de Programa',
    category: 'transition',
    template: 'Ahora en {radio_name}, llega el momento de {programa}. No te lo pierdas.',
    variables: ['radio_name', 'programa'],
    description: 'Transición entre programas'
  },

  // CIERRES
  {
    id: 'close_1',
    name: 'Cierre Estándar',
    category: 'closing',
    template: 'Esto ha sido todo por hoy en {radio_name}. ¡Hasta la próxima!',
    variables: ['radio_name'],
    description: 'Cierre clásico de programa'
  },
  {
    id: 'close_2',
    name: 'Cierre Nocturno',
    category: 'closing',
    template: 'Se hace de noche y {radio_name} sigue contigo. Que descanses.',
    variables: ['radio_name'],
    description: 'Cierre suave para programación nocturna'
  }
];

export const TEMPLATE_CATEGORIES = {
  jingle: 'Jingles de Entrada',
  spot: 'Spots Promocionales', 
  identification: 'Identificaciones',
  transition: 'Transiciones',
  closing: 'Cierres'
};