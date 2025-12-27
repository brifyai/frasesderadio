# 🎙️ Frases de Radio - IA

Una plataforma profesional de síntesis de voz para crear contenido de radio de alta calidad usando inteligencia artificial.

## 🌟 Características Principales

### 📻 Plantillas de Radio Profesionales
- **Jingles de entrada** - Bienvenidas dinámicas para tu radio
- **Spots promocionales** - Promociona eventos y productos
- **Identificaciones** - Marca tu sonido único
- **Transiciones** - Conecta programas y canciones
- **Cierres** - Despedidas profesionales

### 🎨 Branding Corporativo
- **Nombre de radio personalizable**
- **Colores de marca ajustables**
- **Logo dinámico**
- **Interfaz profesional**

### 🎛️ Control de Voz Avanzado
- **10 voces diferentes** en español chileno
- **5 estilos de expresión** (Natural, Alegre, Triste, Susurrar, Cuentacuentos)
- **Velocidad variable** (0.5x a 2.0x)
- **Control de tono** (-10 a +10)
- **Etiquetas de expresión** ([pausa], [risa], [grito], [llanto])

### 📊 Funciones Empresariales
- **Historial completo** de audios generados
- **Exportación en tiempo real**
- **Preview instantáneo**
- **Variables inteligentes** con auto-completado

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18+
- npm o yarn
- API Key de Google Gemini

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/brifyai/frasesderadio.git
cd frasesderadio
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.local.example .env.local
```

Edita `.env.local` y agrega tu API key:
```env
VITE_API_KEY=tu_api_key_de_gemini_aqui
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3005`

### Construcción para producción
```bash
npm run build
```

## 🎯 Casos de Uso

### Para Radios Comerciales
- Crear jingles de identificación
- Generar spots promocionales
- Producir transiciones entre programas
- Desarrollar contenido de marca

### Para Agencias de Marketing
- Crear contenido de audio para clientes
- Producir spots publicitarios
- Generar contenido de marca personalizado

### Para Podcasters
- Crear intro/outro profesionales
- Generar identificaciones de podcast
- Producir transiciones

## 🛠️ Tecnologías Utilizadas

- **React 18** - Framework de interfaz
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Estilos utilitarios
- **Google Gemini AI** - Síntesis de voz
- **Lucide React** - Iconos

## 📁 Estructura del Proyecto

```
frasesderadio/
├── src/
│   ├── components/          # Componentes React
│   │   ├── RadioTemplates.tsx
│   │   ├── VoiceSelector.tsx
│   │   └── History.tsx
│   ├── constants/           # Constantes y plantillas
│   │   ├── radioTemplates.ts
│   │   └── constants.ts
│   ├── types/              # Definiciones TypeScript
│   │   ├── types.ts
│   │   └── radio.ts
│   ├── services/           # Servicios API
│   │   └── geminiService.ts
│   ├── utils/              # Utilidades
│   │   └── audioUtils.ts
│   ├── App.tsx             # Componente principal
│   └── main.tsx            # Punto de entrada
├── public/                 # Archivos estáticos
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 🎨 Personalización

### Agregar Nuevas Plantillas
Edita `src/constants/radioTemplates.ts` para agregar nuevas plantillas de radio:

```typescript
{
  id: 'nueva_plantilla',
  name: 'Mi Nueva Plantilla',
  category: 'jingle',
  template: 'Hola desde {radio_name}, {mensaje}',
  variables: ['radio_name', 'mensaje'],
  description: 'Descripción de la plantilla'
}
```

### Modificar Voces
Edita `src/constants/constants.ts` para ajustar las voces disponibles:

```typescript
export const VOICES: VoiceOption[] = [
  {
    id: 'nueva_voz',
    name: 'Mi Voz Personalizada',
    gender: Gender.Male,
    apiVoiceName: 'Puck' // Voz de Gemini
  }
  // ... más voces
];
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👨‍💻 Desarrollado por

**BrifyAI** - Plataforma de IA para contenido de radio profesional

## 📞 Soporte

Si tienes preguntas o necesitas ayuda:

- 📧 Email: soporte@brifyai.com
- 🐛 Issues: [GitHub Issues](https://github.com/brifyai/frasesderadio/issues)
- 📖 Documentación: [Wiki del proyecto](https://github.com/brifyai/frasesderadio/wiki)

---

⭐ **Si este proyecto te resulta útil, no olvides darle una estrella en GitHub**
