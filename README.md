# 🥥 COCOS CHALLENGE 🥥

## Requisitos previos

- Node.js versión 18.x o 20.x (recomendado: v20.11.0)
- Xcode (para iOS)
- Android Studio (para Android)
- Git

## Pasos para arrancar el proyecto

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/eliasg52/cocos-challenge.git
   cd cocos-challenge
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Generar archivos nativos**

   ```bash
   npx expo prebuild
   ```

4. **Iniciar la aplicación**

   Para iOS:

   ```bash
   npm run ios
   ```

   Para Android:

   ```bash
   npm run android
   ```

## Tests Unitarios

Hemos implementado tres tests críticos que verifican la funcionalidad principal de la aplicación:

1. **OrderStore.test.ts** - Prueba la gestión de órdenes usando el enfoque de renderHook para probar hooks de forma aislada:

   - Verifica que se puedan añadir órdenes correctamente
   - Comprueba que las órdenes se pueden eliminar
   - Valida el cálculo correcto del valor total de una orden

2. **ApiIntegration.test.tsx** - Verifica la comunicación con el backend usando React Query:

   - Comprueba la obtención correcta de datos
   - Maneja de forma adecuada los errores de red
   - Utiliza mocks para simular peticiones a la API sin generar peticiones reales

3. **SearchDebounce.test.tsx** - Valida la funcionalidad de búsqueda con debounce:
   - Utiliza un componente sencillo para simular la lógica de búsqueda con debounce
   - Verifica que las búsquedas no se ejecutan inmediatamente
   - Comprueba que las búsquedas anteriores se cancelan cuando se proporciona un nuevo input
   - Demuestra el uso de jest.advanceTimersByTime para controlar el tiempo en los tests

Para ejecutar los tests:

```bash
npm test
```

### Configuración de Testing

El proyecto está configurado con:

- **Jest** como framework de testing
- **Testing Library** para pruebas centradas en el usuario
- **jest-expo** como preset para compatibilidad con Expo
- Mocks para APIs, AsyncStorage y otros servicios nativos

## Notas adicionales

- Este proyecto utiliza Expo como framework base y React Native
- La estructura del proyecto sigue el patrón de enrutamiento basado en archivos (file-based routing)

## Funcionalidades principales

- Visualización de instrumentos financieros
- Simulación de compra y venta
- Seguimiento de órdenes históricas
- Soporte para modo oscuro y claro

## Decisiones Técnicas

Durante el desarrollo de esta aplicación, se tomaron las siguientes decisiones técnicas para garantizar una experiencia de usuario óptima y un código mantenible:

### Experiencia de Usuario

- **Implementación de Skeletons**: Se incorporaron componentes de tipo "skeleton" tanto en la sección de instrumentos como en el portfolio para mejorar la experiencia de usuario durante la carga de datos, proporcionando una indicación visual del contenido que se está cargando.

- **Sistema de Loaders**: Se implementaron indicadores de carga en todas las secciones críticas de la aplicación para proporcionar feedback continuo al usuario durante las operaciones que requieren tiempo de procesamiento.

- **Debounce en Búsquedas**: Se aplicó la técnica de debounce en el buscador de instrumentos para optimizar el rendimiento, reduciendo el número de llamadas a la API y mejorando la eficiencia del sistema.

- **Visualización de Portfolio**: Además de la vista en lista tradicional, se desarrolló una visualización en forma de gráfico para el portfolio, permitiendo al usuario interpretar de manera más intuitiva la distribución de sus inversiones.

### Arquitectura y Estado

- **Gestión de Estado con Zustand**: Se implementó Zustand como solución para la gestión del estado global de la aplicación, específicamente para el manejo de órdenes creadas, proporcionando una alternativa ligera y eficiente a Redux.

- **Persistencia con AsyncStorage**: Para garantizar la persistencia de datos entre sesiones, se utilizó AsyncStorage para almacenar localmente las órdenes creadas y las preferencias de tema seleccionadas por el usuario.

- **Optimización de Peticiones con React Query**: Se integró React Query para gestionar el cacheo de las peticiones HTTP, mejorando significativamente los tiempos de respuesta y reduciendo la carga en el servidor al evitar peticiones redundantes.

### Organización y Calidad del Código

- **Arquitectura Modular para API**: Se desarrolló un módulo específico para centralizar todas las llamadas a la API, facilitando el mantenimiento y la escalabilidad del código al tener las peticiones aisladas en archivos específicos.

- **Custom Hooks para Separación de Responsabilidades**: Se implementaron numerosos hooks personalizados (como `useInstruments`, `useFilteredInstruments`, `useOrderStyles`, etc.) para extraer y centralizar la lógica de negocio, manteniéndola aislada de los componentes de UI. Esta separación permite:

  - Componentes más limpios y enfocados únicamente en la presentación
  - Mayor reutilización de lógica a través de la aplicación
  - Pruebas unitarias más sencillas al poder probar la lógica de forma aislada
  - Mejor mantenibilidad y facilidad para realizar cambios

- **Tipado Estricto con TypeScript**: Se implementó un sistema de tipado estricto para la mayoría de las funciones y peticiones, mejorando la robustez del código, facilitando el desarrollo y reduciendo la probabilidad de errores en tiempo de ejecución.
